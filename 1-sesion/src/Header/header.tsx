import "./header.css"
function Header() {
    const grupName ='2-ПМИ-2'
    return (
        <>
            <div className={'main_Module'}>
                <div className={'Header-contener_button'}>
                   <span><button className={'Header-button'}>Рассписание на сегодня</button></span>
                    <span><button className={'Header-button'}>Рассписание</button></span>
                    <span><button className={'Header-button'}>Предметы</button></span>
                </div>
                <div className={'Header-contener_grop'}>
                    <span className={'Header-contener_grop_Name'}>Группа: {grupName}</span>
                    <span><button className={'Header-contener_grop_button'}><img src="../../public/1483063.png" alt="trash" className={'Header-contener_grop_img'} /></button></span>
                </div>
            </div>
        </>
    )
}
export default  Header