import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the case where token or user is still loading
    if (token === undefined || user === undefined) {
      // Optionally, you might want to show a loading spinner or similar UI here
      return;
    }

    console.log("Token:", token);
    console.log("User Role:", user?.role); // Use optional chaining to prevent errors

    // Redirect based on authentication and authorization
    if (!token) {
      toast.error("Bạn chưa đăng nhập");
      navigate("/login");
    } else if (user.role !== 1) {
      toast.error("Tài khoản bạn không có quyền truy cập admin");
      navigate("/");
    }
  }, [token, user, navigate]);

  // Return null to avoid rendering anything
  return null;
};

export default ProtectedRoute;
