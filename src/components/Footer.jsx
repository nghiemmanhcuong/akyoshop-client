import Grid from './Grid';
import {footerLink, footerCustomer} from '../assets/data/footerLinks';
import {Link} from 'react-router-dom';
import badge from '../assets/image/badge-2.png';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__wrapper'>
                <div className='footer__title'>
                    <h3>NEM FASHION - THỜI TRANG CÔNG SỞ</h3>
                </div>
                <Grid col={4} mdCol={2} smCol={1} gap={30}>
                    <div className='footer__block'>
                        Công ty TNHH Dịch vụ và Thương mại An Thành. Số ĐKKD 0107861393, Sở KHĐT Tp.
                        Hà Nội cấp ngày 04/10/2017 <br />
                        Địa chỉ: Phòng 1002, tầng 10, Tòa nhà NEM số 545 đường Nguyễn Văn Cừ, P. Gia
                        Thụy, Q. Long Biên, Hà Nội <br />
                        Hotline: 024 3938 8512 <br />
                        Email: nemcskh@stripe-vn.com
                    </div>
                    <ul className='footer__block'>
                        {footerLink.map((item, index) => (
                            <Link to={item.path} key={index}>
                                <li className='footer__block__item'>
                                    {item.display}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <ul className='footer__block'>
                        {footerCustomer.map((item, index) => (
                            <Link to={item.path} key={index}>
                                <li className='footer__block__item'>
                                    {item.display}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <div className='footer__block'>
                        <p className='footer__block__item'>Phương thức thanh toán</p>
                        <img src={badge} alt='' />
                    </div>
                </Grid>
            </div>
        </footer>
    );
};

export default Footer;
