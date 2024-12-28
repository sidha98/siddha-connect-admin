import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "../../config.dev.json";
import "./style.scss";

const Sales_Data = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 5;
  const pagesPerBlock = 5;

  const fetchSalesData = async (page) => {
    try {
      const response = await axios.get(
        `${backend_url}/sales-data-mtdw/getSalesData?page=${page}&limit=${rowsPerPage}`
      );
      setSalesData(response.data.data);
      setTotalCount(response.data.totalCount); 
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching sales data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData(currentPage);
  }, [currentPage]);

  // Apply Filters
  const applyFilters = () => {
    const filteredData = salesData.filter((item) => {
      const matchesSearchTerm = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDateRange =
        (!startDate || new Date(item.date) >= new Date(startDate)) &&
        (!endDate || new Date(item.date) <= new Date(endDate));
      return matchesSearchTerm && matchesDateRange;
    });
    setSalesData(filteredData);
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    fetchSalesData(currentPage);
  };

  // Pagination Logic
  const totalPages = Math.ceil(totalCount / rowsPerPage); 
  const currentPageBlock = Math.ceil(currentPage / pagesPerBlock);

  const pageBlockStart = (currentPageBlock - 1) * pagesPerBlock + 1;
  const pageBlockEnd = Math.min(pageBlockStart + pagesPerBlock - 1, totalPages);

  // Handle page change
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle Previous Block
  const previousBlock = () => {
    if (currentPageBlock > 1) {
      setCurrentPage((currentPageBlock - 1) * pagesPerBlock);
    }
  };

  // Handle Next Block
  const nextBlock = () => {
    if (currentPageBlock < Math.ceil(totalPages / pagesPerBlock)) {
      setCurrentPage(currentPageBlock * pagesPerBlock + 1);
    }
  };

  return (
    <div className="sales-data">
      <h1>Sales Data</h1>

      {/* Filters */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="filter-input"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="filter-input"
        />
        <div className="filter-buttons">
          <button className="apply-btn" onClick={applyFilters}>
            Apply Filter
          </button>
          <button className="reset-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
          <>
            <table className="sales-table">
              <thead>
                <tr>
                  <th>STATE</th>
                  <th>TSE</th>
                  <th>ASM</th>
                  <th>SEGMENT</th>
                  <th>PRICE BAND</th>
                </tr>
              </thead>
              <tbody>
                {salesData.length > 0 ? (
                  salesData.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{item.STATE}</td>
                      <td>{item.TSE}</td>
                      <td>{item.ASM}</td>
                      <td>{item.SEGMENT}</td>
                      <td>{item["PRICE BAND"]}</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
              {/* Previous Block Button */}
              <button
                onClick={previousBlock}
                className="prev-block-btn"
                disabled={currentPageBlock === 1}
              >
                Previous
              </button>

              {/* Show 5 pages at a time */}
              {Array.from({ length: pageBlockEnd - pageBlockStart + 1 }).map(
                (_, index) => {
                  const pageNum = pageBlockStart + index;
                  return (
                    pageNum <= totalPages && (
                      <button
                        key={pageNum}
                        onClick={() => changePage(pageNum)}
                        className={`page-btn ${
                          currentPage === pageNum ? "active" : ""
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  );
                }
              )}

              {/* Next Block Button */}
              <button
                onClick={nextBlock}
                className="next-block-btn"
                disabled={currentPageBlock >= Math.ceil(totalPages / pagesPerBlock)}
              >
                Next
              </button>
            </div>
          </>
        
      </div>
    </div>
  );
};

export default Sales_Data;