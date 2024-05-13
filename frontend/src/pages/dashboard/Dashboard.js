import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";
import Papa from "papaparse";

function exportProductsToCSV(products) {
  if (!products || products.length === 0) {
    console.error("No items to export.");
    return;
  }

  const columnsToExport = Object.keys(products[0]).filter(
    (key) => !["_id", "user", "__v"].includes(key)
  );

  const csvRows = products.map((product) =>
    columnsToExport.map((key) => {
      if (key === "description") {
        return product[key].replace(/(<([^>]+)>)/gi, "");
      }
      return product[key];
    })
  );

  const csvData =
    "\uFEFF" +
    Papa.unparse({
      fields: columnsToExport,
      data: csvRows,
    });

  const currentDate = new Date();
  const fileName = `${currentDate.getFullYear()}${(
    "0" +
    (currentDate.getMonth() + 1)
  ).slice(-2)}${("0" + currentDate.getDate()).slice(-2)}_kiểm_kê.csv`;

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const handleExportCSV = () => {
    exportProductsToCSV(products);
  };

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList
        products={products}
        isLoading={isLoading}
        handleExportCSV={handleExportCSV}
      />
    </div>
  );
};

export default Dashboard;
