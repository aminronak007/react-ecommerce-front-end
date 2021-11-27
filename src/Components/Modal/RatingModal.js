import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router";

const RatingModal = ({ children }) => {
  let history = useHistory();
  const token = Cookies.get("accessToken");
  const [modalVisible, setModalvisible] = useState(false);
  let { slug } = useParams();

  const handleModal = () => {
    if (token) {
      setModalvisible(true);
    } else {
      toast.info("Please Login to Rate the Product");
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br /> {token ? "Leave Rating" : "Login to Rate"}
      </div>
      <Modal
        title="Leave your Rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalvisible(false);
          toast.success("Thanks for your review. It will appear soon");
        }}
        onCancel={() => {
          setModalvisible(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
