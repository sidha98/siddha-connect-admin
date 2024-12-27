import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_url } from "../../../config.dev.json"
import './style.scss';

const Orders = () => {
  const [orders, setOrders] = useState([]); // State to hold the list of orders
  const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backend_url}/dealer/getOrders`, {
        });

        const fetchedOrders = response.data.data; // Assuming orders are in response.data.data
        setOrders(fetchedOrders);
        setSelectedOrder(fetchedOrders[0] || null); // Default to the first order if available
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="orders-container">
     {selectedOrder && (
        <div className="order-details">
         <div className='order_info_main'>
         <h3 className='infoHeading'>Order Details</h3>
          <div className="order-info">
            {/* <p><strong>Order ID:</strong> {selectedOrder.DealerCode}</p> */}
            <p><strong>Dealer Code:</strong> {selectedOrder.DealerCode}</p>
            <p><strong>Dealer Name:</strong> {selectedOrder.DealerName}</p>
            <p><strong>Order Date:</strong> {new Date(selectedOrder.OrderDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedOrder.OrderStatus}</p>
            <p><strong>Remarks:</strong> {selectedOrder.Remarks}</p>
            <p><strong>Total Price:</strong> {selectedOrder.TotalPrice}</p>
          </div>
         </div>
         
             {/* Scrollable Product List */}
             <div className="order-products">
            <h4>Product Details</h4>
            <div className="products-list">
              {selectedOrder.Products.map((product) => (
                <div key={product._id} className="product-card">
                  <p><strong>Brand:</strong> {product.ProductId.Brand}</p>
                  <p><strong>Model:</strong> {product.ProductId.Model}</p>
                  <p><strong>Price:</strong> {product.Price}</p>
                  <p><strong>Quantity:</strong> {product.Quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

 

      <div className="orders-list">
        {orders.map((order) => (
          <div
            key={order._id}
            className={`order-card ${selectedOrder?.DealerCode === order.DealerCode ? 'selected' : ''}`}
            onClick={() => setSelectedOrder(order)}
          >
            <p><strong>Dealer Code:</strong> {order.DealerCode}</p>
            <p><strong>Dealer Name:</strong> {order.DealerName}</p>
            <p><strong>Remarks:</strong> {order.Remarks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
