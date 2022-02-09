import Routes from '../routes/Routes';
import Header from '../components/Header';
import RegisterNew from '../components/RegisterNew';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';

import {BrowserRouter, Route} from 'react-router-dom';

const Layout = () => {
    return (
        <BrowserRouter>
            <Route
                render={(props) => (
                    <div className='container'>
                        <Topbar />
                        <Header {...props} />
                        <div className='container'>
                            <Routes />
                        </div>
                        <RegisterNew />
                        <Footer />
                    </div>
                )}
            ></Route>
        </BrowserRouter>
    );
};

export default Layout;
