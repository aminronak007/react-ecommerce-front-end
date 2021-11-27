import React, { useEffect, useState } from "react";
import { Card, Divider, Typography } from "antd";
import SubCategoryForm from "../../../Components/AdminComponents/Forms/SubCategoryForm";
import { toast } from "react-toastify";
import { getAdminAuth } from "../../../functions/adminAuth";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { createSubCategory } from "../../../functions/subCategory";
import { getCategories } from "../../../functions/category";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CreateSubCategory = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [categories, setCategories] = useState([]);
  const token = Cookies.get("adminToken");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSubCategory({ subCategoryName, parent: category })
      .then((res) => {
        setLoading(false);
        setSubCategoryName("");

        if (res.data.subCategoryName) {
          toast.success(`${res.data.subCategoryName} is added.`);
          history.push("/admin/sub-categories");
        }
        toast.error(res.data.error);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data.error);
        }
      });
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
                    <LoadingOutlined />
                  ) : (
                    <Title level={4}>Add New Sub Category</Title>
                  )}
                  <Divider></Divider>
                  <Card title="ADD SUBCATEGORY" style={{ maxWidth: 500 }}>
                    <label className="responsive">Parent Category:</label>
                    <select
                      name="category"
                      defaultValue="select"
                      className="responsive form-control"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="select" disabled>
                        Select Category
                      </option>
                      {categories.length > 0 &&
                        categories.map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.categoryName}
                            </option>
                          );
                        })}
                    </select>

                    <br></br>
                    <SubCategoryForm
                      handleSubmit={handleSubmit}
                      subCategoryName={subCategoryName}
                      setSubCategoryName={setSubCategoryName}
                    />
                  </Card>
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

export default CreateSubCategory;
