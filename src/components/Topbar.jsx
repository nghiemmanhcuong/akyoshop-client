import {Link} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import {FaPhone} from 'react-icons/fa';

const Topbar = () => {
    return (
        <div className='topbar'>
            <div className='topbar__container'>
                <div className='topbar__item'>
                    <Link to='/' className='topbar__item__link'>
                        <AiFillHome size={17}/>
                        <span>Hệ thống cửa hàng</span>
                    </Link>
                </div>
                <div className='topbar__item'>
                    <Link to='/' className='topbar__item__link'>
                        <FaPhone size={16}/>
                        <span>CSKH: 0987954221</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
