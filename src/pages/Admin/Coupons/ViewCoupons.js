import React, { useEffect, useState } from "react";
import { Button, Divider, Table } from "antd";
import { Typography } from "antd";
import { getCategories, removeCategory } from "../../../functions/category";
import { Link, useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { getAdminAuth } from "../../../functions/adminAuth";
import SearchBox from "../../../Components/AdminComponents/SearchBox/SearchBox";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";
import { getCoupons, removeCoupon } from "../../../functions/coupon";
import moment from "moment";
import { useSelector } from "react-redux";

const { Title } = Typography;

const ViewCategories = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const token = Cookies.get("adminToken");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  // Filter Search Step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    getCoupons().then((res) => setCoupons(res.data));
  };

  const handleDelete = async (couponId) => {
    console.log(couponId);
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Coupon ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeCoupon(couponId)
          .then((res) => {
            setLoading(false);
            toast.warning(`Coupon ${res.data.name} deleted`);
            loadCoupons();
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
          });
      }
    });
  };

  const handleClick = () => {
    history.push("/admin/create/coupons");
  };

  const [state, setState] = useState({
    selectedRowKeys: [],
  });

  const columns = [
    {
      title: "Coupon Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      minWidth: "100%",
      width: "60%",
    },
    {
      title: "Discount %",
      dataIndex: "discount",
      minWidth: "100%",
      width: "10%",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry",
      minWidth: "100%",
      width: "30%",
    },

    {
      title: "Actions",
      dataIndex: "actions",
    },
  ];

  const data = [];

  // Filter Search Step 4

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  coupons && coupons.length > 0 ? (
    //  Filter Search Step 5
    coupons.filter(searched(keyword)).map((item) => {
      return data.push({
        key: `${item._id}`,
        name: `${item.name}`,
        discount: `${item.discount}`,
        expiry: `${moment(item.expiry).format("MMMM Do YYYY, h:mm:ss a")}`,
        // moment().format('MMMM Do YYYY, h:mm:ss a');
        actions: (
          <>
            <Button
              className="margin-edit-delete-buttons"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(item._id)}
              type="primary"
              danger
            >
              Delete
            </Button>
          </>
        ),
      });
    })
  ) : (
    <p>There are no categories to display</p>
  );

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setState({ selectedRowKeys });
  };

  const { selectedRowKeys } = state;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      {currentUser.id || token ? (
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
                  {loading ? (
                    <Title className="text-danger" level={4}>
                      Loading...
                    </Title>
                  ) : (
                    <Title level={4}>Coupons</Title>
                  )}
                  <Divider></Divider>
                  {coupons.length > 0 ? (
                    <>
                      <div className="row">
                        <div className="col-md-3 margin-elements">
                          {/* Filter Search Step 2 & Step 3 */}
                          <SearchBox
                            setKeyword={setKeyword}
                            keyword={keyword}
                          />
                        </div>

                        <div
                          style={{ textAlign: "right" }}
                          className="col-md-9"
                        >
                          <Button
                            className="margin-elements"
                            onClick={handleClick}
                            type="primary"
                          >
                            Add New Coupons
                          </Button>
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
                        <h5>There are no copupons to display</h5>
                        <p>
                          You can add new Coupons by clicking on below button.
                        </p>

                        <Button
                          className="margin-elements"
                          onClick={handleClick}
                          type="primary"
                        >
                          Add New Coupons
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push("/admin")
      )}
    </>
  );
};

export default ViewCategories;
