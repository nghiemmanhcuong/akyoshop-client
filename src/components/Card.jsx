import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import numberWithComas from '../utils/numberWithComas';

const Card = (props) => {
    const ps = process.env.REACT_APP_IMG_URL;

    return (
        <div className='card'>
            <div className='card__img'>
                <Link to={`/akyoshop/product/${props.item.slug}`}>
                    <img src={ps + props.item.img[0]} alt='' />
                    <div className='card__img__view'>
                        <div className='card__img__view__btn'>
                            Chi Tiết
                        </div>
                    </div>
                </Link>
            </div>
            <div className='card__content'>
                <h3 className='card__content__name'>
                    <Link to={`/akyoshop/product/${props.item.slug}`}>{props.item.name}</Link>
                </h3>
                <div className='card__content__price'>
                    <span>{numberWithComas(props.item.price)}<u>đ</u></span>
                    {props.item.priceOld ? (
                        <del className='card__content__price__old'>
                            {numberWithComas(props.item.priceOld)}đ
                        </del>
                    ) : null}
                </div>
            </div>
            {props.item.sale ? (
                <div className='card__sale'>
                    <span className='card__sale__number'>{props.item.sale}%</span>
                </div>
            ) : null}
        </div>
    );
};

Card.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Card;
