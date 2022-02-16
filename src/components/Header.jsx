import {useRef, useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {BsSearch} from 'react-icons/bs';
import {HiUserCircle} from 'react-icons/hi';
import {BsFillCartCheckFill} from 'react-icons/bs';
import {FaBars, FaTimes} from 'react-icons/fa';

import Menu from './Menu';

import {AuthContext} from '../context/authContext/authContext';

const Header = () => {
    const {
        authState: {user},
    } = useContext(AuthContext);
    const searchRef = useRef(null);
    const headerRef = useRef(null);
    const [menuActive, setMenuActive] = useState(false);

    const searchToggle = () => {
        searchRef.current.classList.toggle('active');
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            searchRef.current.classList.remove('active');
            setMenuActive(false);
            if (window.scrollY > 40.8) {
                headerRef.current.classList.add('fixed');
            } else {
                headerRef.current.classList.remove('fixed');
            }
        });
    }, []);
    return (
        <header className='header' ref={headerRef}>
            <div className='header__container'>
                <div className='header__menu__toggle' onClick={() => setMenuActive(!menuActive)}>
                    {menuActive ? (
                        <FaTimes size={24} color={'black'} />
                    ) : (
                        <FaBars size={24} color={'black'} />
                    )}
                </div>
                <div className='header__logo'>
                    <Link to='/akyoshop/'>
                        <span className='header__logo__title'>AKYO SHOP</span>
                    </Link>
                </div>
                <Menu active={menuActive} user={user}/>
                <div className='info'>
                    <div className='info__search__toggle' onClick={searchToggle}>
                        <BsSearch size={24} color='black' />
                    </div>
                    <div className='info__search' ref={searchRef}>
                        <input type='text' placeholder='Tìm Kiếm' />
                        <Link to='/akyoshop/' className='info__search__icon'>
                            <BsSearch size={18} color='white' />
                        </Link>
                    </div>
                    <div className='info__item'>
                        <Link to='/akyoshop/login' className='info__item__link'>
                            <HiUserCircle size={20} />
                            <span className='info__item__link__title'>
                                {user.lastName ? user.lastName : 'Tài Khoản'}
                            </span>
                        </Link>
                    </div>
                    <div className='info__item'>
                        <Link to={user.email ? '/akyoshop/cart' : '/akyoshop/login'} className='info__item__link'>
                            <BsFillCartCheckFill size={18} />
                            <span className='info__item__link__title'>Giỏ Hàng</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
