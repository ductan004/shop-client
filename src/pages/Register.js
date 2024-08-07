import React, { useState, useRef } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [errors, setErrors] = useState({});
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const phoneRef = useRef();

  const validateForm = () => {
    const newErrors = {};
    const fullName = fullNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();
    const phone = phoneRef.current.value.trim();

    if (!fullName) {
      newErrors.fullName = "Họ và tên không được để trống";
    }

    if (!email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Nhập lại mật khẩu không được để trống";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Nhập lại mật khẩu không trùng với mật khẩu";
    }

    if (!phone) {
      newErrors.phone = "Không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const user = {
      fullName: fullNameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      phone: phoneRef.current.value.trim(),
      role: 0,
    };

    const baseUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Đăng ký tài khoản thành công");
        console.log("User data:", data);
        // navigate("/login");
      } else {
        const errorData = await response.json();
        toast.error("Đăng ký thất bại: Gmail đã tồn tại");
        console.log(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row justify-content-center w-100 m-3">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm rounded">
            <div className="card-header bg-success text-white text-center">
              <h3 className="mb-0">Đăng ký</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={submitRegister}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Họ và Tên
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        ref={fullNameRef}
                        placeholder="Nhập Họ và Tên"
                      />
                    </div>
                    {errors.fullName && (
                      <div className="text-danger fs-6">{errors.fullName}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Số điện thoại
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FaPhone />
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        ref={phoneRef}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    {errors.phone && (
                      <div className="text-danger fs-6">{errors.phone}</div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Tài khoản email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      ref={emailRef}
                      placeholder="Nhập email"
                    />
                  </div>
                  {errors.email && (
                    <div className="text-danger fs-6">{errors.email}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      ref={passwordRef}
                      placeholder="Nhập mật khẩu"
                    />
                  </div>
                  {errors.password && (
                    <div className="text-danger fs-6">{errors.password}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Nhập lại mật khẩu
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      ref={confirmPasswordRef}
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="text-danger fs-6">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Đăng ký
                </button>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <small>
                Bạn đã có tài khoản
                <Link
                  to={"/login"}
                  className="text-success d-inline-block ms-3"
                >
                  Login
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
