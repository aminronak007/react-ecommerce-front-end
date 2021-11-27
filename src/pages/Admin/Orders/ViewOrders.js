import React, { useEffect, useState } from "react";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";
import {
  getOrders,
  changeStatus,
  getAdminAuth,
} from "../../../functions/adminAuth";
import { useSelector, useDispatch } from "react-redux";
import { Divider, Table, Typography } from "antd";
import SearchBox from "../../../Components/AdminComponents/SearchBox/SearchBox";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(false);
  const data = [];

  useEffect(() => {
    loadAdmin();
    loadOrders();
  }, []);

  const loadAdmin = () => {
    getAdminAuth().then((res) => {
      // console.log(res);
      setAdmin(res.data);
    });
  };

  const loadOrders = () =>
    getOrders().then((res) => {
      setOrders(res.data.orders);
    });

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      sorter: (a, b) => a.orderId.length - b.orderId.length,
      minWidth: "100%",
      width: "20%",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      sorter: (a, b) => a.productName.length - b.productName.length,
      minWidth: "100%",
      width: "20%",
    },

    {
      title: "Quantity",
      dataIndex: "qty",
      sorter: (a, b) => a.qty.length - b.qty.length,
      minWidth: "100%",
      width: "8%",
    },
    {
      title: "Color",
      dataIndex: "color",
      sorter: (a, b) => a.color.length - b.color.length,
      minWidth: "100%",
      width: "8%",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
      minWidth: "100%",
      width: "10%",
    },

    {
      title: "Delivery Status",
      dataIndex: "status",
    },
  ];

  const [state, setState] = useState({
    selectedRowKeys: [],
  });

  function onChange(pagination, filters, sorter, extra) {
    // console.log("params", pagination, filters, sorter, extra);
  }

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setState({ selectedRowKeys });
  };

  const { selectedRowKeys } = state;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const searched = (keyword) => (c) =>
    c.products.map(
      (i) => i.product && i.product.productName.toLowerCase().includes(keyword)
    );

  // console.log("orders", orders);

  orders && orders.length > 0 ? (
    //  Filter Search Step 5
    orders.filter(searched(keyword)).map((item) => {
      return data.push({
        key: `${item._id}`,
        orderId: `${item._id}`,
        productName: `${item.products.map(
          (i) => i.product && i.product.productName
        )}`,
        price: `${item.products.map((i) => i.product && i.product.price)}`,
        qty: `${item.products.map((i) => i.product && i.count)}`,
        color: `${item.products.map((i) => i.product && i.color)}`,
        brand: `${item.products.map((i) => i.product && i.product.brand)}`,
        status: (
          <>
            <div className="row">
              <div className="col-md-12">
                <select
                  className="form-control"
                  defaultValue={item.orderStatus}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </>
        ),
      });
    })
  ) : (
    <></>
  );

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, admin).then((res) => {
      // console.log(res);
      toast.success("Status Updated");
      loadOrders();
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
        }}
      >
        <Sidebar />
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-md-12">
              {loading ? <LoadingOutlined /> : <Title level={4}>Orders</Title>}
              <Divider></Divider>
              {orders && orders.length > 0 ? (
                <>
                  <div className="row">
                    <div className="col-md-3 margin-elements">
                      {/* Filter Search Step 2 & Step 3 */}
                      <SearchBox setKeyword={setKeyword} keyword={keyword} />
                    </div>
                  </div>

                  <br></br>
                  <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                    size="middle"
                  />
                </>
              ) : (
                <div className="row">
                  <div className="col-md-12">
                    <h5>There are no Orders to display</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrders;
