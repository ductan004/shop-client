function Dashboard() {
  return (
    <div>
      <h3 className="title-page">Dashboards</h3>
      <section className="statistics row">
        <div className="col-sm-12 col-md-6 col-xl-3">
          <a href="products.html">
            <div className="card mb-3 admin-widget-chart">
              <div className="widget-subheading fsize-1 pt-2 opacity-10 text-warning font-weight-bold">
                <h5>Tổng sản phẩm</h5>
              </div>
              <span className="widget-numbers">3M</span>
            </div>
          </a>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-3">
          <a href="user.html">
            <div className="card mb-3 admin-widget-chart">
              <div className="widget-subheading fsize-1 pt-2 opacity-10 text-warning font-weight-bold">
                <h5>Tổng thành viên</h5>
              </div>
              <span className="widget-numbers">3M</span>
            </div>
          </a>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-3">
          <a href="caterogies.html">
            <div className="card mb-3 admin-widget-chart">
              <div className="widget-subheading fsize-1 pt-2 opacity-10 text-warning font-weight-bold">
                <h5>Tổng doanh mục</h5>
              </div>
              <span className="widget-numbers">3M</span>
            </div>
          </a>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-3">
          <a href="#!">
            <div className="card mb-3 admin-widget-chart">
              <div className="widget-subheading fsize-1 pt-2 opacity-10 text-warning font-weight-bold">
                <h5>Tổng doanh mục</h5>
              </div>
              <span className="widget-numbers">3M</span>
            </div>
          </a>
        </div>
      </section>
      <section className="row">
        <div className="col-sm-12 col-md-6 col xl-6">
          <div className="card admin-chart">
            <form action="#!" method="post">
              <div className="input-group mb-3">
                <input type="date" className="form-control" placeholder="Username" aria-label="Username" />
                <span className="input-group-text">Đến ngày</span>
                <input type="date" className="form-control" placeholder="Server" aria-label="Server" />
                <button type="button" className="btn btn-primary">
                  Xem
                </button>
              </div>
            </form>
            <p>
              Tổng doanh thu: <span>100.000.000 VND</span>
            </p>
            <table className="revenue table table-hover">
              <thead>
                <th>#</th>
                <th>Mã đơn hàng</th>
                <th>Doanh thu</th>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>GIA001</td>
                  <td>100.000</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>GIA002</td>
                  <td>100.000</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>GIA003</td>
                  <td>100.000</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>GIA004</td>
                  <td>100.000</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>GIA004</td>
                  <td>100.000</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>GIA004</td>
                  <td>100.000</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>GIA004</td>
                  <td>100.000</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>GIA004</td>
                  <td>100.000</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>GIA004</td>
                  <td>100.000</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>GIA004</td>
                  <td>100.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-3">
          <div className="card admin-chart">
            <h4>Đơn hàng mới</h4>
            <table className="revenue table table-hover">
              <thead>
                <th>Mã đơn hàng</th>
                <th>Trạng thái</th>
              </thead>
              <tbody>
                <tr>
                  <td>GIA001</td>
                  <td>Chờ duyệt</td>
                </tr>
                <tr>
                  <td>GIA002</td>
                  <td>Đã duyệt</td>
                </tr>
                <tr>
                  <td>GIA003</td>
                  <td>Chờ TT</td>
                </tr>
                <tr>
                  <td>GIA004</td>
                  <td>Đã duyệt</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-3">
          <div className="card admin-chart">
            <h4>Khách hàng mới</h4>
            <table className="revenue table table-hover">
              <thead>
                <th>#</th>
                <th>Username</th>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>giangcoder1</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>giangcoder2</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>giangcoder3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
