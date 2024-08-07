import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CatalogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
  });

  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    let opt = {
      method: "GET",
      headers: { accept: "application/json", Authorization: "Bearer " + token },
    };
    const baseUrl = process.env.REACT_APP_API_URL;
    fetch(`${baseUrl}/catalog/${id}`, opt)
      .then((response) => response.json())
      .then((data) => setFormData({ ...data }))
      .catch((error) => console.error("Error fetching catalog:", error));
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  let opt = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(formData),
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_API_URL;
    fetch(`${baseUrl}/admin/catalog/${id}`, opt)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error:", data.error);
        } else {
          console.log("Success:", data);
          toast.success("Chỉnh sửa danh mục thành công");
          navigate("/admin/catalog");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h3 className="title-page">Sửa Danh Mục</h3>

      <form className="admin-addPro">
        <div className="form-group">
          <label for="name">Tên Danh Mục:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên danh mục"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
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
export default CatalogEdit;
