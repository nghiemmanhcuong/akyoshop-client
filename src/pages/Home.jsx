import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import SwiperCore, {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import HeroSlide from '../components/HeroSlide';
import HotSelection from '../components/HotSelection';
import Slider from '../components/Slider';
import Section, {SectionTitle, SectionBody} from '../components/Section';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';

import homeBanner from '../assets/image/home-banner.jpg';
import productApi from '../api/productApi';
import blogApi from '../api/blogApi';
import {homeSlide} from '../assets/data/hero-slide';

const Home = () => {
    SwiperCore.use([Navigation]);
    const [newProducts, setNewProducts] = useState(null);
    const [popularProducts, setPopularProducts] = useState(null);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getNewProducts = async () => {
            try {
                const response = await productApi.getNewProduct();
                setNewProducts(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get new product!', error);
            }
        };
        getNewProducts();
    }, []);

    useEffect(() => {
        const getPopularProducts = async () => {
            try {
                const response = await productApi.getPopularProduct();
                setPopularProducts(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get popular product!', error);
            }
        };
        getPopularProducts();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogApi.getBlog({limit: 9});
                setBlogs(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get blog!', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <Helmet className='home' title='TRANG CHỦ'>
            <HeroSlide dataImgs={homeSlide} time={3000} />
            <HotSelection />
            <Section>
                <SectionTitle>sản phẩm mới</SectionTitle>
                <SectionBody>
                    <div className='new-product'>
                        {newProducts ? <Slider data={newProducts} /> : <Loading />}
                    </div>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>sản phẩm nổi bật</SectionTitle>
                <SectionBody>
                    <div className='popular-product'>
                        {popularProducts ? <Slider data={popularProducts} /> : <Loading />}
                    </div>
                </SectionBody>
            </Section>
            <Section>
                <div className='home__banner'>
                    <Link to='/'>
                        <img src={homeBanner} alt='' />
                    </Link>
                </div>
            </Section>
            <Section>
                <div className='blog'>
                    <SectionTitle>
                        akyo blog's
                        <span>ĐÓN ĐẦU XU HƯỚNG, ĐỊNH HÌNH PHONG CÁCH</span>
                    </SectionTitle>
                    <SectionBody>
                        <Swiper
                            spaceBetween={5}
                            slidesPerView={1}
                            navigation={true}
                            breakpoints={{
                                1300: {
                                    slidesPerView: 3,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                            }}
                        >
                            {blogs.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <BlogItem item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </SectionBody>
                </div>
            </Section>
        </Helmet>
    );
};

export const BlogItem = (props) => {
    const ps = process.env.REACT_APP_IMG_URL;

    return (
        <div className='blog__item'>
            <div className='blog__item__img'>
                <Link to={`/blog/${props.item.slug}`}>
                    <img src={ps + props.item.imgMain} alt='' />
                </Link>
            </div>
            <h4 className='blog__item__title'>{props.item.name}</h4>
        </div>
    );
};

export default Home;
