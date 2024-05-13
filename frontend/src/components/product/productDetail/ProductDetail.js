import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";
import { formatNumbers } from "../productSummary/ProductSummary";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Chi tiết vật dụng</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.image ? (
                <img src={product.image.url} alt={product.image.fileName} />
              ) : (
                <p>Không có hình ảnh cho vật dụng</p>
              )}
            </Card>
            {/* <h4>Product Availability: {stockStatus(product.quantity)}</h4> */}
            <hr />
            <h4>
              <span className="badge">Tên: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; Mã vật dụng : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Phòng ban : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Giá : </b>{" "}
              {formatNumbers(Number(product.price).toFixed(0))}
              {"vnđ"}
            </p>
            <p>
              <b>&rarr; Số lượng: </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Tổng giá trị : </b>{" "}
              {formatNumbers((product.price * product.quantity).toFixed(0))}
              {"vnđ"}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Thêm lúc: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Cập nhật gần nhất: {product.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
