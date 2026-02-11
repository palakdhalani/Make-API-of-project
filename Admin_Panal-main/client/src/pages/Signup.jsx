import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const isSuccess = await signup(email, password);
            if (isSuccess) {
                setSuccess('Account created! Navigating to login...');
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card p-5">
                <div className="text-center mb-5">
                    <div className="bg-primary bg-opacity-10 text-primary d-inline-flex p-3 rounded-circle mb-4">
                        <i className="fa fa-user-plus fs-1"></i>
                    </div>
                    <h2 className="fw-bold mb-1">Create Account</h2>
                    <p className="text-muted">Join the professional admin network</p>
                </div>

                {error && <div className="alert alert-danger py-2 small mb-4">{error}</div>}
                {success && <div className="alert alert-success py-2 small mb-4">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted text-uppercase">Admin Email</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-envelope-o text-muted"></i></span>
                            <input
                                type="email"
                                className="form-control border-start-0"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="new.admin@admin.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label small fw-bold text-muted text-uppercase">Secure Password</label>
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
                    <button type="submit" className="btn btn-primary w-100 py-3 fw-bold mb-4 shadow-sm">Register Admin</button>
                    <div className="text-center">
                        <span className="text-muted small">Access existing profile? </span>
                        <Link to="/login" className="text-decoration-none fw-bold small text-primary">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
