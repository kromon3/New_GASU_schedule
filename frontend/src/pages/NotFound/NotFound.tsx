import Header from '../../components/Header/Header.tsx';
import {useTheme} from "../../../store/useTheme.ts";
function NotFound() {
    const  themeType =  useTheme((s) => s.theme)

  return (
    <>
      <div
        style={{
          backgroundColor: themeType==='dark'  ? 'white' : 'black',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <Header />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <img
            src="/arrow_forward_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png"
            alt=""
            style={{
              filter: themeType==='dark'  ? 'invert(1)' : 'invert(0)',
              width: 75,
              transform: 'rotate(320deg)',
            }}
          />
          <span
            style={{
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                backgroundColor: '#fff',
                color: '#000',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '2rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              Что-то не так
            </span>
            <span
              style={{
                backgroundColor: '#fff',
                color: '#000',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '2rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              404
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
export default NotFound;
