// src/Header/Header.tsx
import '../../style/header.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../store/useTheme';
import { useStore } from "../../../store/useTestStore.ts";
import ReactModal from 'react-modal';
import type {Lesson} from "../../type/lesson.ts";

ReactModal.setAppElement('#root');

function Header() {
  const { groupName, setGroupName } = useStore();

  const themeType = useTheme((state) => state.themeType);
  const changeTheme = useTheme((state) => state.changeTheme);

  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [groups, setGroups] = useState<Lesson[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/lessons')
        .then((res) => res.json())
        .then((data) => setGroups(data));
  }, []);

  const handleClearGroup = () => {
    setGroupName(' не выбрана');
  };

  const uniqueGroupNames = [...new Set(groups.map((item) => item.group))];

  return (
      <>
        <ReactModal
            isOpen={isGroupModalOpen}
            onRequestClose={() => setIsGroupModalOpen(false)}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1001,
              },
              content: {
                width: '100%',
                maxWidth: '400px',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                borderRadius: '12px',
              },
            }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="group-selection-header">Выберите группу</h2>
            <button
                onClick={() => setIsGroupModalOpen(false)}
                style={{ width: 30, height: 30, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <img
                  style={{ width: 25, height: 25 }}
                  src="/free-icon-close-151882.png"
                  alt="Закрыть"
              />
            </button>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {uniqueGroupNames.map((group) => (
                <div key={group}>
                  <div
                      onClick={() => {
                        setGroupName(group);
                        setIsGroupModalOpen(false);
                      }}
                      className="group-item"
                      style={{
                        padding: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                  >
                    {group}
                  </div>
                </div>
            ))}
          </div>
        </ReactModal>
        <ReactModal
            isOpen={isMenuModalOpen}
            onRequestClose={() => setIsMenuModalOpen(false)}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
              },
              content: {
                width: '100%',
                maxWidth: '300px',
                top: '60px',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translateX(-50%)',
                padding: '20px',
                borderRadius: '12px',
              },
            }}
        >
          <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
              }}
          >
            <h3>Меню</h3>
            <button
                onClick={() => setIsMenuModalOpen(false)}
                style={{ width: 25, height: 25, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <img
                  style={{ width: 20, height: 20 }}
                  src="/free-icon-close-151882.png"
                  alt="Закрыть"
              />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/today" className="chip" onClick={() => setIsMenuModalOpen(false)}>
              <div className="chip">Расписание на сегодня</div>
            </Link>
            <Link to="/schedule" className="chip" onClick={() => setIsMenuModalOpen(false)}>
              <div className="chip">Расписание </div>
            </Link>
            <Link to="/subject" className="chip" onClick={() => setIsMenuModalOpen(false)}>
              <div className="chip">Предметы </div>
            </Link>
            <Link to="/todolist" className="chip" onClick={() => setIsMenuModalOpen(false)}>
              <div className="chip">Список задач</div>
            </Link>
          </div>
        </ReactModal>
        <div className="main_Module">
          <div className="Header-contener_button">
          <span>
            <button className="Header-button list switch" onClick={() => setIsMenuModalOpen(true)}>
              <img src="/icons8-маркированный-список-50%20(1).png" alt="Меню" />
            </button>
          </span>

            <span>
            <button className="Header-button">
              <Link to="/today" className="link_a">
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

            <span>
            <button className="Header-button todo" style={{ marginRight: 5 }}>
              <Link to="/todolist" className="link_a">
                <img
                    src="/format_list_bulleted_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
                    alt=""
                    style={{ width: 50 }}
                />
              </Link>
            </button>
          </span>
          </div>

          <div className="Header-contener_grop">
          <span
              className="Header-contener_grop_Name"
              onClick={() => {
                if (groupName === ' не выбрана') {
                  setIsGroupModalOpen(true);
                }
              }}
              style={{
                cursor: groupName === ' не выбрана' ? 'pointer' : 'default',
              }}
          >
            Группа: <strong>{groupName}</strong>
          </span>

            <span>
            <button className="Header-contener_grop_button" onClick={handleClearGroup}>
              <img src="/1483063.png" alt="Очистить группу" className="Header-contener_grop_img" />
            </button>
          </span>
            <span>
            <button
                className="Header-contener_grop_button"
                onClick={changeTheme}
            >
              {themeType ? (
                  <img
                      src="/moon_stars_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
                      alt="Темная тема"
                  />
              ) : (
                  <img src="/sunny_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Светлая тема" />
              )}
            </button>
          </span>
          </div>
        </div>
      </>
  );
}

export default Header;