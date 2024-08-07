import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function CatalogAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const token = useSelector((state) => state.auth.token);
  const handleSubmit = (e) => {
    e.preventDefault();

    let name = formData.name;
    if (!name) {
      alert("Bạn chưa nhập tên danh mục");
      return;
    }

    let opt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    };
    const baseUrl = process.env.REACT_APP_API_URL;
    fetch(`${baseUrl}/admin/catalog`, opt)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error:", data.error);
        } else {
          console.log("Success:", data);
          // Clear form fields
          setFormData({
            name: "",
          });
          toast.success("Thêm danh mục thành công");
          navigate("/admin/catalog");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h3 className="title-page">Thêm Danh Mục</h3>
      <form className="admin-addPro">
        <div className="form-group">
          <label htmlFor="name">Tên Danh Mục:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên sản phẩm"
            required
          />
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

export default CatalogAdd;
