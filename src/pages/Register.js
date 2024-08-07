import React, { useRef } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const phoneRef = useRef();

  const submitRegister = async (e) => {
    e.preventDefault();

    const fullName = fullNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmpasswor = confirmpasswordRef.current.value.trim();
    const phone = phoneRef.current.value.trim();

    if (!fullName) {
      alert("Họ và tên không được để trống");
      fullNameRef.current.focus(); // Đưa con trỏ chuột đến trường có lỗi
      return; // Dừng việc gửi form nếu có lỗi
    }

    if (!email) {
      alert("Email không được để trống");
      emailRef.current.focus(); // Đưa con trỏ chuột đến trường có lỗi
      return; // Dừng việc gửi form nếu có lỗi
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email không hợp lệ");
      emailRef.current.focus(); // Đưa con trỏ chuột đến trường có lỗi
      return; // Dừng việc gửi form nếu có lỗi
    }

    if (!password) {
      alert("Mật khẩu không được để trống");
      passwordRef.current.focus(); // Đưa con trỏ chuột đến trường có lỗi
      return; // Dừng việc gửi form nếu có lỗi
    }

    if (!confirmpasswor) {
      alert("Nhập lại mật khẩu không được để trống");
      confirmpasswordRef.current.focus(); // Đưa con trỏ chuột đến trường có lỗi
      return; // Dừng việc gửi form nếu có lỗi
    }

    if (!phone) {
      alert("Số điện thoại không được để trống");
      phoneRef.current.focus(); // Đưa con trỏ chuột đến trường có lỗi
      return; // Dừng việc gửi form nếu có lỗi
    }

    if (confirmpasswor !== password) {
      alert("Nhập lại mật khẩu không trùng với mật khẩu");
      confirmpasswordRef.current.focus(); // Đưa con trỏ chuột đến trường có lỗi
      return; // Dừng việc gửi form nếu có lỗi
    }

    const user = {
      fullName: fullName,
      email: email,
      password: password,
      phone: phone,
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
      alert("Đã có lỗi xảy ra!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row justify-content-center w-100 m-5">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm rounded">
            <div className="card-header bg-success text-white text-center">
              <h3 className="mb-0">Đăng ký</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={submitRegister}>
                <div className="mb-3">
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
                </div>
                <div className="mb-3">
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
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Nhập lại mật khẩu
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      ref={confirmpasswordRef}
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
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
