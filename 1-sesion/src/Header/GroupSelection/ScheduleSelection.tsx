import { Link } from "react-router-dom";
import "../header.css";
const ScheduleSelection = () => {

    return (
        <div className="menu-panel">
      <span>
        <button className="Header-button">
          <Link to="/schedule_to_day" className="link_a">
            Расписание на сегодня
          </Link>
        </button>
      </span>
            <span>
        <button className="Header-button">
          <Link to="/schedule" className="link_a">
            Расписание
          </Link>
        </button>
      </span>
            <span>
        <button className="Header-button">
          <Link to="/subject" className="link_a">
            Предметы
          </Link>
        </button>
      </span>
        </div>
    );
}
export default ScheduleSelection;