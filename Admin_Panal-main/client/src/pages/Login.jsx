import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const success = await login(email, password);
            if (success) navigate('/');
            else setError('Invalid credentials. Check your email/password.');
        } catch (err) {
            setError('System error. Please verify backend connection.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card p-5">
                <div className="text-center mb-5">
                    <div className="bg-primary bg-opacity-10 text-primary d-inline-flex p-3 rounded-circle mb-4">
                        <i className="fa fa-shield fs-1"></i>
                    </div>
                    <h2 className="fw-bold mb-1">Welcome Back</h2>
                    <p className="text-muted">Enter details to access your dashboard</p>
                </div>

                {error && <div className="alert alert-danger py-2 small mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-envelope-o text-muted"></i></span>
                            <input
                                type="email"
                                className="form-control border-start-0"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label small fw-bold text-muted text-uppercase">Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-lock text-muted"></i></span>
                            <input
                                type="password"
                                className="form-control border-start-0"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-3 fw-bold mb-4 shadow-sm">Sign In Account</button>
                    <div className="text-center">
                        <span className="text-muted small">New to platform? </span>
                        <Link to="/signup" className="text-decoration-none fw-bold small text-primary">Create Admin Account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
