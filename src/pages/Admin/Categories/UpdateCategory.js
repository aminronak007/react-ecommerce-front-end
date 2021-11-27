import React, { useEffect, useState } from "react";
import { Card, Divider, Typography } from "antd";
import { updateCategory, getCategory } from "../../../functions/category";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { getAdminAuth } from "../../../functions/adminAuth";
import { useParams } from "react-router";
import CategoryForm from "../../../Components/AdminComponents/Forms/CategoryForm";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const UpdateCategory = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const token = Cookies.get("adminToken");
  const [categoryName, setName] = useState("");
  const [loading, setLoading] = useState(false);

  let { slug } = useParams();
  useEffect(() => {
    auth();
    loadCategory();
  }, []);

  const auth = () => {
    getAdminAuth().then((res) => {
      setCurrentUser(res.data);
    });
  };

  const loadCategory = () => {
    getCategory(slug).then((res) => {
      setName(res.data.category.categoryName);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { categoryName })
      .then((res) => {
        setLoading(false);
        setName("");

        toast.success(`${res.data.updateCategory.categoryName} is updated.`);
        history.push("/admin/categories");

        toast.error(res.data.error);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
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
                    <Title level={4}>Update Category</Title>
                  )}
                  <Divider></Divider>
                  <Card title="UPDATE CATEGORY" style={{ maxWidth: 500 }}>
                    <CategoryForm
                      handleSubmit={handleSubmit}
                      categoryName={categoryName}
                      setName={setName}
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

export default UpdateCategory;
