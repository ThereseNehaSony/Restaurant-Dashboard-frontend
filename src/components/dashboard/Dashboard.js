import React from 'react';
import { Bar } from 'react-chartjs-2'; // Importing Bar chart from Chart.js
import FilterListIcon from '@mui/icons-material/FilterList';


const MainContent = () => {
  // Sample data for the boxes
  const boxesData = [
    { title: 'Example', value: '26', description: 'Twenty-six orders' },
    { title: 'Example', value: '15', description: 'Fifteen orders' },
    { title: 'Example', value: '30', description: 'Thirty orders' },
    { title: 'Example', value: '22', description: 'Twenty-two orders' },
  ];

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
        <h5 style={{ margin: 0 }}>Dashboard</h5>
        <div style={{ display: 'flex', alignItems: 'center', padding: '5px 10px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
          <span style={{ marginRight: '8px' }}>Filter</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <FilterListIcon />
          </button>
        </div>
      </div>

      {/* Greeting Message */}
      <p style={{ margin: '10px 0' }}>Hello Samantha, Welcome back to Sedap Admin</p>

      {/* Container for Four Boxes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
        {boxesData.map((box, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', height: '120px' }}>
            <img 
              src={'./logo.png'} // Use the image path you want
              alt="Example"
              style={{ width: '60px', height: '60px', marginRight: '20px' }} // Larger image styling
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{box.title}</span>
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
    </div>
  );
};

export default MainContent;
