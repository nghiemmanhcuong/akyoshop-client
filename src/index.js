import React from 'react';
import ReactDOM from 'react-dom';
import './sass/app.scss';
import 'swiper/swiper-bundle.css';
import Layout from './components/Layout';
import AuthContextProvider from './context/authContext/authContext';

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <Layout />
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
