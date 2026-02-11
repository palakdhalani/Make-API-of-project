import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Dashboard = () => {
    const [data, setData] = useState({ totalUsers: 0, totalProducts: 0, stats: null });

    useEffect(() => {
        api.get('/dashboard').then(res => setData(res.data));
    }, []);

    const chartData = {
        labels: data.stats?.labels || [],
        datasets: [
            {
                label: 'Users Growth',
                data: data.stats?.usersData || [],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#6366f1'
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14, weight: '600' },
                bodyFont: { size: 13 },
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { color: '#64748b', font: { family: 'Inter' } }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { family: 'Inter' } }
            }
        }
    };

    return (
        <div className="container-fluid p-0">
            <h3 className="fw-bold mb-4">Overview</h3>
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body p-4 d-flex align-items-center gap-4">
                            <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-4">
                                <i className="fa fa-users fs-4"></i>
                            </div>
                            <div>
                                <p className="text-muted mb-0 fw-medium">Total Users</p>
                                <h2 className="mb-0 fw-bold">{data.totalUsers}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body p-4 d-flex align-items-center gap-4">
                            <div className="bg-success bg-opacity-10 text-success p-3 rounded-4">
                                <i className="fa fa-cube fs-4"></i>
                            </div>
                            <div>
                                <p className="text-muted mb-0 fw-medium">Total Products</p>
                                <h2 className="mb-0 fw-bold">{data.totalProducts}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body p-4 d-flex align-items-center gap-4">
                            <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-4">
                                <i className="fa fa-line-chart fs-4"></i>
                            </div>
                            <div>
                                <p className="text-muted mb-0 fw-medium">System Status</p>
                                <h2 className="mb-0 fw-bold fs-4 mt-1"><span className="badge bg-success bg-opacity-10 text-success px-3 pb-2 pt-1">Active</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card border-0 h-100">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold mb-0">Analytics Representation</h5>
                                <div className="dropdown">
                                    <button className="btn btn-light btn-sm px-3 rounded-pill text-muted fw-medium border-0">Weekly</button>
                                </div>
                            </div>
                            <div style={{ height: '320px' }}>
                                {data.stats && <Line data={chartData} options={chartOptions} />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card border-0 h-100">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">Recent Activity</h5>
                            <div className="d-flex flex-column gap-4">
                                {[1, 2, 3, 4].map(idx => (
                                    <div key={idx} className="d-flex gap-3">
                                        <div className="bg-light p-2 rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="fa fa-check text-success"></i>
                                        </div>
                                        <div>
                                            <p className="mb-0 fw-semibold small">System backup completed</p>
                                            <p className="mb-0 text-muted extra-small" style={{ fontSize: '0.75rem' }}>2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
