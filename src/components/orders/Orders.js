import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "../../config.dev.json";
import "./style.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // const fetchOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`${backend_url}/dealer/getOrders`);
  //     const fetchedOrders = response.data.data;
  //     setOrders(fetchedOrders);
  //     setSelectedOrder(fetchedOrders[0] || null);
  //   } catch (err) {
  //     console.error("Error fetching orders:", err);
  //     setError("Failed to fetch orders. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Function to fetch orders from the API
  const fetchOrders = async () => {
   try {
       const response = await axios.get(
        `${backend_url}/dealer/getOrders`,
           {
             // Request body content goes here (if any)
             startDate: "",
             endDate: "",
             search: "",
             status: "",
           },
         );
         

     setOrders(response.data.orders || []);
   } catch (err) {
     setError(err.response?.data?.message || "Failed to fetch orders");
   } finally {
     setLoading(false);
   }
 };
  
  const handleDeleteOrder = (orderId) => {
    setOrderToDelete(orderId);
    setShowPopup(true); // Show the popup
  };

  const confirmDeleteOrder = async () => {
    try {
      await axios.delete(`${backend_url}/dealer/deleteOrder/${orderToDelete}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderToDelete)
      );
      setSelectedOrder(null);
      setShowPopup(false); // Close the popup
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order. Please try again.");
    }
  };

  const cancelDeleteOrder = () => {
    setShowPopup(false); // Close the popup
    setOrderToDelete(null); // Reset the order to delete
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  const getTotalQuantity = (products) => {
    return products.reduce((total, product) => total + product.Quantity, 0);
  };

  return (
    <div className="orders-container">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to delete this order?</p>
            <div className="popup-actions">
              <button className="confirm-button" onClick={confirmDeleteOrder}>
                Yes
              </button>
              <button className="cancel-button" onClick={cancelDeleteOrder}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {selectedOrder && (
        <div className="order-details">
          <div className="order_info_main">
            <h3 className="infoHeading">Order Details</h3>
            <div className="order-info">
              <p>
                <strong>Dealer Code:</strong> {selectedOrder.DealerCode}
              </p>
              <p>
                <strong>Dealer Name:</strong> {selectedOrder.DealerName}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.OrderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.OrderStatus}
              </p>
              <p>
                <strong>Remarks:</strong> {selectedOrder.Remarks}
              </p>
              <p>
                <strong>Total Price:</strong> {selectedOrder.TotalPrice}
              </p>
              <p>
                <strong>Total Quantity:</strong>{" "}
                {getTotalQuantity(selectedOrder.Products)}
              </p>
            </div>
          </div>

          <div className="order-products">
            <h4 className="orderHeading">Product Details</h4>
            <div className="products-list">
              {selectedOrder.Products.map((product) => (
                <div key={product._id} className="product-card">
                  <p>
                    <strong>Price:</strong> {product.Price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {product.Quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            className="delete-button"
            onClick={() => handleDeleteOrder(selectedOrder._id)}
          >
            Delete Order
          </button>
        </div>
      )} */}
<div className="orders-sub">
  {orders.length > 0 ? (
    orders.map((order) => (
      <div key={order._id} className="order-box">
        <div className="order-dets-top">
          <div className="order-dets-top-left">
            <p>{order._id}</p>
            <p>{new Date(order.OrderDate).toLocaleDateString()} | </p>
            <p>
              {order.Products.length}N | {order.TotalPrice.toLocaleString()} INR
            </p>
            <div className={`order-status ${order.OrderStatus.toLowerCase()}`}>
              {order.OrderStatus.toUpperCase()}
            </div>
          </div>
          <div className="order-dets-top-right">
            {order.OrderStatus.toUpperCase() === "PENDING" && (
              <>
                <a href={`/edit-order/${order._id}`}>Edit</a>
                <a href="#" onClick={() => handleDeleteOrder(order._id)}>
                  Delete
                </a>
              </>
            )}
          </div>
        </div>
        <div className="order-dets-bottom">
          {order.Products.map((product) => (
            <div key={product._id} className="order-products">
              <div className="order-products-left">
                <p className="product-name">
                  {product.Model} | {product.ProductCode}
                </p>
                <p className="product-price">
                  {product.Quantity} x {product.Price.toLocaleString()} INR
                </p>
              </div>
              <div className="order-products-right">
                <p className="order-total">
                  {(product.Quantity * product.Price).toLocaleString()} INR
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))
  ) : (
    <p>No orders available.</p>
  )}
</div>

      
      {/* <div className="orders-header">
        <span className="order-count">Total Orders: {orders.length}</span>
      </div> */}
      <div className="orders-list">
       <h1>orders</h1>
        {orders.map((order) => (
          <div
            key={order._id}
            className={`order-card ${selectedOrder?.DealerCode === order.DealerCode ? "selected" : ""}`}
            onClick={() => setSelectedOrder(order)}
          >
            <p>
              <strong>Dealer Code:</strong> {order.DealerCode}
            </p>
            <p>
              <strong>Dealer Name:</strong> {order.DealerName}
            </p>
            <p>
              <strong>Remarks:</strong> {order.Remarks}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
