import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {GiCheckMark} from 'react-icons/gi';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

import Helmet from '../components/Helmet';
import Breadcrumb from '../components/Breadcrumb';
import Section, {SectionTitle, SectionBody} from '../components/Section';
import Slider from '../components/Slider';
import Loading from '../components/Loading';
import Toast from '../components/Toast';

import userApi from '../api/userApi';
import productApi from '../api/productApi';
import numberWithComas from '../utils/numberWithComas.js';

const Product = () => {
    const {slug} = useParams();
    const ps = process.env.REACT_APP_IMG_URL;
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [mainImg, setMainImg] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState('');
    const [toastInfo, setToastInfo] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productApi.getProductBySlug(slug);
                setProduct(response.data);
                setMainImg(response.data.img[0]);
                setSize(response.data.size[0]);
                setColor([response.data.color[0]]);
            } catch (error) {
                console.log('Feiled to fetch api get product!', error);
            }
        };
        fetchProduct();
    }, [slug]);

    const addProductToCart = async () => {
        try {
            const infoProduct = {
                id: product._id,
                img:product.img[0],
                price: product.price,
                sale: product.sale ? product.sale : null,
                name: product.name,
                size,
                color,
                quantity,
            };
            const response = await userApi.addTocart(infoProduct);
            if (response.success) {
                setToastInfo({
                    active: true,
                    title: response.message,
                    desc: '',
                    bg: 'green',
                });
            } else {
                setToastInfo({
                    active: true,
                    title: 'Thêm Vào Giỏi Hàng Thất Bại!!!',
                    desc: response.message,
                    bg: 'red',
                });
            }
        } catch (error) {
            console.log('Feiled to fetch api add to cart!', error);
        }
    };

    useEffect(() => {
        const fetchSimilarProduct = async () => {
            try {
                const response = await productApi.getProductRandom();
                setSimilarProducts(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get similar product!', error);
            }
        };
        fetchSimilarProduct();
    }, [slug]);

    const countIncrease = () => {
        setQuantity(quantity + 1);
    };

    const countReduction = () => {
        setQuantity(quantity - 1 <= 0 ? 1 : quantity - 1);
    };

    const colorActive = (item) => {
        if (color.includes(item)) {
            let newColor = color.filter((e) => {
                return e !== item;
            });
            setColor(newColor);
        } else {
            setColor([...color, item]);
        }
    };

    return (
        <Helmet title={product.name ? product.name : ''}>
            <Toast toastInfo={toastInfo} />
            <Breadcrumb mainTitle='Quần Nữ' mainPath='/akyoshop/catalog/trouser' subTitle={product.name} />
            <div className='product'>
                <div className='wrapper product-wrapper'>
                    <div className='product__img'>
                        <div className='product__img__list'>
                            {product.img
                                ? product.img.map((item, index) => (
                                      <img
                                          className={`product__img__list__item ${
                                              product.img.length < 3 ? 'active' : ''
                                          }`}
                                          key={index}
                                          src={item ? ps + item : ''}
                                          alt=''
                                          onClick={() => setMainImg(item)}
                                      />
                                  ))
                                : null}
                        </div>
                        <div className='product__img__main'>
                            <img src={mainImg ? ps + mainImg : ''} alt='' />
                        </div>
                    </div>
                    <div className='product__info'>
                        <h1 className='product__info__name'>{product.name}</h1>
                        <div className='product__info__trademark'>
                            Thương Hiệu: <span>{product.trademark}</span>
                        </div>
                        <div className='product__info__code'>
                            Mã SP: <span>{product.code}</span>
                        </div>
                        <div className='product__info__price'>
                            {product.price ? (
                                <span className='product__info__price__new'>
                                    {numberWithComas(product.price)}
                                    <sup>đ</sup>
                                </span>
                            ) : null}
                            {product.priceOld ? (
                                <del className='product__info__price__old'>
                                    {numberWithComas(product.priceOld)}
                                    <sup>đ</sup>
                                </del>
                            ) : null}
                            {product.sale ? (
                                <span className='product__info__price__sale'>{product.sale}%</span>
                            ) : null}
                        </div>
                        <div className='product__info__size'>
                            <h4 className='product__info__size__title'>Kích thước</h4>
                            <div className='product__info__size__list'>
                                {product.size
                                    ? product.size.map((item, index) => (
                                          <div
                                              key={index}
                                              className='product__info__size__list__item'
                                              onClick={() => setSize(item)}
                                          >
                                              <span>{item}</span>
                                              {item === size ? (
                                                  <>
                                                      <div className='product__info__size__list__item__icon'>
                                                          <GiCheckMark size={8} color='white' />
                                                      </div>
                                                      <div className='product__info__size__list__item__background'></div>
                                                  </>
                                              ) : null}
                                          </div>
                                      ))
                                    : null}
                            </div>
                        </div>
                        <div className='product__info__color'>
                            <h4 className='product__info__color__title'>Màu sắc</h4>
                            <div className='product__info__color__list'>
                                {product.color
                                    ? product.color.map((item, index) => (
                                          <div
                                              key={index}
                                              className={`product__info__color__list__item bg-${item}`}
                                              onClick={() => colorActive(item)}
                                          >
                                              {color.includes(item) ? (
                                                  <GiCheckMark
                                                      size={17}
                                                      color={`${
                                                          item === 'white' || item === 'yellow'
                                                              ? 'black'
                                                              : 'white'
                                                      }`}
                                                  />
                                              ) : null}
                                          </div>
                                      ))
                                    : null}
                            </div>
                        </div>
                        <div className='product__info__quantity'>
                            <h4 className='product__info__quantity__title'>Số lượng</h4>
                            <div className='product__info__quantity__count'>
                                <div
                                    className='product__info__quantity__count__btn'
                                    onClick={countReduction}
                                >
                                    <MdKeyboardArrowLeft size={26} />
                                </div>
                                <span className='product__info__quantity__count__number'>
                                    {quantity}
                                </span>
                                <div
                                    className='product__info__quantity__count__btn'
                                    onClick={countIncrease}
                                >
                                    <MdKeyboardArrowRight size={26} />
                                </div>
                            </div>
                        </div>
                        <div className='product__info__buy'>
                            <button className='product__info__buy__btn' onClick={addProductToCart}>
                                Thêm vào giỏ
                            </button>
                            <button className='product__info__buy__btn'>Mua ngay</button>
                        </div>
                        <ul className='product__info__list'>
                            <li className='product__info__list__item'>
                                <span>Chất liệu:</span>
                                {product.material}
                            </li>
                            <li className='product__info__list__item'>
                                <span>Kiểu dáng:</span>
                                {product.designs}
                            </li>
                            <li className='product__info__list__item'>
                                <span>Phù hợp:</span>
                                {product.fit}
                            </li>
                            <li className='product__info__list__item'>
                                <span>Sản phẩm thuộc dòng sản phẩm:</span>
                                {product.productLine}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Section>
                <SectionTitle>SẢN PHẨM TƯƠNG TỰ</SectionTitle>
                <SectionBody>
                    {similarProducts ? <Slider data={similarProducts} /> : <Loading />}
                </SectionBody>
            </Section>
        </Helmet>
    );
};

export default Product;
