import {useEffect,useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';

const menuNav = [
    {
        display: 'trang chủ',
        path: '/',
    },
    {
        display: 'quần nữ',
        path: '/catalog/trouser',
    },
    {
        display: 'áo nữ',
        path: '/catalog/shirt',
    },
    {
        display: 'blog',
        path: '/blog',
    },
    {
        display: 'liên hệ',
        path: '/contact',
    },
];

const Menu = (props) => {
    const {pathname} = useLocation();
    const active = menuNav.findIndex((e) => e.path === pathname);

    return (
        <nav className={`menu ${props.active ? 'active' : ''}`}>
            <ul className='menu__list'>
                {menuNav.map((item, index) => (
                    <li key={index} className='menu__list__item'>
                        <Link
                            to={item.path}
                            className={`menu__list__item__link ${active === index ? 'active' : ''}`}
                        >
                            {item.display}
                        </Link>
                    </li>
                ))}
                <li className='menu__list__item mobile'>
                    <Link to='/' className='menu__list__item__link'>
                        Giỏ Hàng
                    </Link>
                </li>
                <li className='menu__list__item mobile'>
                    <Link to='/login' className='menu__list__item__link'>
                        Đăng Nhập
                    </Link>
                </li>
                <li className='menu__list__item mobile'>
                    <Link to='/login' className='menu__list__item__link'>
                        Đăng Ký
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
