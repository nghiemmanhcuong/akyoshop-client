import {BsCheckCircle,BsArrowLeft} from 'react-icons/bs'
import Helmet from '../components/Helmet';
import {Link} from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <Helmet title='ĐĂNG KÝ THÀNH CÔNG'>
        <div className='order-success'>
            <div className='order-success__icon'>
                <BsCheckCircle size={44} color='green'/>
            </div>
            <h2 className='order-success__heading'>
                chúc mừng bạn đã đặt hàng thành công
            </h2>
            <p className='order-success__desc'>
                cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi chúc quý khách mua hàng vui vẻ
            </p>
            <Link to='/'>
                <BsArrowLeft size={20}/>
                Về Trang Chủ
            </Link>
        </div>
    </Helmet>
  )
}

export default OrderSuccess