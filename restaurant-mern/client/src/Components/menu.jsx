
import { useEffect, useState } from "react";
import "./Menu.css";

function Menu({ onOrder }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/menu"
        );

        if (!response.ok) {
          throw new Error("Unable to load menu");
        }

        const data = await response.json();
        setFoods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  if (loading) return <p>Loading food menu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="menu-section" id="menu">
      <h2>Our Menu</h2>
      <p className="menu-subtitle">
        Fresh ingredients. Delicious flavours.
      </p>

      <div className="menu-grid">
        {foods.map((food) => (
          <article className="food-card" key={food._id}>
            <img src={food.image} alt={food.name} />

            <div className="food-info">
              <h3>{food.name}</h3>
              <p>{food.description}</p>

              <div className="food-bottom">
                <strong>₹{food.price}</strong>

                <button onClick={() => onOrder(food)}>
                  Order Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Menu;
