import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const RevenueChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
      });
      

      useEffect(() => {
        const fetchData = async () => {
          try {
            const year1 = 2023;
            const year2 = 2024;
      
            const response = await axios.get('http://localhost:8000/orders/revenue', { params: { year1, year2 } });
            const { year1Data, year2Data } = response.data;
      
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
            const year1Revenue = months.map((month, index) => {
              const data = year1Data?.find((item) => item._id.month === index + 1);
              return data ? data.totalRevenue : 0;
            });
      
            const year2Revenue = months.map((month, index) => {
              const data = year2Data?.find((item) => item._id.month === index + 1);
              return data ? data.totalRevenue : 0;
            });
      
            
            setChartData({
              labels: months,
              datasets: [
                {
                  label: `Revenue in ${year1}`,
                  data: year1Revenue,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: true,
                  tension: 0.4,
                },
                {
                  label: `Revenue in ${year2}`,
                  data: year2Revenue,
                  borderColor: 'rgba(153, 102, 255, 1)',
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  fill: true,
                  tension: 0.4,
                }
              ],
            });
          } catch (error) {
            console.error('Failed to fetch revenue data', error);
          }
        };
      
        fetchData();
      }, []);

  return (
    <div>
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top', align: 'end' } } }} />
    </div>
  );
};

export default RevenueChart;
