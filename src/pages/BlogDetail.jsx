import Helmet from '../components/Helmet';
import Breadcrumb from '../components/Breadcrumb';
import Grid from '../components/Grid';

import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import blogApi from '../api/blogApi';
import {BlogItem} from '../pages/Home';

const BlogDetail = () => {
    const ps = process.env.REACT_APP_IMG_URL;
    const {slug} = useParams();
    const [blog, setBlog] = useState({});
    const [blogPopularSitebar, setBlogPopularSitebar] = useState([]);
    const [blogPopular, setBlogPopular] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await blogApi.getBlogDetail(slug);
                setBlog(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get blog!', error);
            }
        };
        fetchBlog();
    }, [slug]);

    useEffect(() => {
        const fetchBlogRandom = async () => {
            try {
                const response = await blogApi.getBlogRandom();
                setBlogPopularSitebar(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get blog random!', error);
            }
        };
        fetchBlogRandom();
    }, [slug]);

    useEffect(() => {
        const fetchBlogRandom = async () => {
            try {
                const response = await blogApi.getBlogRandom();
                setBlogPopular(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get blog random!', error);
            }
        };
        fetchBlogRandom();
    }, [slug]);

    return (
        <Helmet title={blog.name ? blog.name : ''}>
            <Breadcrumb mainTitle='TIN TỨC' subTitle={blog.name} />
            <div className='wrapper'>
                <div className='blog-detail'>
                    <div className='blog-detail__content'>
                        <h1 className='blog-detail__content__heading'>{blog.name}</h1>
                        <div className='blog-detail__content__date'>
                            <span>{blog.dateSubmitted}</span>
                        </div>
                        <h5 className='blog-detail__content__title'>{blog.title}</h5>
                        <p
                            className='blog-detail__content__desc'
                            dangerouslySetInnerHTML={{
                                __html: blog.description ? blog.description[0] : '',
                            }}
                        ></p>
                        <div className='blog-detail__content__img'>
                            <img src={blog.imgDetail ? ps + blog.imgDetail[0] : ''} alt='' />
                        </div>
                        <p
                            className='blog-detail__content__desc'
                            dangerouslySetInnerHTML={{
                                __html: blog.description ? blog.description[1] : '',
                            }}
                        ></p>
                        <div className='blog-detail__content__img'>
                            <img src={blog.imgDetail ? ps + blog.imgDetail[1] : ''} alt='' />
                        </div>
                        <p
                            className='blog-detail__content__desc'
                            dangerouslySetInnerHTML={{
                                __html: blog.description ? blog.description[2] : '',
                            }}
                        ></p>
                        <div className='blog-detail__content__img'>
                            <img src={blog.imgDetail ? ps + blog.imgDetail[2] : ''} alt='' />
                        </div>
                        <p
                            className='blog-detail__content__desc'
                            dangerouslySetInnerHTML={{
                                __html: blog.description ? blog.description[3] : '',
                            }}
                        ></p>
                        <div className='blog-detail__content__img'>
                            <img src={blog.imgDetail ? ps + blog.imgDetail[3] : ''} alt='' />
                        </div>
                        <p
                            className='blog-detail__content__desc'
                            dangerouslySetInnerHTML={{
                                __html: blog.description ? blog.description[4] : '',
                            }}
                        ></p>
                        <div className='blog-detail__content__img'>
                            <img src={blog.imgDetail ? ps + blog.imgDetail[4] : ''} alt='' />
                        </div>
                    </div>
                    <div className='blog-detail__popular-sitebar'>
                        <h3 className='blog-detail__popular-sitebar__title'>TIN NỔI BẬT</h3>
                        {blogPopularSitebar
                            ? blogPopularSitebar.map((item, index) => (
                                  <BlogItem item={item} key={index} />
                              ))
                            : null}
                    </div>
                </div>
                <div className='blog-more'>
                    <Grid col={3} mdCol={2} smCol={1} gap={10}>
                        {blogPopular
                            ? blogPopular.map((item, index) => <BlogItem item={item} key={index} />)
                            : null}
                    </Grid>
                </div>
            </div>
        </Helmet>
    );
};

export default BlogDetail;
