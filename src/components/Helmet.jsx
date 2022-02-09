import React from 'react';
import PropTypes from 'prop-types';

const Helmet = (props) => {
    document.title = `AKYO-${props.title}`;

    React.useEffect(() => {
        window.scrollTo(0,0);
    }, [props.title]);

    return <div>{props.children}</div>;
};

Helmet.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Helmet;
