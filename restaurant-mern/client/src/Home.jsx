
import "./App.css";
import { useState } from "react";
import OrderForm from "./Components/OrderForm";
import WorkingHours from "./Components/WorkingHours";
import Menu from "./Components/menu";

function Home() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  async function handlePlaceOrder(order) {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order failed.");
      }

      // Save the actual response from the backend
      setConfirmedOrder({
        customerName: order.customerName,
        mobile: order.mobile,
        foodName: order.foodName,
        quantity: Number(order.quantity),
        address: order.address,
        totalAmount:
          data.order?.totalAmount ??
          data.totalAmount ??
          selectedFood.price * Number(order.quantity),
        status: data.order?.status ?? data.status ?? "Placed",
      });

      setSelectedFood(null);
    } catch (error) {
      alert(error.message || "Unable to place order.");
    }
  }

  return (
    <div className="app">
      <header className="navbar">
        <h2>FreshBite</h2>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#menu">Our Menu</a>
          <a href="#hours">Working Hours</a>
          <a href="/orders">Customer Orders</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">FRESH • TASTY • LOCAL</p>
            <h1>Good food, good mood.</h1>
            <p>
              Welcome to What's Fare Fair, where fresh ingredients meet
              delicious flavours.
            </p>
            <a className="primary-btn" href="#menu">
              Explore Our Menu
            </a>
          </div>
        </section>

        <section className="features">
          <article id="about">
            <h2>About Us</h2>
            <p>
              We are a local, community-driven restaurant focused on fresh
              ingredients and delicious food.
            </p>
          </article>

          <article>
            <h2>Our Menu</h2>
            <p>
              Discover tasty dishes prepared with care using quality
              ingredients.
            </p>
            <a className="text-link" href="#menu">
              View Menu →
            </a>
          </article>

          <article>
            <h2>Working Hours</h2>
            <p>
              Visit us throughout the week and enjoy freshly prepared meals.
            </p>
            <a className="text-link" href="#hours">
              View Hours →
            </a>
          </article>
        </section>

        <Menu onOrder={(food) => setSelectedFood(food)} />
        <WorkingHours />
      </main>

      {selectedFood && (
        <OrderForm
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {confirmedOrder && (
        <div className="order-success-overlay">
          <div className="order-success-card">
            <div className="success-icon">✓</div>

            <h2>Order Placed Successfully!</h2>
            <p>Thank you for ordering from FreshBite!</p>

            <hr />

            <h3>Your Order Details</h3>

            <div className="order-detail-row">
              <span>Customer Name</span>
              <strong>{confirmedOrder.customerName}</strong>
            </div>

            <div className="order-detail-row">
              <span>Mobile Number</span>
              <strong>{confirmedOrder.mobile}</strong>
            </div>

            <div className="order-detail-row">
              <span>Food Item</span>
              <strong>{confirmedOrder.foodName}</strong>
            </div>

            <div className="order-detail-row">
              <span>Quantity</span>
              <strong>{confirmedOrder.quantity}</strong>
            </div>

            <div className="order-detail-row">
              <span>Price per Item</span>
              <strong>
                ₹
                {(
                  confirmedOrder.totalAmount / confirmedOrder.quantity
                ).toFixed(2)}
              </strong>
            </div>

            <div className="order-detail-row total-row">
              <span>Total Amount</span>
              <strong>₹{Number(confirmedOrder.totalAmount).toFixed(2)}</strong>
            </div>

            <div className="order-detail-row">
              <span>Delivery Address</span>
              <strong>{confirmedOrder.address}</strong>
            </div>

            <div className="order-detail-row">
              <span>Order Status</span>
              <strong className="order-status">
                {confirmedOrder.status}
              </strong>
            </div>

            <button
              className="primary-btn confirmation-close-btn"
              onClick={() => setConfirmedOrder(null)}
            >
              Back to Restaurant
            </button>
          </div>
        </div>
      )}

      <footer>
        <p>© 2026 What's Fare Fair. Made with care.</p>
      </footer>
    </div>
  );
}

export default Home;
