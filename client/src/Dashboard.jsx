import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './index.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
  const [user] = useState({ name: 'John Doe', avatar: 'https://via.placeholder.com/40' });
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowsDetails] = useState({ projects: false, tasks: false, team: false });

  // Simulate fetching dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Mock API response
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              projects: 5,
              tasksCompleted: 42,
              teamMembers: 8,
              projectProgress: [
                { name: 'Project A', progress: 80 },
                { name: 'Project B', progress: 60 },
                { name: 'Project C', progress: 90 },
              ],
            });
          }, 1000)
        );
        setDashboardData(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Chart data
  const chartData = dashboardData
    ? {
        labels: dashboardData.projectProgress.map((p) => p.name),
        datasets: [
          {
            label: 'Project Progress (%)',
            data: dashboardData.projectProgress.map((p) => p.progress),
            backgroundColor: 'rgba(124, 77, 255, 0.6)',
            borderColor: 'rgba(124, 77, 255, 1)',
            borderWidth: 1,
          },
        ],
      }
    : {};

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Project Progress Overview' },
    },
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate('/signin');
  };

  const toggleDetails = (widget) => {
    setShowsDetails((prev) => ({ ...prev, [widget]: !prev[widget] }));
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="main-content">
          <div className="welcome">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="main-content">
          <div className="form-message error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          Flowva
        </div>
        <div className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? 'active' : '')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Projects
          </NavLink>
          <NavLink to="/dashboard/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 18c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
            Settings
          </NavLink>
          <button className="sidebar-nav" onClick={handleLogout} style={{ background: 'none', border: 'none', textAlign: 'left' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-profile">
            <img src={user.avatar} alt="User avatar" />
            <span>{user.name}</span>
            <div className="dropdown">
              <button className="btn btn-secondary" style={{ margin: 0, padding: '8px' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="dropdown-menu">
                <button onClick={() => navigate('/dashboard/settings')}>Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>

        <div className="widgets-grid">
          <div className="widget" onClick={() => toggleDetails('projects')}>
            <h3>Active Projects</h3>
            <p>{dashboardData.projects}</p>
            <small>2 new this week</small>
            {showDetails.projects && (
              <div className="widget-details">
                <p>Recent: Project A, Project B</p>
              </div>
            )}
          </div>
          <div className="widget" onClick={() => toggleDetails('tasks')}>
            <h3>Tasks Completed</h3>
            <p>{dashboardData.tasksCompleted}</p>
            <small>85% completion rate</small>
            {showDetails.tasks && (
              <div className="widget-details">
                <p>Latest: Task #41, Task #42</p>
              </div>
            )}
          </div>
          <div className="widget" onClick={() => toggleDetails('team')}>
            <h3>Team Members</h3>
            <p>{dashboardData.teamMembers}</p>
            <small>2 online now</small>
            {showDetails.team && (
              <div className="widget-details">
                <p>Active: Alice, Bob</p>
              </div>
            )}
          </div>
        </div>

        <div className="chart-container">
          <h3>Project Progress</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;