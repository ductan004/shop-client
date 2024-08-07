import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export const cartSlice = createSlice({
  name: "cart",
  initialState: { listProduct: JSON.parse(localStorage.getItem("cart")) || [] },
  reducers: {
    addProduct: (state, param) => {
      let product = param.payload; //tham số là  sp = {'id':1,'ten_sp'=>'A'}
      let quantity = param.payload.quantity || 1;
      let index = state.listProduct.findIndex((s) => s.id === product.id);
      if (index === -1) {
        //sp chưa có trong giỏ hàng
        product.quantity = quantity;
        state.listProduct.push(product);
      } else state.listProduct[index].quantity++;
      console.log("Đã thêm sp. Số SP=", state.listProduct.length);
      localStorage.setItem("cart", JSON.stringify(state.listProduct));
      toast.success(`Đã thêm sản phẩm vào giỏ hàng`);
      // alert();
    },
    editQntProduct: (state, param) => {
      //tham số là mảmg 2 phần tử id và sl. VD [5000, 3]
      let id = param.payload[0];
      let quantity = param.payload[1];
      let index = state.listProduct.findIndex((s) => s.id === id);
      if (index !== -1) state.listProduct[index].quantity = Number(quantity);
      localStorage.setItem("cart", JSON.stringify(state.listProduct));
      console.log("Đã sửa sp ", param);
    },
    deleteProduct: (state, param) => {
      //tham số là id_sp
      let id = param.payload;
      const index = state.listProduct.findIndex((s) => s.id === id);
      if (index !== -1) state.listProduct.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state.listProduct));
    },
    deleteCart: (state) => {
      state.listProduct = [];
      localStorage.setItem("cart", JSON.stringify(state.listProduct));
    },
  },
});
export const { addProduct, editQntProduct, deleteProduct, deleteCart } =
  cartSlice.actions;
export default cartSlice.reducer;
