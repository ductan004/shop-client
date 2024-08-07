import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PacmanLoader from "react-spinners/PacmanLoader";

function ProductAdd() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [catalogs, setCatalogs] = useState([]);
  const [formData, setFormData] = useState({
    id_catalog: "",
    name: "",
    price: "",
    price_sale: "",
    sale: "",
    hot: "",
    img: null,
    des: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let opt = {
      method: "GET",
      headers: { accept: "application/json", Authorization: "Bearer " + token },
    };
    const baseUrl = process.env.REACT_APP_API_URL;
    fetch(`${baseUrl}/catalog`, opt)
      .then((response) => response.json())
      .then((data) => setCatalogs(data))
      .catch((error) => console.error("Error fetching catalogs:", error));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Bắt đầu loading khi submit form
    const form = new FormData();
    form.append("id_catalog", formData.id_catalog);
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("price_sale", formData.price_sale);
    form.append("sale", formData.sale);
    form.append("hot", formData.hot);
    form.append("img", formData.img);
    form.append("des", formData.des);

    console.log(formData);
    try {
      let opt = {
        method: "POST",
        body: form,
        headers: { Authorization: "Bearer " + token },
      };
      const baseUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${baseUrl}/admin/product`, opt);
      const data = await response.json();

      setLoading(false); // Kết thúc loading sau khi submit xong

      if (data.error) {
        console.error("Error:", data.error);
      } else {
        toast.success("Thêm sản phẩm thành công");
        setFormData({
          id_catalog: "",
          name: "",
          price: "",
          price_sale: "",
          sale: "",
          hot: "",
          img: null,
          des: "",
        });
        navigate("/admin/product");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Overlay loading */}
      <div className={`loading-overlay ${loading ? "" : "hidden"}`}>
        <PacmanLoader color={"#fff"} loading={loading} size={25} />
      </div>
      <h3 className="title-page">Thêm sản phẩm</h3>
      <form className="admin-addPro">
        <div className="form-group">
          <label htmlFor="exampleInputFile">Ảnh sản phẩm</label>
          <div className="custom-file">
            <input
              type="file"
              name="img"
              className="custom-file-input"
              id="exampleInputFile"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col-6">
            <label htmlFor="name">Tên sản phẩm:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div className="col-6">
            <label htmlFor="id_catalog">Danh mục:</label>
            <select
              className="form-select"
              name="id_catalog"
              value={formData.id_catalog}
              onChange={handleChange}
            >
              <option value="">Chọn danh mục</option>
              {catalogs.map((catalog) => (
                <option key={catalog.id} value={catalog.id}>
                  {catalog.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-6">
            <label htmlFor="price">Giá gốc:</label>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="text"
                name="price"
                id="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                placeholder="Nhập giá gốc"
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="price_sale">Giá khuyến mãi:</label>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="text"
                name="price_sale"
                id="price_sale"
                className="form-control"
                value={formData.price_sale}
                onChange={handleChange}
                placeholder="Giá khuyến mãi"
              />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-6">
            <label>Hot</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="hot"
                id="hot1"
                value="1"
                checked={formData.hot === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="hot1">
                Có
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="hot"
                id="hot0"
                value="0"
                checked={formData.hot === "0"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="hot0">
                Không
              </label>
            </div>
          </div>
          <div className="col-6">
            <label>Sale</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sale"
                id="sale1"
                value="1"
                checked={formData.sale === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="sale1">
                Có
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sale"
                id="sale0"
                value="0"
                checked={formData.sale === "0"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="sale0">
                No
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Mô tả ngắn</label>
          <textarea
            className="form-control"
            name="des"
            rows="3"
            value={formData.des}
            onChange={handleChange}
            placeholder="Nhập mô tả ngắn về sản phẩm"
            style={{ height: "78px" }}
          ></textarea>
        </div>
        <div className="form-group">
          <button
            type="button"
            name="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductAdd;
