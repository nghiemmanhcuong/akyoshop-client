import {Link} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import {CgArrowLongRight} from 'react-icons/cg';
import {CgArrowLongLeft} from 'react-icons/cg';

const HeroSlide = (props) => {
    const [actice, setActice] = useState(0);
    const [dataImgs, setDataImgs] = useState([]);
    const nextRef = useRef(null);

    const nextSlide = () => {
        setActice(actice >= dataImgs.length - 1 ? 0 : actice + 1);
    };

    const prevSlide = () => {
        setActice(actice <= 0 ? dataImgs.length - 1 : actice - 1);
    };

    useEffect(() => {
        setDataImgs(props.dataImgs ? props.dataImgs : []);
    }, [props.dataImgs]);

    useEffect(() => {
        const activeIndex = setInterval(() => {
            nextRef.current.click();
        }, 10000);

        return () => {
            clearInterval(activeIndex);
        }
    }, []);

    return (
        <div className='hero-slide'>
            <div className='hero-slide__btn hero-slide__btn--left' onClick={prevSlide}>
                <CgArrowLongLeft size={22} color='white' />
            </div>
            {dataImgs.map((item, index) => (
                <div className={`hero-slide__item ${actice === index ? 'active' : ''}`} key={index}>
                    <Link to='/akyoshop/'>
                        <img className='hero-slide__item__img' src={item} alt='' />
                    </Link>
                </div>
            ))}
            <div className='hero-slide__btn hero-slide__btn--right' onClick={nextSlide} ref={nextRef}>
                <CgArrowLongRight size={22} color='white' />
            </div>
        </div>
    );
};

export default HeroSlide;
