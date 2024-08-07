import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
const Detail = () => {
  let { id } = useParams();
  const [productDetail, setproductDetail] = useState([]);
  const [proRelateList, setproRelateList] = useState([]);
  const dispatch = useDispatch();
  const [quantity, setquantity] = useState(1);
  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    let url = `${baseUrl}/productDetail/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setproductDetail(data));
    let urlRelated = `${baseUrl}/productRelated/${id}`;
    fetch(urlRelated)
      .then((res) => res.json())
      .then((data) => setproRelateList(data));
  }, [id]);

  return (
    <div>
      {/* <!-- Breadcrumb Section Begin --> */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Cửa hàng</h4>
                <div className="breadcrumb__links">
                  <Link to={`/`}>Trang chủ</Link>
                  <span>Cửa hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Breadcrumb Section End --> */}
      <section className="shop-details">
        <div className="product__details__pic">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__pic__item">
                      <img src={productDetail.img} width="100%" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                    <div className="product__details__text">
                      <h3>{productDetail.name}</h3>
                      <h4>
                        Giá:{" "}
                        {Number(productDetail.price_sale).toLocaleString("vi")}{" "}
                        VNĐ
                      </h4>
                      <p>{productDetail.des}</p>
                      <div className="product__details__cart__option">
                        <div className="quantity">
                          <div className="pro-qty">
                            <input
                              type="number"
                              min="1"
                              id="so_luong"
                              value={quantity}
                              // defaultValue={1}
                              onChange={(e) =>
                                setquantity(Number(e.target.value))
                              }
                            />
                          </div>
                        </div>
                        <a
                          href="#!"
                          className="primary-btn"
                          onClick={() =>
                            dispatch(addProduct({ ...productDetail, quantity }))
                          }
                        >
                          Mua Ngay
                        </a>
                      </div>
                      <div className="product__details__btns__option">
                        <a href="#!">
                          <i className="fa fa-heart"></i> Yêu thích
                        </a>
                      </div>
                      <div className="product__details__last__option">
                        <ul>
                          <li>
                            <span>Danh mục:</span>
                            {productDetail.catalog_name}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="product__details__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="product__details__tab">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#tabs-5"
                        role="tab"
                      >
                        Description
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="tabs-5"
                      role="tabpanel"
                    >
                      <div className="product__details__tab__content">
                        <p className="note">
                          Nam tempus turpis at metus scelerisque placerat nulla
                          deumantos solicitud felis. Pellentesque diam dolor,
                          elementum etos lobortis des mollis ut risus. Sedcus
                          faucibus an sullamcorper mattis drostique des commodo
                          pharetras loremos.
                        </p>
                        <div className="product__details__tab__content__item">
                          <h5>Products Infomation</h5>
                          <p>
                            A Pocket PC is a handheld computer, which features
                            many of the same capabilities as a modern PC. These
                            handy little devices allow individuals to retrieve
                            and store e-mail messages, create a contact file,
                            coordinate appointments, surf the internet, exchange
                            text messages and more. Every product that is
                            labeled as a Pocket PC must be accompanied with
                            specific software to operate the unit and must
                            feature a touchscreen and touchpad.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
      {/* <!-- Related Section Begin --> */}
      <section className="related spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="related-title">Related Product</h3>
            </div>
          </div>
          <div className="row">
            {proRelateList.slice(0, 4).map((pro, i) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6"
                key={i}
              >
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <Link to={`/product/${pro.id}`}>
                      <img src={pro.img} className="img-pro" alt="" />
                    </Link>
                    {pro.hot === 1 && <span className="label">hot</span>}
                    {pro.sale === 1 && <span className="label">sale</span>}
                    <ul className="product__hover">
                      <li>
                        <a href="#!">
                          <img src="/assets/img/icon/heart.png" alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <img src="/assets/img/icon/compare.png" alt="" />{" "}
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
      {/* <!-- Related Section End --> */}
    </div>
  );
};

export default Detail;
