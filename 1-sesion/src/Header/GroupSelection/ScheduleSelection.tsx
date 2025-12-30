// ScheduleSelection.jsx
import { Link } from "react-router-dom";
import "./GroupSelection.css";

const ScheduleSelection = () => {
  return (
      <div className="group-selection-container">
        <button className="Header-button_modile">
          <Link to="/schedule_to_day" className="link_a">Расписание на сегодня</Link>
        </button>
        <br/>
        <button className="Header-button_modile">
          <Link to="/schedule" className="link_a">Расписание</Link>
        </button>
        <br/>
        <button className="Header-button_modile">
          <Link to="/subject" className="link_a">Предметы</Link>
        </button>
      </div>
  );
};

export default ScheduleSelection;