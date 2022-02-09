import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SwiperCore, {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import Card from '../components/Card';

const Slider = (props) => {
    SwiperCore.use([Navigation]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <Swiper
            spaceBetween={5}
            slidesPerView={1}
            navigation={true}
            breakpoints={{
                1300: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 3,
                },
                640: {
                    slidesPerView: 2,
                },
            }}
        >
            {data.map((product, index) => (
                <SwiperSlide key={index}>
                    <Card item={product}/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

Slider.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Slider;
