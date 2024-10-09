import './App.css';
import DashboardContent from './components/dashboard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        {/* Sidebar stays fixed on the left */}
        <Sidebar />
        {/* Main content area: includes navbar and dashboard */}
        <div className="main-content">
          <Navbar />
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}

export default App;
