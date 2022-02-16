import {Link, useParams, useHistory} from 'react-router-dom';
import Helmet from '../components/Helmet';
import {IoIosArrowForward} from 'react-icons/io';
import {useEffect, useState} from 'react';
import userApi from '../api/userApi';
import numberWithComas from '../utils/numberWithComas';
import orderApi from '../api/orderApi';
import Toast from '../components/Toast';

const Payment = () => {
    const {id} = useParams();
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [address, setAddress] = useState('');
    const [toastInfo, setToastInfo] = useState({});

    useEffect(() => {
        const fetchCartList = async () => {
            try {
                const response = await userApi.getCart();
                setProducts(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get cart list!', error);
            }
        };
        fetchCartList();
    }, []);

    useEffect(() => {
        const total = products.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        settotalPrice(total);
    }, [products]);

    const handleOrder = async () => {
        if (!name || !email || !phoneNumber || !address) {
            setToastInfo({
                active: true,
                title: 'Vui Lòng Điền Đủ Thông Tin!',
                desc: '',
                bg: 'red',
                arrow: true,
            });
        } else {
            const response = await orderApi.addOrder({
                name,
                email,
                phoneNumber,
                address,
                cart: products,
                userId: id,
            });

            if (response.success) {
                userApi.deleteMany();
                history.push('/order-success');
            }
        }
    };

    return (
        <>
            <Toast toastInfo={toastInfo} />
            <Helmet title='THANH TOÁN'>
                <div className='wrapper'>
                    <div className='payment'>
                        <div className='payment__info'>
                            <div className='payment__info__logo'>
                                <Link to='/'>
                                    <span className='payment__info__logo__title'>AKYO SHOP</span>
                                </Link>
                            </div>
                            <div className='payment__info__steps'>
                                <Link to='/cart'>Giỏ Hàng</Link>
                                <IoIosArrowForward />
                                <Link to='/payment'>Thông Tin Vận Chuyển</Link>
                            </div>
                            <h3 className='payment__info__title'>Thông tin thanh toán</h3>
                            <form className='payment__info__form'>
                                <input
                                    type='text'
                                    placeholder='Họ và tên'
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type='text'
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type='text'
                                    placeholder='Số điện thoại'
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <input
                                    type='text'
                                    placeholder='Địa chỉ'
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </form>
                            <div className='payment__info__button'>
                                <Link to='/cart'>Giỏ hàng</Link>
                                <button onClick={handleOrder}>Đặt Hàng</button>
                            </div>
                        </div>
                        <div className='payment__product'>
                            <div className='payment__product__list'>
                                {products.map((item, index) => (
                                    <ProductItem item={item} key={index} />
                                ))}
                            </div>
                            <div className='payment__product__temporary'>
                                <p>Tạm Tính</p>
                                <span>
                                    {numberWithComas(totalPrice)}
                                    <u>đ</u>
                                </span>
                            </div>
                            <div className='payment__product__total'>
                                <p>Tổng tiền (Chưa bao gồm phí ship)</p>
                                <span>
                                    <span>VND</span>
                                    {numberWithComas(totalPrice)}
                                    <u>đ</u>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Helmet>
        </>
    );
};

const ProductItem = (props) => {
    const ps = process.env.REACT_APP_IMG_URL;
    const total = props.item.price * props.item.quantity;

    return (
        <div className='payment__product__item'>
            <div className='payment__product__item__img'>
                <img src={ps + props.item.img} alt='' />
                <span className='payment__product__item__img__quantily'>{props.item.quantity}</span>
            </div>
            <div className='payment__product__item__info'>
                <div className='payment__product__item__info__content'>
                    <h3 className='payment__product__item__info__content__name'>
                        {props.item.name}
                    </h3>
                    <span>{props.item.size}/</span>
                    {props.item.color.map((item, index) => (
                        <span key={index}>{item},</span>
                    ))}
                </div>
                <div className='payment__product__item__info__price'>
                    {numberWithComas(total)}
                    <u>đ</u>
                </div>
            </div>
        </div>
    );
};

export default Payment;
