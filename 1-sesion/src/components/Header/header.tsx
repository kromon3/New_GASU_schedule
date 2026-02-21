// src/Header/header.tsx
import '../../style/header.css';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ItemPortal } from '../../contexts/GrupName.tsx';
import { ThemeContext } from '../../contexts/Background.tsx';
import ReactModal from 'react-modal';

// Обязательно для доступности
ReactModal.setAppElement('#root');

function Header() {
  // Получаем контексты с проверкой
  const grupContext = useContext(ItemPortal);
  const themeContext = useContext(ThemeContext);

  // Проверяем, что контексты существуют
  if (!grupContext || !themeContext) {
    console.error('Контексты не найдены! Проверьте Providers в App.tsx');
    return <div>Загрузка...</div>; // Временная заглушка
  }

  // Теперь безопасно деструктурируем
  const { grupName, setGrupName } = grupContext;
  const { setTheme, themeType, setThemeType } = themeContext;

  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/lessons')
      .then((res) => res.json())
      .then((data) => setGroups(data));
  }, []);

  const handleClearGroup = () => {
    setGrupName(' не выбрана');
  };

  const uniqueGroupNames = [...new Set(groups.map((item) => item.group))];

  return (
    <>
      {/* МОДАЛКА 1: Выбор группы */}
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
                  setGrupName(group);
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

      {/* МОДАЛКА 2: Меню навигации */}
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
          <Link to="/schedule_to_day" className="chip" onClick={() => setIsMenuModalOpen(false)}>
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

      {/* Основной контент */}
      <div className="main_Module">
        <div className="Header-contener_button">
          <span>
            <button className="Header-button list switch" onClick={() => setIsMenuModalOpen(true)}>
              <img src="/icons8-маркированный-список-50%20(1).png" alt="Меню" />
            </button>
          </span>

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
              if (grupName === ' не выбрана') {
                setIsGroupModalOpen(true);
              }
            }}
            style={{
              cursor: grupName === ' не выбрана' ? 'pointer' : 'default',
            }}
          >
            Группа: <strong>{grupName}</strong>
          </span>

          <span>
            <button className="Header-contener_grop_button" onClick={handleClearGroup}>
              <img src="/1483063.png" alt="Очистить группу" className="Header-contener_grop_img" />
            </button>
          </span>

          <span>
            {themeType ? (
              <button
                className="Header-contener_grop_button"
                onClick={() => {
                  setTheme('light');
                  setThemeType(false);
                }}
              >
                <img
                  src="/moon_stars_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
                  alt="Темная тема"
                />
              </button>
            ) : (
              <button
                className="Header-contener_grop_button"
                onClick={() => {
                  setTheme('dark');
                  setThemeType(true);
                }}
              >
                <img src="/sunny_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Светлая тема" />
              </button>
            )}
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
