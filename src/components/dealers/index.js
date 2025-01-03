import React, { useState } from 'react'
import "./style.scss"
const DealersData = () => {
 const [dateRange, setDateRange] = useState("27/12/2024 - 03/01/2025");

  return (
   <div className="my-orders-container">
   <div className="header">
     <h2>Dealers</h2>
   </div>
   <div className="filters">
     <div className="date-range">
       <label htmlFor="date-range">Date Range:</label>
       <input
         type="text"
         id="date-range"
         value={dateRange}
         onChange={(e) => setDateRange(e.target.value)}
         placeholder="Select Date Range"
       />
     </div>
     <button className="search-button">Search</button>
     <div className="table-search">
       <label htmlFor="table-search">Search:</label>
       <input type="text" id="table-search" placeholder="Search..." />
     </div>
   </div>
   <div className="table-actions">
     <button>Copy</button>
     <button>Download</button>
   </div>
   <div className="table-container">
     <table>
       <thead>
         <tr>
           <th>Order No</th>
           <th>Order Date</th>
           <th>Part No</th>
           <th>Qty</th>
           <th>Rate</th>
           <th>Payment Method</th>
           <th>Shipping Method</th>
           <th>Delivery Address</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td colSpan="8">No data available in table</td>
         </tr>
       </tbody>
     </table>
   </div>
 </div>
  )
}

export default DealersData;