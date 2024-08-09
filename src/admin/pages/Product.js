import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PaginationControl } from "react-bootstrap-pagination-control";

function Product() {
  const [products, setproducts] = useState([]);
  const [catalogs, setcatalogs] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // Use a key to trigger refresh
  const token = useSelector((state) => state.auth.token);

  const [page, setPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchProductsAndCatalogs = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      let opt = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
      };
      try {
        const productsResponse = await fetch(
          `${baseUrl}/product?page=${page}&limit=${limit}`,
          opt
        );
        const productsData = await productsResponse.json();
        setproducts(productsData.data);
        setTotalProduct(productsData.total);

        const catalogsResponse = await fetch(`${baseUrl}/catalog`, opt);
        const catalogsData = await catalogsResponse.json();
        setcatalogs(catalogsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductsAndCatalogs();
  }, [token, refreshKey, page, limit]);
  const getProductCatalogName = (id_catalog) => {
    if (catalogs.length === 0) return "Không có";
    const catalog = catalogs.find((cata) => cata.id === id_catalog);
    return catalog ? catalog.name : "Không có";
  };

  const handleDelete = (productId) => {
    let opt = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
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
        fetch(`${baseUrl}/admin/product/${productId}`, opt)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              Swal.fire({
                title: "Sản phẩm đang được mua ở đơn hàng",
                icon: "error",
              });
            } else {
              Swal.fire({
                title: "Xóa thành công!",
                icon: "success",
              });
              setRefreshKey((prevKey) => prevKey + 1);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              title: "Không thành công",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div>
      <h3 className="title-page">Sản phẩm</h3>
      <div className="d-flex justify-content-end">
        <Link to={"/admin/productAdd"} className="btn btn-primary mb-2">
          Thêm sản phẩm
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
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Ngày</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>
                <img src={product.img} width="80px" alt={product.name} />
              </td>
              <td>{product.name}</td>
              <td>{getProductCatalogName(product.id_catalog)}</td>
              <td>{parseInt(product.price_sale).toLocaleString("vi")} VND</td>
              <td>
                {new Date(product.created_at).toLocaleDateString("vi-VN")}
              </td>
              <td>
                <Link
                  to={`/admin/productEdit/${product.id}`}
                  className="btn btn-warning"
                >
                  <i className="fa-solid fa-pen-to-square"></i> Sửa
                </Link>
                <a
                  href="#!"
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  <i className="fa-solid fa-trash"></i> Xóa
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControl
        page={page}
        between={4}
        total={totalProduct}
        limit={limit}
        changePage={(newPage) => setPage(newPage)}
        ellipsis={1}
      />
    </div>
  );
}
export default Product;
