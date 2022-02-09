import {useRef, useState} from 'react';
import {TiArrowSortedDown} from 'react-icons/ti';
import {GiCheckMark} from 'react-icons/gi';

const clickOutsideRef = (contentRef, toggleRef) => {
    document.addEventListener('mousedown', (e) => {
        if (toggleRef.current && toggleRef.current.contains(e.target)) {
            contentRef.current.classList.toggle('active');
        } else if (contentRef.current && contentRef.current.contains(e.target)) {
            contentRef.current.classList.add('active');
        } else {
            if (toggleRef.current && !toggleRef.current.contains(e.target)) {
                contentRef.current.classList.remove('active');
            }
        }
    });
};

export const FilterSize = (props) => {
    const contentRef = useRef(null);
    const toggleRef = useRef(null);
    const [active, setActive] = useState([]);

    clickOutsideRef(contentRef, toggleRef);

    const activeSize = (index) => {
        if (active.includes(index)) {
            let newActive = active.filter((e) => {
                return e !== index;
            });
            setActive(newActive);
        } else {
            setActive([...active, index]);
        }
    };

    return (
        <div className='catalog__filter__item'>
            <div className='catalog__filter__item__title' ref={toggleRef}>
                {props.title}
                <TiArrowSortedDown size={16} />
            </div>
            <div className={`catalog__filter__item__list ${props.class}`} ref={contentRef}>
                {props.item.map((item, index) => (
                    <li
                        key={index}
                        className={`catalog__filter__item__list__item ${props.class} ${
                            active.includes(index) ? 'active' : ''
                        }`}
                        onClick={() => activeSize(index)}
                    >
                        {item}
                    </li>
                ))}
            </div>
        </div>
    );
};

export const FilterColor = (props) => {
    const contentRef = useRef(null);
    const toggleRef = useRef(null);
    const [active, setActive] = useState([]);

    clickOutsideRef(contentRef, toggleRef);

    const activeColor = (index) => {
        if (active.includes(index)) {
            let newActive = active.filter((e) => {
                return e !== index;
            });
            setActive(newActive);
        } else {
            setActive([...active, index]);
        }
    };

    return (
        <div className='catalog__filter__item'>
            <div className='catalog__filter__item__title' ref={toggleRef}>
                {props.title}
                <TiArrowSortedDown size={16} />
            </div>
            <div className={`catalog__filter__item__list ${props.class}`} ref={contentRef}>
                {props.item.map((item, index) => (
                    <li
                        key={index}
                        className={`catalog__filter__item__list__item bg-${item} ${props.class}`}
                        onClick={() => activeColor(index)}
                    >{active.includes(index) ? <GiCheckMark size={22}/> : null}</li>
                ))}
            </div>
        </div>
    );
};

export const FilterPrice = (props) => {
    const contentRef = useRef(null);
    const toggleRef = useRef(null);

    clickOutsideRef(contentRef, toggleRef);

    return (
        <div className='catalog__filter__price'>
            <div className='catalog__filter__item__title' ref={toggleRef}>
                {props.title}
                <TiArrowSortedDown size={16} />
            </div>
            <div className='catalog__filter__price__list' ref={contentRef}>
                {props.item.map((item, index) => (
                    <label key={index} className='catalog__filter__price__list__item'>
                        <input type='radio' name='price'/>
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
};
