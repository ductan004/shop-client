import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const user = useSelector((state) => state.auth.user);

  const [errors, setErrors] = useState({});
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const validateForm = () => {
    const newErrors = {};
    const oldPassword = oldPasswordRef.current.value.trim();
    const newPassword = newPasswordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    if (!oldPassword) {
      newErrors.oldPassword = "Mật khẩu hiện tại không được để trống";
    }

    if (!newPassword) {
      newErrors.newPassword = "Mật khẩu mới không được để trống";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không được để trống";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword =
        "Mật khẩu mới và xác nhận mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitChangePass = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const form = {
      oldPassword: oldPasswordRef.current.value.trim(),
      newPassword: newPasswordRef.current.value.trim(),
    };

    const opt = {
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
        toast.error("Mật khẩu hiện tại không đúng");
      }
      oldPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đã có lỗi xảy ra!");
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
                  <label htmlFor="oldPassword" className="form-label">
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
                      id="oldPassword"
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                  </div>
                  {errors.oldPassword && (
                    <div className="text-danger mt-2">{errors.oldPassword}</div>
                  )}
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
                  {errors.newPassword && (
                    <div className="text-danger mt-2">{errors.newPassword}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Nhập lại mật khẩu mới
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      ref={confirmPasswordRef}
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Nhập lại mật khẩu mới"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="text-danger mt-2">
                      {errors.confirmPassword}
                    </div>
                  )}
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
