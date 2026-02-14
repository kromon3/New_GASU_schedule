// App.jsx
import ReactModal from 'react-modal'
import Header from './components/Header/header.tsx'
ReactModal.setAppElement('#root')
import { useState } from 'react'
function App() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Header />
            <>
                <button onClick={() => setOpen(true)}>Открыть</button>

                <ReactModal isOpen={open} onRequestClose={() => setOpen(false)}>
                    <h2>Заголовок</h2>
                    <p>Контент модалки</p>
                    <button onClick={()=>console.log("asdvsf")}>aaa</button>
                    <button onClick={() => setOpen(false)}>Закрыть</button>
                </ReactModal>
            </>
        </>
    )
}

export default App