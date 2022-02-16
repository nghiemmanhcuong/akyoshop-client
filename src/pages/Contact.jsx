import Breadcrumb from '../components/Breadcrumb';
import Helmet from '../components/Helmet';
import Grid from '../components/Grid';
import Section, {SectionBody} from '../components/Section';

import {contactHelp1, contactHelp2, contactHelp3} from '../assets/data/contact';

const Contact = () => {
    return (
        <Helmet title='LIÊN HỆ'>
            <Breadcrumb mainTitle='Liên Hệ' mainPath='/contact' />
            <div className='contact'>
                <div className='contact__header'>
                    <h3 className='contact__header__title'>LIÊN HỆ HỖ TRỢ KHÁCH HÀNG</h3>
                    <span className='contact__header__desc'>
                        Nếu bạn có câu hỏi hoặc phản hồi về đơn đặt hàng hoặc Bloomscape, đây là
                        cách liên hệ.
                    </span>
                </div>
            </div>
            <Section>
                <SectionBody>
                    <form autocomplete='off' className='contact__form' onSubmit={() => console.log('ok')}>
                        <Grid col={2} smCol={1} gap={30}>
                            <div className='contact__help'>
                                <div className='contact__help__header'>
                                    <h4 className='contact__help__header__title'>
                                        Làm thế nào chúng tôi có thể giúp bạn?
                                    </h4>
                                    <span className='contact__help__header__desc'>
                                        Vui lòng chỉ điền vào phần (1, 2 hoặc 3) liên quan tốt nhất
                                        đến câu hỏi hoặc vấn đề của bạn.
                                    </span>
                                </div>
                                <div className='contact__help__content'>
                                    <ContactHelpItem item={contactHelp1} type='checkbox' />
                                    <ContactHelpItem item={contactHelp2} type='checkbox' />
                                    <ContactHelpItem item={contactHelp3} type='select' />
                                </div>
                            </div>
                            <div className='contact__info'>
                                <ContactInfoGroup title='Tên' type='input' />
                                <ContactInfoGroup title='Họ' type='input' />
                                <ContactInfoGroup title='Email' type='input' />
                                <ContactInfoGroup
                                    title='Có phải câu hỏi của bạn về một đơn đặt hàng hiện có?'
                                    type='select'
                                />
                                <div className='contact__info__button'>
                                    <button>Gửi</button>
                                </div>
                            </div>
                        </Grid>
                    </form>
                </SectionBody>
            </Section>
        </Helmet>
    );
};

const ContactHelpItem = (props) => {
    const {item, type} = props;

    return (
        <div className='contact__help__content__item'>
            <div className='contact__help__content__item__title'>
                <span>{item.header.main}</span>
                {item.header.sub}
            </div>
            <div className='contact__help__content__item__group'>
                {type === 'checkbox'
                    ? item.checkboxs.map((item, index) => (
                          <label key={index} className='contact__help__content__item__group__input'>
                              <input type='checkbox' />
                              <span>{item}</span>
                          </label>
                      ))
                    : null}
                {type === 'select' ? (
                    <select className='contact__help__content__item__group__select'>
                        {item.selects.map((select, index) => (
                            <option value={select.value} key={index}>
                                {select.title}
                            </option>
                        ))}
                    </select>
                ) : null}
            </div>
        </div>
    );
};

const ContactInfoGroup = (props) => {
    const {title, type} = props;

    return (
        <div className='contact__info__group'>
            <label>
                {title} <span>*</span>
            </label>
            {type === 'input' ? <input type='text' /> : null}
            {type === 'select' ? (
                <select>
                    <option value='Đúng'>Đúng</option>
                    <option value='Sai'>Sai</option>
                </select>
            ) : null}
        </div>
    );
};

export default Contact;
