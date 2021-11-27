import React, { useEffect, useState } from "react";
import { Card, Divider, Typography } from "antd";
import { createCategory } from "../../../functions/category";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { getAdminAuth } from "../../../functions/adminAuth";
import CategoryForm from "../../../Components/AdminComponents/Forms/CategoryForm";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CreateCategory = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const token = Cookies.get("adminToken");
  const [categoryName, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth();
  }, []);

  const auth = () => {
    getAdminAuth().then((res) => {
      setCurrentUser(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ categoryName })
      .then((res) => {
        setLoading(false);
        setName("");

        if (res.data.categoryName) {
          toast.success(`${res.data.categoryName} is added.`);
          history.push("/admin/categories");
        }
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
                <div className="col-md-12">
                  {loading ? (
                    <LoadingOutlined />
                  ) : (
                    <Title level={4}>Add New Category</Title>
                  )}
                  <Divider></Divider>
                  <Card title="ADD CATEGORY" style={{ maxWidth: 500 }}>
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

export default CreateCategory;
