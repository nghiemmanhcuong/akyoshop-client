import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumb = (props) => {
    return (
        <div className='breadcrumb'>
            <div className='wrapper'>
                <Link to='/'>Trang Chủ</Link>
                <span className='breadcrumb__line'>|</span>
                <Link to={props.mainPath ? props.mainPath : ''}>{props.mainTitle}</Link>
                {props.subTitle ? <span className='breadcrumb__line'>|</span> : null}
                {props.subTitle ? <span>{props.subTitle}</span> : null}
            </div>
        </div>
    );
};

Breadcrumb.propTypes = {
    mainTitle: PropTypes.string.isRequired,
    mainPath: PropTypes.string,
    subTitle: PropTypes.string,
};

export default Breadcrumb;
