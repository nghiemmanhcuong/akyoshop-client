import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {GrNext, GrPrevious} from 'react-icons/gr';

const Pagination = (props) => {
    const pages = [];
    const [activePage, setActivePage] = useState(1);
    const [pageNumberLimit, setPageNumberLimit] = useState(3);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    for (let index = 0; index < props.pages; index++) {
        pages.push(index + 1);
    }

    const handleNext = () => {
        setActivePage(activePage + 1);

        if (activePage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrev = () => {
        setActivePage(activePage - 1);

        if ((activePage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    useEffect(() => {
        if (props.setPage) {
            props.setPage(activePage);
        }
    }, [activePage]);

    useEffect(() => {
        setActivePage(1);
    }, [props.category]);

    return (
        <div className='pagination'>
            <ul className='pagination__number'>
                <li
                    className={`pagination__number__item ${
                        activePage == pages[0] ? 'disabled' : ''
                    }`}
                    onClick={handlePrev}
                >
                    <GrPrevious size={18} />
                </li>
                {pages.map((page, index) =>
                    page < maxPageNumberLimit + 1 && page > minPageNumberLimit ? (
                        <li
                            className={`pagination__number__item ${
                                activePage === page ? 'active' : ''
                            }`}
                            key={index}
                            onClick={() => setActivePage(page)}
                        >
                            {page}
                        </li>
                    ) : null,
                )}
                <li
                    className={`pagination__number__item ${
                        activePage == pages[pages.length - 1] ? 'disabled' : ''
                    }`}
                    onClick={handleNext}
                >
                    <GrNext size={18} />
                </li>
            </ul>
        </div>
    );
};

Pagination.propTypes = {
    setPage: PropTypes.func,
    pages: PropTypes.number.isRequired,
    category: PropTypes.string,
};

export default Pagination;
