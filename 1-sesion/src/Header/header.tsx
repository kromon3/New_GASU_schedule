// src/Header/header.tsx
import "./header.css";
import GroupSelection from "./GroupSelection/GroupSelection.tsx";
import ScheduleSelection from "./GroupSelection/ScheduleSelection"; // ← просто так, без .jsx и папки
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { GrupNameContext } from "../contexts/GrupNameContext";

function Header() {
    const { grupName, setGrupName } = useContext(GrupNameContext);
    const [showGroupSelection, setShowGroupSelection] = useState(false);
    const [showScheduleMenu, setShowScheduleMenu] = useState(false); // ← новое состояние
    const handleClearGroup = () => {
        setGrupName("Группа не выбрана");
    };
    const handleSelectGroup = (selectedGroup) => {
        setGrupName(selectedGroup);
        setShowGroupSelection(false);
    };
    return (
        <>
            {showGroupSelection && (
                <div className="group-selection-modal">
                    <GroupSelection onSelectGroup={handleSelectGroup} />
                </div>
            )}
            {showScheduleMenu && <ScheduleSelection />}
            <div className="main_Module">
                <div className="Header-contener_button">
                    <span>
            <button
                className="Header-button list switch"
                onClick={() => setShowScheduleMenu(true)}
            >
              <img src="/icons8-маркированный-список-50%20(1).png" alt="Меню" />
            </button>
          </span>
                    <span>
            <button className="Header-button">
              <Link to="/schedule_to_day" className="link_a">Расписание на сегодня</Link>
            </button>
          </span>
                    <span>
            <button className="Header-button">
              <Link to="/schedule" className="link_a">Расписание</Link>
            </button>
          </span>
                    <span>
            <button className="Header-button">
              <Link to="/subject" className="link_a">Предметы</Link>
            </button>
          </span>
                </div>

                <div className="Header-contener_grop">
          <span
              className="Header-contener_grop_Name"
              onClick={() => {
                  if (grupName === "Группа не выбрана") {
                      setShowGroupSelection(true);
                  }
              }}
              style={{ cursor: grupName === "Группа не выбрана" ? "pointer" : "default" }}
          >
            Группа: <strong>{grupName}</strong>
          </span>
                    <span>
            <button className="Header-contener_grop_button" onClick={handleClearGroup}>
              <img src="/1483063.png" alt="Очистить группу" className="Header-contener_grop_img" />
            </button>
          </span>
                </div>
            </div>
        </>
    );
}

export default Header;