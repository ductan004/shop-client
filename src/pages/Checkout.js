import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function Checkout() {
  const cart = useSelector((state) => state.cart.listProduct);
  const user = useSelector((state) => state.auth.user);
  const totalAmount = cart.reduce(
    (total, sp) => total + sp.price_sale * sp.quantity,
    0
  );
  const dispatch = useDispatch();

  let fullnameValue = React.createRef();
  let phoneValue = React.createRef();
  let emailValue = React.createRef();
  let addressValue = React.createRef();
  const submitData = (e) => {
    e.preventDefault();
    let fullname = fullnameValue.current.value;
    let phone = phoneValue.current.value;
    let email = emailValue.current.value;
    let address = addressValue.current.value;
    if (cart.length === 0) {
      toast.warning("Bạn chưa chọn sản phẩm nào");
      return;
    }

    if (!user || !user.id) {
      toast.warning("Bạn cần đăng nhập để mua hàng");
      // navigate("/login");
      return;
    }

    // Tạo mã đơn hàng ngẫu nhiên
    // Tạo mã đơn hàng ngẫu nhiên
    let orderCode =
      "dt_" +
      Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0");
    let obj = {
      user_id: user.id,
      fullname: fullname,
      phone: phone,
      email: email,
      address: address,
      total: totalAmount,
      status: "cho` xu ly",
      code: orderCode,
    };
    const baseUrl = process.env.REACT_APP_API_URL;
    var opt = {
      method: "post",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${baseUrl}/orders`, opt)
      .then((res) => res.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.id < 0) console.log("loi luu don hang", data);
        else {
          let order_id = data.id;
          console.log("Da luu don hang", order_id);
          luuchitietdonhang(order_id, cart);
          dispatch(deleteCart());
          Swal.fire({
            title: "Đặt hàng thành công",
            text: `Mã đơn hàng : ${data.code}`,
            icon: "success",
          });
        }
      });
    fullnameValue.current.value = "";
    phoneValue.current.value = "";
    emailValue.current.value = "";
    addressValue.current.value = "";

    // toast.success("Đặt hàng thành công");
    // navigate("/");
    //lưu đơn hàng và chi tiết đơn hàng (cart)
  };

  const luuchitietdonhang = (order_id, cart) => {
    cart.forEach((pro) => {
      let total = Number(pro.price_sale * pro.quantity);
      let objDetail = {
        order_id: order_id,
        product_id: pro.id,
        product_name: pro.product_name,
        quantity: pro.quantity,
        price: pro.price_sale,
        total: total,
      };
      let opt = {
        method: "post",
        body: JSON.stringify(objDetail),
        headers: { "Content-Type": "application/json" },
      };
      const baseUrl = process.env.REACT_APP_API_URL;
      fetch(`${baseUrl}/order_detail`, opt)
        .then((res) => res.json())
        .then((data) => {
          // deletePro(data);
        })
        .catch((err) => console.log("loi luu sp", err));
    });
    // console.log("Id_dh:", order_id);
    // console.log("cart:", cart);
  };
  return (
    <div>
      {/* <!-- Breadcrumb Section Begin --> */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Thanh toán</h4>
                <div className="breadcrumb__links">
                  <a href="./index.html">Trang chủ</a>
                  <a href="./shop.html">Giỏ hàng</a>
                  <span>Thanh toán</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Breadcrumb Section End --> */}

      {/* <!-- Checkout Section Begin --> */}
      <section className="checkout spad">
        <div className="container">
          <form className="checkout__form" onSubmit={submitData}>
            <div className="row">
              <div className="col-lg-8 col-md-6">
                {/* <h6 className="coupon__code">
                  <span className="icon_tag_alt"></span> Have a coupon?
                  <a href="#!">Click here</a> to enter your code
                </h6> */}
                <h6 className="checkout__title">Billing Details</h6>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="checkout__input">
                      <p>
                        Tên<span>*</span>
                      </p>
                      <input type="text" ref={fullnameValue} required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        Số điện thoại<span>*</span>
                      </p>
                      <input type="text" ref={phoneValue} required />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        Email<span>*</span>
                      </p>
                      <input type="email" ref={emailValue} required />
                    </div>
                  </div>
                </div>
                <div className="checkout__input">
                  <p>
                    Địa chỉ<span>*</span>
                  </p>
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="checkout__input__add"
                    ref={addressValue}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="checkout__order">
                  <h4 className="order__title">Đơn hàng của bạn</h4>
                  <div className="checkout__order__products">
                    Sản phẩm <span>Giá</span>
                  </div>
                  <ul className="checkout__total__products">
                    {cart.map((pro, i) => (
                      <li key={i}>
                        {i + 1}. {pro.name} - SL:{pro.quantity}
                        <span>
                          {Number(pro.price_sale * pro.quantity).toLocaleString(
                            "vi"
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ul className="checkout__total__all">
                    <li>
                      Tổng
                      <span>
                        {Number(totalAmount).toLocaleString("vi")} VNĐ
                      </span>
                    </li>
                  </ul>
                  {/* <div className="checkout__input__checkbox">
                    <label htmlFor="payment">
                      Check Payment
                      <input type="checkbox" id="payment" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="checkout__input__checkbox">
                    <label htmlFor="paypal">
                      Paypal
                      <input type="checkbox" id="paypal" />
                      <span className="checkmark"></span>
                    </label>
                  </div> */}
                  <button className="site-btn" type="submit">
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* <!-- Checkout Section End --> */}
    </div>
  );
}
export default Checkout;
