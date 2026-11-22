
import { useState } from "react";
import "./OrderForm.css";

function OrderForm({ food, onClose, onPlaceOrder }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  const total = food.price * Number(quantity);

  function handleSubmit(event) {
    event.preventDefault();

    onPlaceOrder({
      customerName: name,
      mobile,
      foodName: food.name,
      quantity: Number(quantity),
      address,
      totalAmount: total,
    });
  }

  return (
    <div className="order-overlay">
      <form className="order-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Place Your Order</h2>
        <p className="selected-food">
          {food.name} — ₹{food.price} per item
        </p>

        <label>Customer Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />

        <label>Mobile Number</label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          pattern="[0-9]{10}"
          maxLength="10"
          placeholder="10-digit mobile number"
          required
        />

        <label>Food Item</label>
        <input type="text" value={food.name} readOnly />

        <label>Quantity</label>
        <input
          type="number"
          min="1"
          max="50"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <label>Delivery Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address"
          rows="3"
          required
        />

        <div className="order-total">
          <span>Total Amount</span>
          <strong>₹{total}</strong>
        </div>

        <button className="place-order-btn" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
