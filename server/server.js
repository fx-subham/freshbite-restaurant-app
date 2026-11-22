
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Menu = require("./models/Menu");
const Customer = require("./models/Customer");
const Order = require("./models/Order");

const app = express();

app.use(cors());
app.use(express.json());

// Initial menu data from our React project
const initialMenu = [
  {
    name: "Veg Burger",
    description: "Crispy vegetable patty with fresh lettuce.",
    price: 99,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600",
  },
  {
    name: "Margherita Pizza",
    description: "Classic pizza with cheese and tomato.",
    price: 199,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600",
  },
  {
    name: "Fresh Salad",
    description: "Fresh vegetables with a light dressing.",
    price: 89,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
  },
  {
    name: "Pasta",
    description: "Delicious pasta with a rich tomato sauce.",
    price: 149,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
  },
  {
    name: "French Fries",
    description: "Golden, crispy fries seasoned to perfection.",
    price: 79,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
  },
  {
    name: "Sandwich",
    description: "Grilled sandwich with fresh vegetables.",
    price: 119,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600",
  },
];

// Test the backend
app.get("/", (req, res) => {
  res.send("What's Fare Fair API is running!");
});

// Get all food items
app.get("/api/menu", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place an order
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, mobile, foodName, quantity, address } =
      req.body;

    if (
      typeof customerName !== "string" ||
      !customerName.trim() ||
      typeof mobile !== "string" ||
      !/^\d{10}$/.test(mobile) ||
      typeof foodName !== "string" ||
      !foodName.trim() ||
      typeof address !== "string" ||
      !address.trim() ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 50
    ) {
      return res.status(400).json({
        message: "Please provide valid order details.",
      });
    }

    const food = await Menu.findOne({ name: foodName });

    if (!food) {
      return res.status(404).json({
        message: "Food item not found.",
      });
    }

    const customer = await Customer.create({
      name: customerName.trim(),
      mobile,
      address: address.trim(),
    });

    const order = await Order.create({
      customer: customer._id,
      foodName: food.name,
      quantity,
      totalAmount: food.price * quantity,
    });

    res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all orders with customer details
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");

    // Insert the initial food items only when the menu is empty
    const count = await Menu.countDocuments();

    if (count === 0) {
      await Menu.insertMany(initialMenu);
      console.log("Initial menu inserted successfully!");
    }

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
