import React, { useEffect, useState } from "react";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";
import { getProducts, removeProduct } from "../../../functions/product";
import { Button, Divider, Table } from "antd";
import { Typography } from "antd";
import { useHistory } from "react-router";
import SearchBox from "../../../Components/AdminComponents/SearchBox/SearchBox";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const { Title } = Typography;

const ViewProducts = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Filter Search Step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    getProducts(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
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
        removeProduct(slug)
          .then((res) => {
            setLoading(false);
            // Swal.fire("Deleted!", `${res.data.success}`, "success");
            toast.warning(res.data.success);
            loadProducts();
          })
          .catch((err) => {
            // console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
          });
      }
    });
  };

  const handleClick = () => {
    history.push("/admin/add/products");
  };

  const [state, setState] = useState({
    selectedRowKeys: [],
  });

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      sorter: (a, b) => a.productName.length - b.productName.length,
      minWidth: "100%",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price.length - b.price.length,
      minWidth: "100%",
      width: "8%",
    },
    {
      title: "Qty",
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
      title: "Sub Category",
      dataIndex: "subCategory",
      sorter: (a, b) => a.subCategory.length - b.subCategory.length,
      minWidth: "100%",
      width: "15%",
    },
    {
      title: "Parent Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
      minWidth: "100%",
      width: "11%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
    },
  ];

  const data = [];

  const searched = (keyword) => (c) =>
    c.productName.toLowerCase().includes(keyword);

  products && products.length > 0 ? (
    //  Filter Search Step 5
    products.filter(searched(keyword)).map((item) => {
      return data.push({
        key: `${item.slug}`,
        productName: `${item.productName}`,
        price: `${item.price}`,
        qty: `${item.quantity}`,
        color: `${item.color}`,
        brand: `${item.brand}`,
        subCategory: `${item.subCategory.map((subItem) => {
          return subItem.subCategoryName;
        })}`,
        category: `${item.category.categoryName}`,
        actions: (
          <>
            <Link to={`/admin/update/product/${item.slug}`}>
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
    <></>
  );

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

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "calc(100vh)",
          overflow: "scroll initial",
        }}
      >
        <Sidebar />

        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-md-12">
              {loading ? (
                <LoadingOutlined />
              ) : (
                <Title level={4}>Products</Title>
              )}
              <Divider></Divider>

              {products && products.length > 0 ? (
                <>
                  <div className="row">
                    <div className="col-md-3 margin-elements">
                      {/* Filter Search Step 2 & Step 3 */}
                      <SearchBox setKeyword={setKeyword} keyword={keyword} />
                    </div>

                    <div style={{ textAlign: "right" }} className="col-md-9">
                      <Button
                        className="margin-elements"
                        onClick={handleClick}
                        type="primary"
                      >
                        Add New Product
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
                    <h5>There are no products to display</h5>
                    <p>You can add new Products by clicking on below button.</p>

                    <Button
                      className="margin-elements"
                      onClick={handleClick}
                      type="primary"
                    >
                      Add New Product
                    </Button>
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

export default ViewProducts;
