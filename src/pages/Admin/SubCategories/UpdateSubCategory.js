import React, { useEffect, useState } from "react";
import { Card, Divider, Typography } from "antd";
import {
  updateSubCategory,
  getSubCategory,
} from "../../../functions/subCategory";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { getAdminAuth } from "../../../functions/adminAuth";
import { useParams } from "react-router";
import SubCategoryForm from "../../../Components/AdminComponents/Forms/SubCategoryForm";
import { getCategories } from "../../../functions/category";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const UpdateSubCategory = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [categories, setCategories] = useState([]);
  const token = Cookies.get("adminToken");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState("");

  let { slug } = useParams();

  useEffect(() => {
    auth();
    loadSubCategory();
    loadCategories();
  }, []);

  const auth = () => {
    getAdminAuth().then((res) => {
      setCurrentUser(res.data);
    });
  };

  const loadSubCategory = () => {
    getSubCategory(slug).then((res) => {
      setSubCategoryName(res.data.subCategory.subCategoryName);
      setParent(res.data.subCategory.parent);
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
    updateSubCategory(slug, { subCategoryName, parent })
      .then((res) => {
        setLoading(false);
        setSubCategoryName("");

        toast.success(
          `${res.data.updateSubCategory.subCategoryName} is updated.`
        );
        history.push("/admin/sub-categories");

        toast.error(res.data.error);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data.error);
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
                <div className="col">
                  {loading ? (
                    <LoadingOutlined />
                  ) : (
                    <Title level={4}>Update Sub Category</Title>
                  )}
                  <Divider></Divider>

                  <Card title="UPDATE SUB CATEGORY" style={{ maxWidth: 500 }}>
                    <label className="responsive">Parent Category:</label>
                    <select
                      name="category"
                      defaultValue="select"
                      className="responsive form-control"
                      onChange={(e) => setParent(e.target.value)}
                    >
                      <option value="select" disabled>
                        Select Category
                      </option>
                      {categories.length > 0 &&
                        categories.map((item) => {
                          return (
                            <option
                              key={item._id}
                              value={item._id}
                              selected={item._id === parent}
                            >
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

export default UpdateSubCategory;
