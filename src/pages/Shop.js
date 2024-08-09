import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Shop = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [currentId, setCurrentId] = useState(null);
  const limit = 6;

  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    const fetchCatalogs = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      try {
        const catalogRes = await fetch(`${baseUrl}/catalog`);
        const catalogData = await catalogRes.json();
        setCatalogs(catalogData);
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      }
    };

    fetchCatalogs();
  }, []);

  useEffect(() => {
    if (id !== currentId) {
      setCurrentId(id);
      setPage(1); // Reset page về 1 khi id thay đổi
    }
  }, [id, currentId]);

  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      try {
        let productRes;
        if (currentId) {
          productRes = await fetch(
            `${baseUrl}/productCatalog/${currentId}?page=${page}&limit=${limit}`
          );
        } else {
          productRes = await fetch(
            `${baseUrl}/product?page=${page}&limit=${limit}`
          );
        }
        const productData = await productRes.json();
        setProducts(productData.data);
        setTotalPage(productData.total);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    // Fetch products only after `page` and `currentId` are set
    if (currentId !== null) {
      fetchProducts();
    }
  }, [currentId, page]);

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

      {/* <!-- Shop Section Begin --> */}
      <section className="shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop__sidebar">
                <div className="shop__sidebar__search">
                  <form action="#">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">
                      <span className="icon_search"></span>
                    </button>
                  </form>
                </div>
                <div className="shop__sidebar__accordion">
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <div className="card-heading">
                        <a href="#!">Danh mục</a>
                      </div>
                      <div id="collapseOne" className="collapse show">
                        <div className="card-body">
                          <div className="shop__sidebar__categories">
                            <ul className="nice-scroll">
                              <li>
                                <Link to={`/shop`}>Tất cả sản phẩm</Link>
                              </li>
                              {catalogs.map((cata, i) => (
                                <li key={i}>
                                  <Link to={`/shop/${cata.id}`} href="#!">
                                    {cata.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="shop__product__option">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6"></div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__right">
                      <p>Sort by Price:</p>
                      <select>
                        <option value="">Low To High</option>
                        <option value="">$0 - $55</option>
                        <option value="">$55 - $100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {products.map((pro, i) => (
                  <div
                    className="col-lg-4 col-md-6 col-sm-6 col-md-6 col-sm-6"
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
                        <h5>
                          {Number(pro.price_sale).toLocaleString("vi")} VND
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <PaginationControl
                    page={page}
                    between={4}
                    total={totalPage}
                    limit={limit}
                    changePage={(newPage) => setPage(newPage)}
                    ellipsis={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Shop Section End --> */}
    </div>
  );
};

export default Shop;
