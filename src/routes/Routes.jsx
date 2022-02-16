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
            <Route path='/akyoshop/' exact component={Home} />
            <Route path='/akyoshop/product/:slug' exact component={Product} />
            <Route path='/akyoshop/catalog/:category' exact component={Catalog} />
            <Route path='/akyoshop/blog' exact component={Blog} />
            <Route path='/akyoshop/blog/:slug' component={BlogDetail} />
            <Route path='/akyoshop/contact' exact component={Contact} />
            <Route path='/akyoshop/login' exact component={Login} />
            <Route path='/akyoshop/cart' exact component={Cart} />
            <Route path='/akyoshop/payment/:id' exact component={Payment} />
            <Route path='/akyoshop/order-success' exact component={OrderSuccess} />
        </Switch>
    );
};

export default Routes;
