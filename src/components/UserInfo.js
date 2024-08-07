import { useDispatch } from "react-redux";
import { checkLogin } from "../redux/authSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  dispatch(checkLogin()); //nếu thông tin user ko có trong store thì xem trong localstorage
  return <></>;
};
export default UserInfo;
