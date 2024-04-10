import styles from "./ProductList.module.scss";
import classNames from "classnames/bind";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  selectFilteredProducts,
} from "~/redux/slice/filterSlice";

import PropTypes from "prop-types";
import Pagination from "../pagination/Pagination";
import { Search } from "~/components";
const cx = classNames.bind(styles);

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);

  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
    setCurrentPage(1);
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
    setCurrentPage(1);
  }, [dispatch, products, search]);

  return (
    <div className={cx("product-list")} id="product">
      <div className={cx("top")}>
        <div className={cx("icons")}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={cx("sort")}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${cx("grid")}` : `${cx("list")}`}>
        {products.lenght === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ProductList;
