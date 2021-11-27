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

const { Title } = Typography;

const ViewCategories = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const token = Cookies.get("adminToken");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter Search Step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    auth();
    loadCategories();
  }, []);

  const auth = () => {
    getAdminAuth().then((res) => {
      setCurrentUser(res.data);
    });
  };

  const loadCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  };

  const handleDelete = async (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Category ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeCategory(slug)
          .then((res) => {
            setLoading(false);
            // Swal.fire("Deleted!", `${res.data.success}`, "success");
            toast.warning(res.data.success);
            loadCategories();
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
    history.push("/admin/add/category");
  };

  const [state, setState] = useState({
    selectedRowKeys: [],
  });

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      minWidth: "100%",
      width: "80%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
    },
  ];

  const data = [];

  // Filter Search Step 4

  const searched = (keyword) => (c) =>
    c.categoryName.toLowerCase().includes(keyword);

  categories && categories.length > 0 ? (
    //  Filter Search Step 5
    categories.filter(searched(keyword)).map((item) => {
      return data.push({
        key: `${item.slug}`,
        name: `${item.categoryName}`,
        actions: (
          <>
            <Link to={`/admin/update/category/${item.slug}`}>
              <Button
                className="text-success margin-edit-delete-buttons"
                icon={<EditOutlined />}
              >
                Edit
              </Button>
            </Link>

            <Button
              className="margin-edit-delete-buttons"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(item.slug)}
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
                    <Title level={4}>Categories</Title>
                  )}
                  <Divider></Divider>
                  {categories.length > 0 ? (
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
                            Add New Category
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
                        <h5>There are no categories to display</h5>
                        <p>
                          You can add new Categories by clicking on below
                          button.
                        </p>

                        <Button
                          className="margin-elements"
                          onClick={handleClick}
                          type="primary"
                        >
                          Add New Category
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
