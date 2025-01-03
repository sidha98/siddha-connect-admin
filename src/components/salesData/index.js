import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "../../config.dev.json";
import "./style.scss";

const Sales_Data = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 50;

  const fetchSalesData = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${backend_url}/sales-data-mtdw/getSalesData`,
        {
          params: {
            page,
            limit: rowsPerPage,
            search: searchTerm,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
          },
        }
      );
      setSalesData(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching sales data:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchSalesData(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
    fetchSalesData(1);
  };

  const prevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const nextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  useEffect(() => {
    fetchSalesData(currentPage);
  }, [currentPage]);

  return (
    <div className="sales-data">
      <h2 className="table-title">Sales</h2>
      <div className="filter-container">
        <div className="search-and-filters">
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
        </div>
        <div className="filter-buttons">
          <button className="apply-btn" onClick={applyFilters}>
            Apply Filter
          </button>
          <button className="reset-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <div className="table-container">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>STATE</th>
                  <th>TSE</th>
                  <th>ASM</th>
                  <th>SEGMENT</th>
                  <th>PRICE BAND</th>
                  <th>Date</th>
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
                      <td>{item.DATE}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button
              onClick={prevPage}
              className="page-btn"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="page-btn"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sales_Data;
