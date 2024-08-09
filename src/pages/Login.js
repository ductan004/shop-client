import { useState, useRef } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Login() {
  const [errors, setErrors] = useState({});
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const baseUrl = process.env.REACT_APP_API_URL;
    const url = `${baseUrl}/login`;
    const form = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const opt = {
      method: "post",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    };

    fetch(url, opt)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Đăng nhập thất bại");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Thông tin user login =", data);
        dispatch(login(data));
        toast.success("Đăng nhập thành công");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Bạn sai tài khoản hoặc mật khẩu");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="row justify-content-center w-100 m-5">
        <div className="col-md-6 col-lg-6">
          <div className="card shadow-sm rounded">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Đăng nhập</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={submitLogin}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Tài khoản email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaUser />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Nhập Email"
                      ref={emailRef}
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
                      placeholder="Mật khẩu"
                      ref={passwordRef}
                    />
                  </div>
                  {errors.password && (
                    <div className="text-danger fs-6">{errors.password}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Đăng nhập
                </button>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <small>
                Bạn chưa có tài khoản
                <Link
                  to={"/register"}
                  className="text-primary ms-3 d-inline-block"
                >
                  Đăng ký
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
