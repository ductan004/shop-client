import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const user = useSelector((state) => state.auth.user);

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmpasswordRef = useRef();

  const submitChangePass = async (e) => {
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value.trim();
    const newPassword = newPasswordRef.current.value.trim();
    const confirmpassword = confirmpasswordRef.current.value.trim();

    if (!oldPassword) {
      alert("Mật khẩu hiện tại không được để trống");
      oldPasswordRef.current.focus(); // Đưa con trỏ chuột đến trường có lỗi
      return; // Dừng việc gửi form nếu có lỗi
    }

    if (!newPassword) {
      alert("Mật khẩu mới không được để trống");
      newPasswordRef.current.focus(); // Đưa con trỏ chuột đến trường có lỗi
      return; // Dừng việc gửi form nếu có lỗi
    }

    if (!confirmpassword) {
      alert("Mật khẩu nhập lại không được để trống");
      confirmpasswordRef.current.focus(); // Đưa con trỏ chuột đến trường có lỗi
      return; // Dừng việc gửi form nếu có lỗi
    }

    if (newPassword !== confirmpassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    const form = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    let opt = {
      method: "PUT",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(
        `${baseUrl}/change-password/${user.id}`,
        opt
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        toast.success("Đổi mật khẩu thành công");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã có lỗi xảy ra!");
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row justify-content-center w-100 m-5">
        <div className="col-md-6 col-lg-6">
          <div className="card shadow-sm rounded">
            <div className="card-header text-center changePassword">
              <h3 className="mb-0">Đổi Mật Khẩu</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={submitChangePass}>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">
                    Mật khẩu hiện tại
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      ref={oldPasswordRef}
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    Mật khẩu mới
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      ref={newPasswordRef}
                      type="password"
                      className="form-control"
                      id="newPassword"
                      placeholder="Nhập mật khẩu mới"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmNewPassword" className="form-label">
                    Nhập lại mật khẩu mới
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      ref={confirmpasswordRef}
                      type="password"
                      className="form-control"
                      id="confirmNewPassword"
                      placeholder="Nhập lại mật khẩu mới"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Đổi mật khẩu
                </button>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <small>
                <Link to={"/"} className="text-primary">
                  Quay lại trang cá nhân
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
