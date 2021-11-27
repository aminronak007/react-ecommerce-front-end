import React from "react";
import { Avatar, Badge } from "antd";

import Resizer from "react-image-file-resizer";
import axios from "axios";
const ImageUpload = ({
  values,
  setValues,
  setLoading,
  categoryName,
  subCategoryName,
}) => {
  const imageUploadAndResize = (e) => {
    let files = e.target.files;
    let allImageFiles = values.images;
    let productName = values.productName;
    let cat = categoryName;
    let sub = subCategoryName;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post("http://localhost:3000/api/uploadimages", {
                image: uri,
                productName,
                cat,
                sub,
              })
              .then((res) => {
                setLoading(false);
                allImageFiles.push(res.data);

                setValues({ ...values, images: allImageFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("Cloudinary Upload Error", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/removeimage", { public_id })
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });

        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        <div style={{ marginBottom: "15px" }} className="col-md-6">
          <label>Select Product Images : &nbsp;</label>

          <input
            type="file"
            className="btn btn-primary btn-raised"
            multiple
            accept="images/*"
            onChange={imageUploadAndResize}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div style={{ marginBottom: "20px" }} className="col-md-12">
          {values.images &&
            values.images.map((item) => {
              return (
                <Badge
                  count="X"
                  key={item.public_id}
                  onClick={() => handleImageRemove(item.public_id)}
                  style={{ cursor: "pointer" }}
                >
                  <Avatar
                    shape="square"
                    size={80}
                    key={item.public_id}
                    src={item.url}
                    className="ml-3"
                  />
                </Badge>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
