import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCart, deleteProduct, editQntProduct } from "../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.listProduct);
  // console.log(cart);
  const dispatch = useDispatch();
  const totalAmount = cart.reduce(
    (total, sp) => total + sp.price_sale * sp.quantity,
    0
  );
  return (
    <div>
      {/* <!-- Breadcrumb Section Begin --> */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Shopping Cart</h4>
                <div className="breadcrumb__links">
                  <a href="./index.html">Home</a>
                  <a href="./shop.html">Shop</a>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Breadcrumb Section End --> */}

      {/* <!-- Shopping Cart Section Begin --> */}
      <section className="shopping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="shopping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((pro, i) => (
                      <tr key={i}>
                        <td className="product__cart__item">
                          <div className="product__cart__item__pic">
                            <img src={pro.img} alt="" />
                          </div>
                          <div className="product__cart__item__text">
                            <h6>{pro.name}</h6>
                            <h5>
                              {Number(pro.price_sale).toLocaleString("vi")} VND
                            </h5>
                          </div>
                        </td>
                        <td className="quantity__item">
                          <div className="quantity">
                            <div className="pro-qty-2">
                              <input
                                type="number"
                                min={1}
                                defaultValue={pro.quantity}
                                onClick={(e) =>
                                  dispatch(
                                    editQntProduct([pro.id, e.target.value])
                                  )
                                }
                              />
                            </div>
                          </div>
                        </td>
                        <td className="cart__price">
                          {Number(pro.price_sale * pro.quantity).toLocaleString(
                            "vi"
                          )}
                          VNĐ
                        </td>
                        <td className="cart__close">
                          <i
                            className="fa fa-close"
                            onClick={() => dispatch(deleteProduct(pro.id))}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="continue__btn">
                    <Link to={"/"}>Tiếp tục mua sắp</Link>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 ms-auto">
                  <div className="continue__btn">
                    <a href="#!" onClick={() => dispatch(deleteCart())}>
                      Xóa giỏ hàng
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart__discount">
                <h6>Mã giảm giá</h6>
                <form action="#">
                  <input type="text" placeholder="Coupon code" />
                  <button type="submit">Áp dụng</button>
                </form>
              </div>
              <div className="cart__total">
                <h6>Tổng giỏ hàng</h6>
                <ul>
                  <li>
                    Tổng
                    <span>{Number(totalAmount).toLocaleString("vi")} VNĐ</span>
                  </li>
                </ul>
                <Link to={"/checkout"} className="primary-btn">
                  Thanh toán
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Shopping Cart Section End --> */}
    </div>
  );
};

export default Cart;
