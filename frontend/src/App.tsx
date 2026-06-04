// App.jsx
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
      <Header />
        <main className="app-content">
            <Outlet />
        </main>
    </>
  );
}

export default App;
