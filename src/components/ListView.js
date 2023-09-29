import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Col,
  Input,
  Row,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
} from "reactstrap";
import TableView from "./TableView";
import CardView from "./CardView";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "store/actions/propertyAction";

function ListView() {
  const dispatch = useDispatch();
  const { all_properties } = useSelector((state) => state.properties);

  const [priceRange, setPriceRange] = useState("all");
  const [bedRange, setBedRange] = useState("all");
  const [bathRange, setBathRange] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCheck = (e) => {
    setView(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handlebedRangeChange = (e) => {
    setBedRange(e.target.value);
  };
  const handleBathRangeChange = (e) => {
    setBathRange(e.target.value);
  };

  const filteredListings =
    all_properties.length > 0
      ? all_properties
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter((item) => {
            // Filter by price range
            if (priceRange === "all") {
              return true;
            } else if (priceRange === "0-5") {
              return item.price >= 0 && item.price <= 5;
            } else if (priceRange === "5-10") {
              return item.price > 5 && item.price <= 10;
            } else if (priceRange === "more") {
              return item.price > 10;
            }

            return true;
          })
          .filter((item) => {
            // Filter by bed range
            if (bedRange === "all") {
              return true;
            } else if (bedRange === "0-5") {
              return item.bed >= 0 && item.bed <= 5;
            } else if (bedRange === "5-10") {
              return item.bed > 5 && item.bed <= 10;
            } else if (bedRange === "more") {
              return item.bed > 10;
            }

            return true;
          })
          .filter((item) => {
            // Filter by bed range
            if (bathRange === "all") {
              return true;
            } else if (bathRange === "0-5") {
              return item.bath >= 0 && item.bath <= 5;
            } else if (bathRange === "5-10") {
              return item.bath > 5 && item.bath <= 10;
            } else if (bathRange === "more") {
              return item.bath > 10;
            }

            return true;
          })
      : "";

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const sortedListings = useMemo(() => {
    const sorted = [...filteredListings];
    sorted.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    return sorted;
  }, [filteredListings, sortBy, sortOrder]);

  // Paginate the sorted listings
  const paginatedListings = sortedListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate an array of page numbers for rendering pagination links.
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    dispatch(getProperties());
  }, []);
  return (
    <>
      <Row className="m-0 p-0">
        <Col md={2} className="p-3">
          <div className="d-flex flex-column align-items-start justify-content-start">
            <div className="d-flex align-items-center justify-content-center my-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="viewRadio"
                  id="table"
                  value="table"
                  onChange={handleCheck}
                  checked={view === "table"}
                />
                <label className="form-check-label" htmlFor="table">
                  Table View
                </label>
              </div>
              <div className="form-check mx-0 mx-lg-3 my-3 my-lg-0">
                <input
                  className="form-check-input"
                  type="radio"
                  name="viewRadio"
                  id="card"
                  value="card"
                  onChange={handleCheck}
                  checked={view === "card"}
                />
                <label className="form-check-label" htmlFor="card">
                  Card View
                </label>
              </div>
            </div>

            <h3>Price Range</h3>
            <div className="price-filter d-flex  flex-column">
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="all"
                  checked={priceRange === "all"}
                  onChange={handlePriceRangeChange}
                />
                All
              </label>
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="0-5"
                  checked={priceRange === "0-5"}
                  onChange={handlePriceRangeChange}
                />
                $0 - $5
              </label>
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="5-10"
                  checked={priceRange === "5-10"}
                  onChange={handlePriceRangeChange}
                />
                $5 - $10
              </label>
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="more"
                  checked={priceRange === "more"}
                  onChange={handlePriceRangeChange}
                />
                More than $10
              </label>
            </div>

            <h3>Bedrooms </h3>
            <div className="price-filter d-flex  flex-column">
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="all"
                  checked={bedRange === "all"}
                  onChange={handlebedRangeChange}
                />
                All
              </label>
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="0-5"
                  checked={bedRange === "0-5"}
                  onChange={handlebedRangeChange}
                />
                0 - 5
              </label>
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="5-10"
                  checked={bedRange === "5-10"}
                  onChange={handlebedRangeChange}
                />
                5 - 10
              </label>
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="more"
                  checked={bedRange === "more"}
                  onChange={handlebedRangeChange}
                />
                More than 10
              </label>
            </div>
            <h3>Bathrooms</h3>
            <div className="price-filter d-flex  flex-column">
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="all"
                  checked={bathRange === "all"}
                  onChange={handleBathRangeChange}
                />
                All
              </label>
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="0-5"
                  checked={bathRange === "0-5"}
                  onChange={handleBathRangeChange}
                />
                0 - 5
              </label>
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="5-10"
                  checked={bathRange === "5-10"}
                  onChange={handleBathRangeChange}
                />
                5 - 10
              </label>
              <label>
                <input
                  className="mx-2"
                  type="radio"
                  value="more"
                  checked={bathRange === "more"}
                  onChange={handleBathRangeChange}
                />
                More than 10
              </label>
            </div>
          </div>
        </Col>
        <Col md={10}>
          <Card className="p-2 p-lg-5">
            <div className="d-flex justify-content-end align-items-center my-3">
              <span className="mx-2">Sort By:</span>
              <div>
                <select
                  className="form-select form-select-sm form-control"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="createdAt">Date</option>
                  <option value="title">Title</option>
                  <option value="price">Price</option>
                  {/* Add more sorting options as needed */}
                </select>
              </div>
              <div className="mx-2">
                <select
                  className="form-select form-select-sm ms-2 form-control"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            <div className="my-3">
              <Input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {view === "table" ? (
              <TableView
                listing={paginatedListings}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            ) : (
              <CardView listing={paginatedListings} />
            )}
            {totalPages > 1 && (
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem
                      className={currentPage === 1 ? "disabled" : ""}
                    >
                      <PaginationLink
                        href="#pablo"
                        onClick={() => handlePageChange(currentPage - 1)}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <PaginationItem
                        key={index}
                        className={currentPage === index + 1 ? "active" : ""}
                      >
                        <PaginationLink
                          href="#pablo"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      className={currentPage === totalPages ? "disabled" : ""}
                    >
                      <PaginationLink
                        href="#pablo"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ListView;
