import Breadcrumb from '../components/Breadcrumb';
import Helmet from '../components/Helmet';
import Grid from '../components/Grid';
import {BlogItem} from '../pages/Home';
import Section, {SectionBody} from '../components/Section';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';


import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import blogApi from '../api/blogApi';

const Blog = () => {
    const history = useHistory();
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);
    const [blogs, setBlogs] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogApi.getBlog({page: page, limit: 8});
                setBlogs(response.data);
                setPages(response.pages);
            } catch (error) {
                console.log('Feiled to fetch api get blog!', error);
            }
            history.push(`?page=${page}`);
        };
        fetchBlogs();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <Helmet title='TIN TỨC'>
            <Breadcrumb mainTitle='Tin Tức' mainPath='/blog' />
            <div className='blog'>
                <div className='blog__header'>
                    <Link to='/blog'>
                        <span className='blog__header__title'>XU HƯỚNG</span>
                    </Link>
                    <div className='blog__header__br'></div>
                    <Link to='/'>
                        <span className='blog__header__title event'>XỰ KIỆN</span>
                    </Link>
                </div>
                {blogs ? (
                    <Section>
                        <SectionBody>
                            <Grid col={3} mdCol={2} smCol={1} gap={10}>
                                {blogs.map((item, index) => (
                                    <BlogItem item={item} key={index} />
                                ))}
                            </Grid>
                        </SectionBody>
                        <Pagination pages={pages} setPage={setPage} />
                    </Section>
                ) : (
                    <Loading />
                )}
            </div>
        </Helmet>
    );
};

export default Blog;
