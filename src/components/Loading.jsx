const Loading = () => {
    return (
        <div className='loading'>
            <div className='loading__title'>Đang Tải</div>
            <div className='loading__dots'>
                <span className='loading__dots__item'></span>
                <span className='loading__dots__item'></span>
                <span className='loading__dots__item'></span>
            </div>
        </div>
    );
};

export default Loading;
