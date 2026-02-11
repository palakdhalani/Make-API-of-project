import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className="admin-wrapper">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="bg-primary p-2 rounded-3 text-white">
                        <i className="fa fa-shield"></i>
                    </div>
                    <span>NODE REACT CP</span>
                </div>
                <nav className="mt-4">
                    <NavLink to="/" className="nav-link" end>
                        <i className="fa fa-th-large"></i> <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/users" className="nav-link">
                        <i className="fa fa-users"></i> <span>Staff Mgt</span>
                    </NavLink>
                    <NavLink to="/products" className="nav-link">
                        <i className="fa fa-briefcase"></i> <span>Inventory</span>
                    </NavLink>
                    <div className="mt-5 border-top pt-4 px-2">
                        <button onClick={handleLogout} className="btn btn-outline-danger w-100 border-0 text-start d-flex align-items-center gap-2 rounded-3 fw-medium">
                            <i className="fa fa-power-off"></i> <span>Sign Out</span>
                        </button>
                    </div>
                </nav>
            </aside>

            <main className="main-content">
                <header className="navbar navbar-expand-lg d-flex justify-content-between align-items-center px-4 py-3 mb-4 bg-white rounded-4 shadow-sm">
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-light d-lg-none">
                            <i className="fa fa-bars"></i>
                        </button>
                        <div className="search-box d-none d-md-flex align-items-center bg-light px-3 py-2 rounded-pill">
                            <i className="fa fa-search text-muted me-2"></i>
                            <input type="text" className="bg-transparent border-0 small" placeholder="Search data..." style={{ outline: 'none' }} />
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <button onClick={toggleDarkMode} className="btn btn-light rounded-circle shadow-none" style={{ width: '40px', height: '40px' }}>
                            <i className="fa fa-moon-o"></i>
                        </button>
                        <div className="d-flex align-items-center gap-2">
                            <div className="text-end d-none d-sm-block">
                                <p className="mb-0 fw-bold small">Administrator</p>
                                <p className="mb-0 text-muted extra-small">Active System</p>
                            </div>
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '38px', height: '38px' }}>
                                A
                            </div>
                        </div>
                    </div>
                </header>
                <div className="content-area">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
