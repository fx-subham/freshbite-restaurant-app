
import "./WorkingHours.css";

const schedule = [
  { day: "Monday", time: "9:00 AM - 9:00 PM" },
  { day: "Tuesday", time: "9:00 AM - 9:00 PM" },
  { day: "Wednesday", time: "9:00 AM - 9:00 PM" },
  { day: "Thursday", time: "9:00 AM - 9:00 PM" },
  { day: "Friday", time: "9:00 AM - 10:00 PM" },
  { day: "Saturday", time: "10:00 AM - 10:00 PM" },
  { day: "Sunday", time: "10:00 AM - 8:00 PM" },
];

function WorkingHours() {
  return (
    <section className="working-hours" id="hours">
      <h2>Our Working Hours</h2>
      <p className="hours-subtitle">
        We look forward to serving you!
      </p>

      <div className="hours-card">
        {schedule.map((item) => (
          <div className="hours-row" key={item.day}>
            <span>{item.day}</span>
            <span>{item.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorkingHours;
