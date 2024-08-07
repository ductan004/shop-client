import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
const Home = () => {
  const [productSaleList, setproductSaleList] = useState([]);
  const [productHotList, setproductHotList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      try {
        const [saleRes, hotRes] = await Promise.all([
          fetch(`${baseUrl}/productSale/8`),
          fetch(`${baseUrl}/productHot/6`),
        ]);

        const saleData = await saleRes.json();
        const hotData = await hotRes.json();

        setproductSaleList(saleData);
        setproductHotList(hotData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {/* // <!-- Hero Section Begin --> */}
      <section className="hero">
        <img src="/assets/img/hero/hero-1.jpg" width="100%" alt="" />
      </section>
      {/* <!-- Hero Section End --> */}

      {/* <!-- Product Section Begin --> */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="filter__controls">
                <li className="active">Sản phẩm giảm giá</li>
              </ul>
            </div>
          </div>
          <div className="row product__filter">
            {productSaleList.map((pro, i) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6"
                key={i}
              >
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <Link to={`/product/${pro.id}`}>
                      <img src={pro.img} className="img-pro" alt="" />
                    </Link>
                    <span className="label">Sale</span>
                    <ul className="product__hover">
                      <li>
                        <a href="#!">
                          <img src="/assets/img/icon/heart.png" alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <img src="/assets/img/icon/compare.png" alt="" />
                          <span>Compare</span>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <img src="/assets/img/icon/search.png" alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>{pro.name}</h6>
                    <a
                      href="#!"
                      onClick={() => dispatch(addProduct(pro))}
                      className="add-cart"
                    >
                      + Add To Cart
                    </a>
                    <p className="desc line-clamp">{pro.des}</p>
                    <h5>{Number(pro.price_sale).toLocaleString("vi")} VND</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <!-- Product Section End --> */}

      {/* <!-- Instagram Section Begin --> */}
      <section className="instagram spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="instagram__pic">
                <div className="instagram__pic__item set-bg">
                  <img src="/assets/img/instagram/instagram-1.jpg" alt="" />
                </div>
                <div className="instagram__pic__item set-bg">
                  <img src="/assets/img/instagram/instagram-2.jpg" alt="" />
                </div>
                <div className="instagram__pic__item set-bg">
                  <img src="/assets/img/instagram/instagram-3.jpg" alt="" />
                </div>
                <div className="instagram__pic__item set-bg">
                  <img src="/assets/img/instagram/instagram-4.jpg" alt="" />
                </div>
                <div className="instagram__pic__item set-bg">
                  <img src="/assets/img/instagram/instagram-5.jpg" alt="" />
                </div>
                <div className="instagram__pic__item set-bg">
                  <img src="/assets/img/instagram/instagram-6.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="instagram__text">
                <h2>Về Male_Fashion</h2>
                <p>
                  Male_Fashion là đơn vị cung cấp sản phẩm đồng phục doanh
                  nghiệp uy tín hàng đầu tại Việt Nam. Với hơn 13 năm kinh
                  nghiệm trong ngành may mặc, năm 2020 Tập Đoàn Couple Group đã
                  thành lập thương hiệu đồng phục Male_Fashion - đơn vị cung cấp
                  đồng phục doanh nghiệp uy tín hàng đầu tại Việt Nam.
                </p>
                <h3>#Male_Fashion</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Instagram Section End --> */}

      {/* <!-- Product Section Begin --> */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="filter__controls">
                <li className="active">Sản phẩm hot</li>
              </ul>
            </div>
          </div>
          <div className="row product__filter">
            {productHotList.map((pro, i) => (
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-md-6 col-sm-6"
                key={i}
              >
                <div className="product__item sale">
                  <div className="product__item__pic set-bg">
                    <Link to={`/product/${pro.id}`}>
                      <img src={pro.img} className="img-pro" alt="" />
                    </Link>
                    <span className="label">Hot</span>
                    <ul className="product__hover">
                      <li>
                        <a href="#!">
                          <img src="/assets/img/icon/heart.png" alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <img src="/assets/img/icon/compare.png" alt="" />
                          <span>Compare</span>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <img src="/assets/img/icon/search.png" alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>{pro.name}</h6>
                    <a
                      href="#!"
                      onClick={() => dispatch(addProduct(pro))}
                      className="add-cart"
                    >
                      + Add To Cart
                    </a>
                    <p className="desc line-clamp">{pro.des}</p>
                    <h5>{Number(pro.price_sale).toLocaleString("vi")} VND</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <!-- Product Section End --> */}

      {/* <!-- Latest Blog Section Begin --> */}
      <section className="latest">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Tin mới nhất</span>
                <h2>Thời trang Xu hướng mới</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic set-bg">
                  <img src="/assets/img/blog/blog-1.jpg" alt="" />
                </div>
                <div className="blog__item__text">
                  <span>
                    <img src="/assets/img/icon/calendar.png" alt="" /> 16
                    February 2020
                  </span>
                  <h5>Làm gì khi áo đồng phục bị phai màu?</h5>
                  <a href="#!">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic set-bg">
                  <img src="/assets/img/blog/blog-2.jpg" alt="" />
                </div>
                <div className="blog__item__text">
                  <span>
                    <img src="/assets/img/icon/calendar.png" alt="" /> 21
                    February 2020
                  </span>
                  <h5>
                    5 mẫu áo thun đồng phục cổ tim đẹp chất lượng, phổ biến
                  </h5>
                  <a href="#!">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic set-bg">
                  <img src="/assets/img/blog/blog-3.jpg" alt="" />
                </div>
                <div className="blog__item__text">
                  <span>
                    <img src="/assets/img/icon/calendar.png" alt="" /> 28
                    February 2020
                  </span>
                  <h5>
                    Các bước sản xuất đồng phục từ khâu thiết kế đến hoàn thànhs
                  </h5>
                  <a href="#!">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Latest Blog Section End --> */}
    </div>
  );
};

export default Home;
