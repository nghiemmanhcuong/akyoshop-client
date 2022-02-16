import {Link} from 'react-router-dom';

import hotSelectionImg1 from '../assets/image/home_new_banner_1.jpg';
import hotSelectionImg2 from '../assets/image/home_new_banner_2.png';

import Grid from './Grid';

const HotSelection = () => {
    return (
        <div className='hot-selection'>
            <Grid
                col={2}
                mdCol={1}
                gap={5}
            >
                <HotSelectionItem img={hotSelectionImg1} title='SPRING COLLECTION'/>                
                <HotSelectionItem img={hotSelectionImg2} title='TRENDY DRESS'/>                
            </Grid>
        </div>
    );
};

const HotSelectionItem = (props) => {
    return (
        <div className='hot-selection__item'>
            <Link to='/'>
                <img src={props.img} alt='' />
                <div className='hot-selection__item__content'>
                    <h3 className='hot-selection__item__content__title'>{props.title}</h3>
                    <span className='hot-selection__item__content__btn'>SHOW NOW</span>
                </div>
            </Link>
        </div>
    );
};

export default HotSelection;
