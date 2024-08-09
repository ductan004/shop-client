import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const idUser = user.id;

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const url = `${baseUrl}/ordersUser/${idUser}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrderList(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setOrderList([]);
      });
  }, [idUser]);

  const handleOrderClick = (orderId) => {
    if (selectedOrderId === orderId) {
      setSelectedOrderId(null);
    } else {
      setSelectedOrderId(orderId);
      const baseUrl = process.env.REACT_APP_API_URL;
      const url = `${baseUrl}/order_detail/${orderId}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setOrderDetails(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setOrderDetails([]);
        });
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Danh Sách Lịch Sử Đơn Hàng</h2>
      {Array.isArray(orderList) && orderList.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Bạn chưa mua hàng.
        </div>
      ) : (
        <div className="order-list">
          {Array.isArray(orderList) ? (
            orderList.map((order) => (
              <div className="order-item card mb-3" key={order.id}>
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Đơn hàng {order.code}</h5>
                  <div>
                    <p className="badge bg-primary me-2">
                      {new Date(order.createAt).toLocaleDateString("vi-VN")}
                    </p>
                    <p className="badge bg-danger me-2">
                      {parseInt(order.total).toLocaleString("vi")}VND
                    </p>
                    <p
                      className={`badge ${
                        order.status === 0
                          ? "bg-dark"
                          : order.status === 1
                          ? "bg-info"
                          : order.status === 2
                          ? "bg-success"
                          : ""
                      }`}
                    >
                      {order.status === 0
                        ? "Chờ xử lí"
                        : order.status === 1
                        ? "Đang giao hàng"
                        : order.status === 2
                        ? "Thành công"
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <div className="order-details d-flex flex-wrap mb-3 justify-content-between">
                    <div className="d-flex">
                      <div className="me-4">
                        <strong>Họ và tên:</strong> {order.fullname}
                      </div>
                      <div className="me-4">
                        <strong>Địa chỉ:</strong> {order.address}
                      </div>
                      <div className="me-4">
                        <strong>Số điện thoại:</strong> {order.phone}
                      </div>
                    </div>
                    <p
                      onClick={() => handleOrderClick(order.id)}
                      className="order__link"
                    >
                      Xem chi tiết
                    </p>
                  </div>
                  {/* Display detailed view only for the selected order */}
                  {selectedOrderId === order.id &&
                    Array.isArray(orderDetails) && (
                      <div className="order-detail">
                        <h6 className="mb-3">Danh Sách Sản Phẩm</h6>

                        <div className="row mb-3">
                          {orderDetails.map((item) => (
                            <div className="col-md-4 mb-3" key={item.id}>
                              <img
                                src={item.product_img}
                                alt={item.product_name}
                                className="me-3 order-details__img"
                              />
                              <div className="d-flex align-items-center mt-3">
                                <div>
                                  <h6>{item.product_name}</h6>
                                  <span>Số lượng: {item.quantity}</span>
                                  <p>
                                    Giá:{" "}
                                    {parseFloat(item.price).toLocaleString(
                                      "vi"
                                    )}
                                    VND
                                  </p>
                                  <p className="text-danger">
                                    Tổng:
                                    {parseFloat(item.total).toLocaleString(
                                      "vi"
                                    )}
                                    VND
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-danger" role="alert">
              Đã xảy ra lỗi khi tải đơn hàng.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
