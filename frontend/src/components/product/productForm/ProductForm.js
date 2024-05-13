import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Ảnh vật dụng</label>
            <code className="--color-dark">
              Hỗ trợ kiểu ảnh: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {productImage ? (
              <div className="image-preview">
                <img src={productImage} alt="product" />
              </div>
            ) : (
              <p>Không có hình ảnh nào được đặt cho vật dụng này</p>
            )}
          </Card>
          <label>Tên vật dụng:</label>
          <input
            type="text"
            placeholder="Tên vật dụng"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Tên phòng ban:</label>
          <input
            type="text"
            placeholder="Tên phòng ban"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />

          <label>Giá trị:</label>
          <input
            type="text"
            placeholder="Giá trị"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Số lượng:</label>
          <input
            type="text"
            placeholder="Số lượng"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Mô tả:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Lưu vật dụng
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
