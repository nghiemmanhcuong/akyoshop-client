import {BsFacebook, BsYoutube} from 'react-icons/bs';
import {GrInstagram} from 'react-icons/gr';

const RegisterNew = () => {
    return (
        <div className='register-new'>
            <div className='register-new__header'>
                <h2 className='register-new__header__title'>ĐĂNG KÝ BẢN TIN</h2>
                <span className='register-new__header__desc'>
                    Đăng ký nhận bản tin NEM để được cập nhật những mẫu thiết kế mới nhất
                </span>
            </div>
            <div className='register-new__form'>
                <input
                    type='text'
                    className='register-new__form__input'
                    placeholder='Vui lòng nhập email...'
                />
                <button className='register-new__form__btn'>ĐĂNG KÝ</button>
            </div>
            <div className='register-new__icon'>
                <a href='#!' className='register-new__icon__item bg-blue'>
                    <BsFacebook size={22}/>
                </a>
                <a href='#!' className='register-new__icon__item bg-red'>
                    <GrInstagram size={22}/>
                </a>
                <a href='#!' className='register-new__icon__item bg-red'>
                    <BsYoutube size={22}/>
                </a>
            </div>
        </div>
    );
};

export default RegisterNew;
