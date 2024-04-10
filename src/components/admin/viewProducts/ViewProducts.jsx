import classNames from "classnames/bind";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchCollection } from "~/Hooks";
import { Loader, Search } from "~/components";

import { Pagination } from "~/components/product";
import { db, storage } from "~/firebase/config";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "~/redux/slice/filterSlice";
import { STORE_PRODUCTS, selectProducts } from "~/redux/slice/productSlice";
import styles from "./ViewProducts.module.scss";
import { BiExport } from "react-icons/bi";
import { AiOutlineFileWord } from "react-icons/ai";
import { CSVLink } from "react-csv";
import ItemProduct_Admin from "./ItemProduct_Admin";
// import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroll from "react-infinite-scroller";

const cx = classNames.bind(styles);

const ViewProducts = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setproductsPerPage] = useState(10);
  const currentProducts = filteredProducts.slice(
    0,
    currentPage * productsPerPage
  );
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = filteredProducts.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const confirmDelete = (id, imageUrl) => {
    Notiflix.Confirm.show(
      "Delete produc !!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function actionOK() {
        deleteProduct(id, imageUrl);
        navigate(`/admin/all-products`);
      },
      function actionCancel() {
        Notiflix.Notify.info("Cancel action delete product");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
   
  
  };

  const deleteProduct = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };
  //Custom
  const loadMore = () => {
    setTimeout(() => {
      setCurrentPage(currentPage + 1);
    }, 2000);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={cx("table")}>
        <h2>All products</h2>
        {/* <div className={cx("search")}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div> */}
        {/* <div className={cx("export")}>
          <p>Export Product</p>
          <CSVLink data={products}>
            <BiExport className={cx("icon-export")} />
          </CSVLink>
          <AiOutlineFileWord className={cx("icon-export")} />
        </div> */}
        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table style={{ tableLayout: "auto" }}>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Kho</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* <tbody> */}
            <InfiniteScroll
              style={{ width: "100%" }}
              // dataLength={currentProducts.length}
              // next={loadMore}
              loadMore={loadMore}
              element="tbody"
              hasMore={currentProducts.length >= products.length ? false : true}
              loader={<h4>Loading...</h4>}

              // endMessage={
              //   <p style={{ textAlign: "center" }}>
              //     <b>Yay! You have seen it all</b>
              //   </p>
              // }
            >
              {currentProducts.map((product, index) => {
                const { id, name, brand, price, imageURL, category,sum } = product;
                return (
                  <ItemProduct_Admin
                    id={id}
                    key={index}
                    index={index}
                    name={name}
                    Brand={brand}
                    imageURL={imageURL}
                    price={price}
                    sum={sum}
                    category={category}
                    className={"icons"}
                    func={() => confirmDelete(id, imageURL)}
                  />

                  // <tr key={id}>
                  //   <td>{index + 1}</td>
                  //   <td>
                  //     <img
                  //       src={imageURL}
                  //       alt={name}
                  //       style={{ width: "100px" }}
                  //     />
                  //   </td>
                  //   <td>{name}</td>
                  //   <td>{category}</td>
                  //   <td>{brand}</td>
                  //   <td>{`$${price}`}</td>
                  //   <td className={cx("icons")}>
                  //     <Link to={`/admin/add-product/${id}`}>
                  //       <FaEdit size={20} color="green" />
                  //       &nbsp;
                  //       <FaTrashAlt
                  //         size={18}
                  //         color="red"
                  //         onClick={() => confirmDelete(id, imageURL)}
                  //       />
                  //     </Link>
                  //   </td>
                  // </tr>
                );
              })}
            </InfiniteScroll>
            {/* </tbody> */}
          </table>
        )}

        {/* <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        /> */}
      </div>
    </>
  );
};
export default ViewProducts;
