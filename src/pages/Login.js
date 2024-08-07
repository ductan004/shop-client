import { useRef } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
function Login() {
  let emailRef = useRef();
  let passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitLogin = (e) => {
    e.preventDefault();
    const baseUrl = process.env.REACT_APP_API_URL;
    let url = `${baseUrl}/login`;
    let form = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
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

    let opt = {
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
        alert("Bạn sai tài khoản hoặc mật khẩu");
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
                <div className="mb-3">
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
