import Header from "../Header/Header.tsx";

function FetchError({ error,loading } ) {
    if(loading){
        return (
            <>
                <Header/>
                <img src="../../../public/giphy.gif" alt="loading"/>
            </>
        )
    }
    if(error){
        return (
            <>
                <Header/>
                <div className="container" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh'
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '20px 30px',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>Что-то пошло не так.<br/>
                        <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>{error}</span>
                    </div>

                    <button
                        onClick={() => {window.location.reload()}}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                    >
                        <img
                            src="/refresh_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
                            alt="Перезагрузить"
                            style={{ width: '48px', height: '48px' }}
                        />
                    </button>
                    <p style={{ marginTop: '10px', color: '#666' }}>Нажмите, чтобы попробовать снова</p>
                </div>

            </>
        )
    }
    return (
        <>
        {

        }

        </>
    )
}
export default FetchError