import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Importing Bar chart from Chart.js
import FilterListIcon from '@mui/icons-material/FilterList';
import Order from '../order/Order'

const MainContent = () => {
  const [totalCount,setTotalCount] =  useState([])
  const [boxesData, setBoxesData] = useState([]);
  const [orders, setOrders] = useState([]);
 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/orders/get-count');
  //       setTotalCount(response.data);
  //     } catch (error) {
  //       console.error('Error fetching box data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders from the backend
        const response = await axios.get(`http://localhost:8000/orders/get-orders`); // Update with your API endpoint
        const fetchedOrders = response.data;

        // Calculate metrics
        const totalRevenue = fetchedOrders
          .filter(order => order.status === 'Delivered') // Assuming order.status indicates the order's completion status
          .reduce((acc, order) => acc + order.price, 0); // Sum totalAmount

        const totalOrders = fetchedOrders.length;
        const deliveredOrders = fetchedOrders.filter(order => order.status === 'Delivered').length;
        const pendingOrders = fetchedOrders.filter(order => order.status === 'Pending').length;

        // Prepare box data with different images
        const newBoxesData = [
          {  value: totalOrders.toString(), description: `Total Orders`, image: './1.png'},
          {  value: pendingOrders.toString(), description: `Pending Orders` ,image:'./1.png' },
          {  value: deliveredOrders.toString(), description: `Delivered Orders`,image:'./1.png' },
          {  value: `₹${totalRevenue.toFixed(2)}`, description: 'Total revenue ', image: './1.png' },

          // {  value: totalOrders.toString(), description: `${totalOrders} orders`, image: './images/orders.png' },
          // {  value: completedOrders.toString(), description: `${completedOrders} completed orders`, image: './images/completed.png' },
          // { value: pendingOrders.toString(), description: `${pendingOrders} pending orders`, image: './images/pending.png' },
        ];

        setOrders(fetchedOrders); // Store fetched orders if needed
        setBoxesData(newBoxesData); // Update the state with box data
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Sample data for the charts
  const chartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Orders',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      {/* Dashboard Title and Filter Box */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Dashboard</h3>
        <div style={{ display: 'flex', alignItems: 'center', padding: '5px 10px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
          <span style={{ marginRight: '8px' }}>Filter</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <FilterListIcon />
          </button>
        </div>
      </div>

      {/* Greeting Message */}
      <p style={{ margin: '10px 0', color:'GrayText' }}>Hello Samantha, Welcome back to Sedap Admin</p>

      {/* Container for Four Boxes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
      {boxesData.map((box, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', height: '120px' }}>
          <img
            src={box.image} // Use the image path from box data
            alt={box.title}
            style={{ width: '60px', height: '60px', marginRight: '20px',borderRadius: '50%' }} // Larger image styling
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
           
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{box.value}</p>
            <p style={{ color: '#888', margin: '0' }}>{box.description}</p>
          </div>
        </div>
      ))}
    </div>
  

      {/* Container for Chart Boxes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {/* Left Chart Box */}
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', marginRight: '10px' }}>
          <h6 style={{ margin: 0 }}>Orders Chart</h6>
          {/* <Bar data={chartData1} options={{ maintainAspectRatio: false }} height={200} /> */}
        </div>

        {/* Right Chart Box */}
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', marginLeft: '10px' }}>
          <h6 style={{ margin: 0 }}>Revenue Chart</h6>
          {/* <Bar data={chartData2} options={{ maintainAspectRatio: false }} height={200} /> */}
        </div>
      </div>
      <Order />
    </div>
  );
};

export default MainContent;
