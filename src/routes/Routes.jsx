import {Switch, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Product from '../pages/Product';
import Blog from '../pages/Blog';
import Catalog from '../pages/Catalog';
import BlogDetail from '../pages/BlogDetail';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Payment from '../pages/Payment';
import OrderSuccess from '../pages/OrderSuccess';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/' exact component={Home} />
            <Route path='/product/:slug' exact component={Product} />
            <Route path='/catalog/:category' exact component={Catalog} />
            <Route path='/blog' exact component={Blog} />
            <Route path='/blog/:slug' component={BlogDetail} />
            <Route path='/contact' exact component={Contact} />
            <Route path='/login' exact component={Login} />
            <Route path='/cart' exact component={Cart} />
            <Route path='/payment/:id' exact component={Payment} />
            <Route path='/order-success' exact component={OrderSuccess} />
        </Switch>
    );
};

export default Routes;
