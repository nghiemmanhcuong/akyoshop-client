import Section from '../components/Section';
import Breadcrumb from '../components/Breadcrumb';
import Helmet from '../components/Helmet';
import Grid from '../components/Grid';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import {FilterSize, FilterColor, FilterPrice} from '../components/CatalogFilter';

import {Link} from 'react-router-dom';
import {useParams, useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';

import productApi from '../api/productApi';
import catalogBanner1 from '../assets/image/catalog-banner-1.png';
import catalogBanner2 from '../assets/image/catalog-banner-2.jpg';

const size = [2, 4, 6, 8, 10, 12, 14];
const color = ['blue', 'white', 'black', 'red', 'yellow', 'gray'];
const price = [
    'Tất cả',
    'Nhỏ hơn 500,000₫',
    'Từ 500,000₫ - 1,000,000₫',
    'Từ 1,000,000₫ - 1,500,000₫',
    'Từ 1,500,000₫ - 2,000,000₫',
    'Từ 2,000,000₫ - 3,000,000₫',
    'Lớn hơn 3,000,000₫',
];

const Catalog = () => {
    const history = useHistory();
    const {category} = useParams();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState(null);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await productApi.getCategory();
            if (category === 'trouser') {
                setCategories(response.category[0]);
            } else {
                setCategories(response.category[1]);
            }
        };
        fetchCategory();
    }, [category]);

    useEffect(() => {
        const getProduct = async () => {
            if (category === 'trouser') {
                const response = await productApi.getTrousers({page: page});
                setProducts(response.data);
                setPages(response.pages);
            } else {
                const response = await productApi.getShirst({page: page});
                setProducts(response.data);
                setPages(response.pages);
            }
            history.push(`?page=${page}`);
        };
        getProduct();
    }, [category, page]);

    return (
        <Helmet
            title={`${
                categories.name ? categories.name.toUpperCase() : categories.name
            }-TRANG${page}`}
        >
            {category === 'trouser' ? (
                <Breadcrumb mainTitle='Quần Nữ' mainPath='/catalog/trouser' />
            ) : (
                <Breadcrumb mainTitle='Áo Nữ' mainPath='/catalog/shirt' />
            )}
            {category === 'trouser' ? (
                <div className='catalog__banner'>
                    <Link to='/akyoshop/'>
                        <img src={catalogBanner2} alt='' />
                    </Link>
                </div>
            ) : (
                <div className='catalog__banner'>
                    <Link to='/akyoshop/'>
                        <img src={catalogBanner1} alt='' />
                    </Link>
                </div>
            )}
            <Section>
                <div className='catalog'>
                    <div className='wrapper'>
                        <div className='catalog__category'>
                            <h3 className='catalog__category__title'>Danh Mục</h3>
                            <ul className='catalog__category__list'>
                                {categories.childrenName
                                    ? categories.childrenName.map((item, index) => (
                                          <Link to={`/akyoshop/catalog/${item}`} key={index}>
                                              <li className='catalog__category__list__item'>
                                                  {item}
                                              </li>
                                          </Link>
                                      ))
                                    : <Loading />}
                            </ul>
                        </div>
                        <div className='catalog__container'>
                            <div className='catalog__filter'>
                                <h1 className='catalog__filter__title'>{categories.name}</h1>
                                <div className='catalog__filter__container'>
                                    <FilterSize item={size} title='Kích Cỡ' class='size' />
                                    <FilterColor item={color} title='Màu Sắc' class='color' />
                                    <FilterPrice item={price} title='Giá' />
                                </div>
                            </div>
                            <div className='catalog__product'>
                                {products ? (
                                    <Grid col={3} mdCol={2} smCol={1} gap={10}>
                                        {products.map((item, index) => (
                                            <Card item={item} key={index} />
                                        ))}
                                    </Grid>
                                ) : (
                                    <Loading />
                                )}
                            </div>
                            <Pagination setPage={setPage} pages={pages} category={category} />
                        </div>
                    </div>
                </div>
            </Section>
        </Helmet>
    );
};

export default Catalog;
