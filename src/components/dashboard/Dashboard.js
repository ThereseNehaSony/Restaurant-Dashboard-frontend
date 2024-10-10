import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import FilterListIcon from '@mui/icons-material/FilterList';
import Order from '../order/Order';
import RevenueLineChart from '../chart/Chart';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const MainContent = () => {
  const [boxesData, setBoxesData] = useState([]);
  const [orders, setOrders] = useState([]);

  const exportToExcel = () => {
    const formattedData = orders.map(order => ({
      OrderID: order.orderId,
      CustomerName: order.customerName,
      Product: order.product,
      Quantity: order.quantity,
      Price: order.price,
      Location: order.location,
      Date: new Date(order.createdAt).toLocaleDateString(),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'OrderList.xlsx');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/orders/get-orders`);
        const fetchedOrders = response.data;

        const totalRevenue = fetchedOrders
          .filter(order => order.status === 'Delivered')
          .reduce((acc, order) => acc + order.price, 0);

        const totalOrders = fetchedOrders.length;
        const deliveredOrders = fetchedOrders.filter(order => order.status === 'Delivered').length;
        const pendingOrders = fetchedOrders.filter(order => order.status === 'Pending').length;

        const newBoxesData = [
          { value: totalOrders.toString(), description: `Total Orders`, image: './1.png' },
          { value: pendingOrders.toString(), description: `Pending Orders`, image: './1.png' },
          { value: deliveredOrders.toString(), description: `Delivered Orders`, image: './1.png' },
          { value: `₹${totalRevenue.toFixed(2)}`, description: 'Total revenue', image: './1.png' },
        ];

        setOrders(fetchedOrders);
        setBoxesData(newBoxesData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const pieData = {
    labels: ['Total Order', 'Growth', 'Total Revenue'],
    datasets: [
      {
        data: [81, 22, 62],
        backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
      },
    ],
  };

  const lineData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Order',
        data: [120, 456, 300, 400, 210, 230, 450],
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        tension: 0.4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    radius: '60%',
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw + ' Orders';
          },
        },
      },
    },
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Dashboard</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '5px 10px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <span style={{ marginRight: '8px' }}>Filter</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <FilterListIcon />
          </button>
        </div>
      </div>

      <p style={{ margin: '10px 0', color: 'GrayText' }}>Hello Samantha, Welcome back to Sedap Admin</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
        {boxesData.map((box, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '6px',
              height: '120px',
            }}
          >
            <img
              src={box.image}
              alt={box.title}
              style={{ width: '60px', height: '60px', marginRight: '20px', borderRadius: '50%' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{box.value}</p>
              <p style={{ color: '#888', margin: '0' }}>{box.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div
          style={{
            width: '45%',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <h3>Pie Chart</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div
          style={{
            width: '45%',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Chart Order</h3>
            <button
              onClick={exportToExcel}
              style={{
                backgroundColor: '#36A2EB',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
              }}
            >
              Save Report
            </button>
          </div>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      <div>
        <h1>Total Revenue</h1>
        <RevenueLineChart />
      </div>
      <Order />
    </div>
  );
};

export default MainContent;
