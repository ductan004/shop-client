import { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useSelector } from "react-redux";
function Order() {
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [limit] = useState(10);

  const token = useSelector((state) => state.auth.token);
  const [selectedOrder, setSelectedOrder] = useState([]);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    fetch(`${baseUrl}/admin/order?page=${page}&limit=${limit}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json(); // Gọi res.json() để phân tích cú pháp phản hồi JSON
      })
      .then((data) => {
        setOrderList(data.orders);
        setTotalOrders(data.total);
      });
  }, [page, limit]);

  const handleStatusChange = async (orderId, newStatus) => {
    const baseUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${baseUrl}/admin/order/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Cập nhật danh sách đơn hàng sau khi cập nhật trạng thái thành công
      const updatedOrders = orderList.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrderList(updatedOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handelViewDetail = async (orderId) => {
    const baseUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${baseUrl}/order_detail/${orderId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json(); // Await the result of response.json()
      setSelectedOrder(result);
      console.log(selectedOrder);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="main">
      <h3 className="title-page">Danh sách Đơn hàng</h3>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Danh sách Đơn hàng</h5>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Mã ĐH</th>
                <th>Ngày đặt hàng</th>
                <th>Tên khách hàng</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th>Tổng tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order, i) => (
                <tr key={i}>
                  <td>{order.code}</td>
                  <td>
                    {new Date(order.createAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td>{order.fullname}</td>
                  <td>{order.address}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status ?? ""}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value={0}>Đang xử lý</option>
                      <option value={1}>Đang giao hàng</option>
                      <option value={2}>Hoàn thành</option>
                    </select>
                  </td>
                  <td>{parseInt(order.total).toLocaleString("vi-VN")} VNĐ</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      data-bs-toggle="modal"
                      data-bs-target="#orderDetailModal"
                      onClick={() => handelViewDetail(order.id)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationControl
            page={page}
            between={4}
            total={totalOrders}
            limit={limit}
            changePage={(newPage) => setPage(newPage)}
            ellipsis={1}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="orderDetailModal"
        aria-labelledby="orderDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderDetailModalLabel">
                Chi tiết đơn hàng
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>Sản phẩm:</h5>
              {selectedOrder ? (
                <ul className="list-unstyled">
                  {selectedOrder.map((order, i) => (
                    <li key={i}>
                      Tên sản phẩm {order.product_name} - Số lượng:{" "}
                      {order.quantity} - Giá: {order.price} VND
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
              <p>
                <strong>Tổng tiền:</strong> 2,000,000 VND
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
