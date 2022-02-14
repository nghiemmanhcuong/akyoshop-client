import React from 'react';
import PropTypes from 'prop-types';

const Toast = (props) => {
    const {toastInfo} = props;
    const [active, setActive] = React.useState(toastInfo.active);

    React.useEffect(() => {
        setActive(toastInfo.active);
        const timeOut = setTimeout(() => {
            setActive(false);
        }, 4000);

        return () => {
            clearTimeout(timeOut);
        };
    }, [toastInfo]);

    return (
        <div
            className={`toast ${active && 'active'} bg-${toastInfo.bg} ${
                toastInfo.arrow ? 'arrow' : ''
            }`}
        >
            <h3 className='toast__title'>{toastInfo.title}</h3>
            <span className='toast__desc'>{toastInfo.desc}</span>
        </div>
    );
};

Toast.propTypes = {
    toastInfo: PropTypes.object,
};

export default Toast;
