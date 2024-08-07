import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, expiresIn: 0 },
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expiresIn");
      state.user = null;
      state.token = null;
      state.expiresIn = 0;
    },

    checkLogin: (state) => {
      // Lấy giá trị từ state
      let token = state.token;
      let user = state.user;
      let expiresIn = state.expiresIn;
      // Tính thời điểm phiên làm việc sẽ hết hạn
      let expiresAt = moment().add(expiresIn, "second");
      // Kiểm tra xem thời gian hiện tại có trước thời điểm hết hạn không
      let expires = moment().isBefore(expiresAt);
      // Nếu không có token, không có user, hoặc phiên đã hết hạn, set result thành true
      let result = !token || !user || !expires;
      if (result) {
        // Nếu phiên không hợp lệ, lấy dữ liệu từ local storage
        token = localStorage.getItem("token");
        user = localStorage.getItem("user");
        expiresIn = localStorage.getItem("expiresIn");

        // Kiểm tra nếu dữ liệu từ local storage có không
        if (token && user && expiresIn) {
          // Tính lại thời điểm hết hạn và kiểm tra lại
          expiresAt = moment().add(expiresIn, "second");
          expires = moment().isBefore(expiresAt);

          // Nếu phiên từ local storage còn hợp lệ, cập nhật state
          if (expires) {
            state.user = JSON.parse(user); // Cập nhật thông tin user
            state.token = token; // Cập nhật token
            state.expiresIn = expiresIn; // Cập nhật thời gian hết hạn
          }
        }
      }
    },

    login: (state, param) => {
      state.token = param.payload.token;
      state.expiresIn = param.payload.expiresIn;
      state.user = param.payload.user;
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("expiresIn", state.expiresIn);
    },
  },
});

export const { logOut, checkLogin, login } = authSlice.actions;
export default authSlice.reducer;
