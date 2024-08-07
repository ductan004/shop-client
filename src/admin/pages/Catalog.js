import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Catalog() {
  const [catalogs, setcatalogs] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false); // Thêm trạng thái kiểm soát việc render lại

  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    let opt = {
      method: "GET",
      headers: { accept: "application/json", Authorization: "Bearer " + token },
    };

    const baseUrl = process.env.REACT_APP_API_URL;
    fetch(`${baseUrl}/catalog`, opt)
      .then((res) => res.json())
      .then((data) => setcatalogs(data));
  }, [token, shouldRefresh]);

  const handleDelete = (catalogId) => {
    let opt = {
      method: "delete",
      headers: { accept: "application/json", Authorization: "Bearer " + token },
    };
    Swal.fire({
      title: "Bạn có chắc xóa không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Chắc chắn rồi",
    }).then((result) => {
      if (result.isConfirmed) {
        const baseUrl = process.env.REACT_APP_API_URL;
        fetch(`${baseUrl}/admin/catalog/${catalogId}`, opt)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              Swal.fire({
                title: "Không thành công",
                icon: "error",
              });
              // alert("Error: " + data.error);
            } else {
              setShouldRefresh(true);
              Swal.fire({
                title: "Xóa thành công!",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };
  return (
    <div>
      <h3 className="title-page">Danh mục</h3>
      <div className="d-flex justify-content-end">
        <Link to={"/admin/catalogAdd"} className="btn btn-primary mb-2">
          Thêm danh mục
        </Link>
      </div>
      <table
        id="example"
        className="table table-striped"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Tên Danh muc</th>
            <th>Thao tac</th>
          </tr>
        </thead>
        <tbody>
          {catalogs.map((cata, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{cata.name}</td>
              <td>
                <Link
                  to={`/admin/catalogEdit/${cata.id}`}
                  className="btn btn-warning"
                >
                  <i className="fa-solid fa-pen-to-square"></i> Sửa
                </Link>
                <a
                  href="#!"
                  className="btn btn-danger"
                  onClick={() => handleDelete(cata.id)}
                >
                  <i className="fa-solid fa-trash"></i> Xóa
                </a>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>#</th>
            <th>Tên Danh muc</th>
            <th>Thao tac</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
export default Catalog;
