import {useEffect, useState} from 'react';
import {FaRegTimesCircle} from 'react-icons/fa';
import {HiArrowNarrowRight} from 'react-icons/hi';

import Helmet from '../components/Helmet';
import Breadcrumb from '../components/Breadcrumb';

import userApi from '../api/userApi';
import numberWithComas from '../utils/numberWithComas';
import {Link} from 'react-router-dom';

const Cart = () => {
    const [cartList, setCartList] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);

    useEffect(() => {
        const fetchCartList = async () => {
            try {
                const response = await userApi.getCart();
                setCartList(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get cart list!', error);
            }
        };
        fetchCartList();
    }, []);

    useEffect(() => {
        const total = cartList.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        settotalPrice(total);
    }, [cartList]);

    const handleDeleteCart = (id) => {
        userApi.deleteCart(id);
    };

    return (
        <Helmet title='GIỎ HÀNG'>
            <Breadcrumb mainTitle='Giỏ Hàng' />
            <div className='wrapper'>
                {cartList.length > 0 ? (
                    <div className='cart'>
                        <div className='cart__info'>
                            <h4 className='cart__info__title'>
                                Bạn đang có <span>{cartList.length}</span> sản phẩm trong giỏ hàng
                            </h4>
                            <div className='cart__info__price'>
                                <span>Thành Tiền</span>
                                <span>{numberWithComas(totalPrice)}đ</span>
                            </div>
                            <div className='cart__info__btn'>
                                <Link
                                    to={`/payment/${
                                        cartList[0] ? cartList[0].userId : ''
                                    }`}
                                >
                                    <button className='cart__info__btn__item'>Đặt Hàng</button>
                                </Link>
                                <Link to='/catalog/shirst'>
                                    <button className='cart__info__btn__item'>
                                        Tiếp tục mua hàng
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className='cart__list'>
                            {cartList.map((item, index) => (
                                <CartItem item={item} key={index} delete={handleDeleteCart} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='cart__empty'>
                        <h2 className='cart__empty__title'>
                            Bạn Chưa có sản phẩm nào trong giỏ hàng
                        </h2>
                        <Link to='/' className='cart__empty__link'>
                            Nhấn Vào Đây Để Mua Hàng
                            <div className='cart__empty__link__icon'>
                                <HiArrowNarrowRight size={22}/>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </Helmet>
    );
};

const CartItem = (props) => {
    const ps = process.env.REACT_APP_IMG_URL;
    const total = props.item.price * props.item.quantity;

    return (
        <div className='cart__item'>
            <div className='cart__item__delete' onClick={props.delete.bind(this, props.item._id)}>
                <FaRegTimesCircle size={22} />
            </div>
            <div className='cart__item__img'>
                <img src={props.item.img ? ps + props.item.img : ''} alt='' />
            </div>
            <div className='cart__item__info'>
                <h4 className='cart__item__info__name'>{props.item.name}</h4>
                <div className='cart__item__info__style'>
                    <div className='cart__item__info__style__color'>
                        {props.item.color
                            ? props.item.color.map((item, index) => (
                                  <div
                                      key={index}
                                      className={`cart__item__info__style__color__item bg-${item}`}
                                  ></div>
                              ))
                            : null}
                    </div>
                    <div className='cart__item__info__style__size'>{props.item.size}</div>
                </div>
                <div className='cart__item__info__total'>
                    <div className='cart__item__info__total__price'>{numberWithComas(total)}đ</div>
                    <div className='cart__item__info__total__quantity'>
                        <span>số lượng: </span> {props.item.quantity}
                    </div>
                    {props.item.sale ? (
                        <div className='cart__item__info__total__sale'>
                            <span>giảm giá: </span>
                            {props.item.sale}%
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Cart;
