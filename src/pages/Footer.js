function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              <div className="footer__logo">
                <a href="#!">
                  <img src="./assets/img/footer-logo.png" alt="" />
                </a>
              </div>
              <p>CÔNG TY TNHH Male_Fashion</p>
              <p>
                Địa chỉ: Lô III-25, Đường số 1, Nhóm CN III, KCN Tân Bình,
                Phường Tây Thạnh, Quận Tân Phú, Thành phố Hồ Chí Minh
              </p>
              <p>
                Liên hệ: 0971.993.003
                <p>Email: sales@ucustom.vn</p>
              </p>
              <a href="#!">
                <img src="./assets/img/payment.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6>Mua Sắm</h6>
              <ul>
                <li>
                  <a href="#!">Cửa hàng quần áo</a>
                </li>
                <li>
                  <a href="#!">Giày Xu Hướng</a>
                </li>
                <li>
                  <a href="#!">Phụ kiện</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6>Về chúng tôi</h6>
              <ul>
                <li>
                  <a href="#!">Liên hệ chúng tôi</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
            <div className="footer__widget">
              <h6>NewLetter</h6>
              <div className="footer__newslatter">
                <p>
                  Be the first to know about new arrivals, look books, sales &
                  promos!
                </p>
                <form action="#!">
                  <input type="text" placeholder="Your email" />
                  <button type="submit">
                    <span className="icon_mail_alt"></span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
