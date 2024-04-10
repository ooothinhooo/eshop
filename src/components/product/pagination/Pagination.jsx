import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Pagination.module.scss";
const cx = classNames.bind(styles);

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];

  const totalPages = totalProducts / productsPerPage;

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className={cx("pagination")}>
      <li
        className={currentPage === pageNumbers[0] ? `${cx("hidden")}` : null}
        onClick={paginatePrev}
      >
        Prev
      </li>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? cx("active") : null}
            >
              {number}
            </li>
          );
        }
      })}

      <li
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${cx("hidden")}`
            : null
        }
        onClick={paginateNext}
      >
        Next
      </li>

      <p className={cx("page")}>
        <b> {`page ${currentPage}`}</b>
        <span> {` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  productsPerPage: PropTypes.number,
  totalProducts: PropTypes.number,
};

export default Pagination;
