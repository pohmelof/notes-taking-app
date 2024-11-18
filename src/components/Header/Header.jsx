import './header.css'

const Header = ({toggleSidebar}) => {
    return (
        <header className='header '>
            <button className='btn open-sidebar' onClick={toggleSidebar}>☰</button>
            <h1 className='header-logo'>My notes</h1>
        </header>
    )
}

export default Header