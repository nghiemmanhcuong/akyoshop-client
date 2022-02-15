import Grid from '../components/Grid';
import Helmet from '../components/Helmet';
import Breadcrumb from '../components/Breadcrumb';
import Toast from '../components/Toast';

import {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {AuthContext} from '../context/authContext/authContext';

const Login = () => {
    const History = useHistory();
    const {registerUser, loginUser, setLoginUser} = useContext(AuthContext);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [toastInfo, setToastInfo] = useState({});

    const handleLoginUser = async (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            alert('Missing email or password!');
        } else {
            try {
                const response = await loginUser({email: loginEmail, password: loginPassword});
                if (response.success) {
                    setLoginUser();
                    History.push('/');
                } else {
                    setToastInfo({
                        active: true,
                        title: 'Đăng Nhập Thất Bại!!!',
                        desc: response.message,
                        bg: 'red',
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Missing email or password!');
        } else {
            try {
                const newUser = {
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                    firstName: firstName,
                    lastName: lastName,
                };
                const response = await registerUser(newUser);
                if (response.success) {
                    setToastInfo({
                        active: true,
                        title: response.message,
                        desc: 'Mời Đăng Nhập Để Cùng Mua Sắm Cùng AKYO Nhé!',
                        bg: 'green',
                    });
                } else {
                    setToastInfo({
                        active: true,
                        title: 'Đăng Ký Thất Bại!!!',
                        desc: response.message,
                        bg: 'red',
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Helmet title='ĐĂNG NHẬP-ĐĂNG KÝ'>
            <Toast toastInfo={toastInfo} />
            <Breadcrumb mainTitle='ĐĂNG NHẬP&amp;ĐĂNG KÝ' />
            <div className='login'>
                <Grid col={2} mdCol={1} gap={30}>
                    <form className='login__form' onSubmit={handleLoginUser}>
                        <div className='login__form__header'>
                            <h4 className='login__form__header__title'>ĐĂNG NHẬP</h4>
                            <span className='login__form__header__desc'>
                                Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên
                                và nhận được những ưu đãi tốt hơn!
                            </span>
                        </div>
                        <div className='login__form__input'>
                            <LoginFormGroup label='Email' setValue={setLoginEmail} />
                            <LoginFormGroup
                                label='Mật Khẩu'
                                type='password'
                                setValue={setLoginPassword}
                            />
                        </div>
                        <Link to='/akyoshop/' className='login__form__forgot'>
                            Quên mật khẩu
                        </Link>
                        <LoginButton title='Đăng nhập' />
                    </form>
                    <form className='login__form' onSubmit={handleRegisterSubmit}>
                        <div className='login__form__header'>
                            <h4 className='login__form__header__title'>ĐĂNG KÝ</h4>
                            <span className='login__form__header__desc'>
                                Hãy đăng ký ngay để tích lũy điểm thành viên và nhận được những ưu
                                đãi tốt hơn!
                            </span>
                        </div>
                        <div className='login__form__input'>
                            <LoginFormGroup label='Họ' setValue={setFirstName} />
                            <LoginFormGroup label='Tên' setValue={setLastName} />
                            <LoginFormGroup label='Email' setValue={setEmail} />
                            <LoginFormGroup label='Số điện thoại' setValue={setPhoneNumber} />
                            <LoginFormGroup
                                label='Mật Khẩu'
                                type='password'
                                setValue={setPassword}
                            />
                        </div>
                        <div className='login__form__rules'>
                            <label className='login__form__rules__group'>
                                <input type='checkbox' />
                                Đăng ký nhận bản tin
                            </label>
                            <label className='login__form__rules__group'>
                                <input type='checkbox' />
                                Tôi đồng ý với các <Link to='/akyoshop/'> điều khoản </Link> của NEM
                            </label>
                        </div>
                        <LoginButton title='Đăng Ký' />
                    </form>
                </Grid>
            </div>
        </Helmet>
    );
};

const LoginFormGroup = (props) => {
    return (
        <div className='login__form__input__group'>
            <label>{props.label}</label>
            <input
                type={`${props.type ? props.type : 'text'}`}
                placeholder={props.label}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
};

const LoginButton = (props) => {
    return (
        <div className='login__form__button'>
            <button>{props.title}</button>
        </div>
    );
};

export default Login;
