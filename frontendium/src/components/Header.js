import './Header.css';

function Header() {
    return(
        <div className='header'>
            <span className='logo'>
                <img 
                    src="logo.png" 
                    alt="logo" 
                    width="60" 
                    height="60"
                    style={{padding: "5px"}}/>
                CmpEndium
            </span>
            <span className='links'>
                {/* fill in href later */}
                <a href=""> Home </a>
                <a href=""> Search Jobs </a>
                <a href=""> Resume </a>
                <a href=""> Account </a>
            </span>
        </div>
    )
}

export default Header;