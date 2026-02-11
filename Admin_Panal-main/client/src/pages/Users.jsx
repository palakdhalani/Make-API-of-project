import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await api.get('/admin/users');
        setUsers(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/admin/users/${editingId}`, formData);
            } else {
                await api.post('/admin/users', formData);
            }
            setFormData({ name: '', email: '', role: 'User' });
            setEditingId(null);
            fetchUsers();
        } catch (err) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await api.delete(`/admin/users/${id}`);
            fetchUsers();
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0">User Management</h3>
                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => { setEditingId(null); setFormData({ name: '', email: '', role: 'User' }) }}>
                    <i className="fa fa-plus"></i> Add User
                </button>
            </div>

            <div className="card border-0 mb-4 p-4">
                <h5 className="fw-bold mb-4">{editingId ? 'Edit User' : 'Add New User'}</h5>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label small fw-bold text-muted text-uppercase">Full Name</label>
                        <input type="text" className="form-control" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                        <input type="email" className="form-control" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label small fw-bold text-muted text-uppercase">Role</label>
                        <select className="form-select border-radius-0.75" style={{ borderRadius: '0.75rem' }} value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                        </select>
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary w-100">{editingId ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>

            <div className="card border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">User</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th className="pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '38px', height: '38px' }}>
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="fw-bold">{u.name}</div>
                                                    <div className="text-muted small">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-light text-dark px-3 py-2 rounded-pill font-weight-500">{u.role}</span>
                                        </td>
                                        <td>
                                            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">Active</span>
                                        </td>
                                        <td className="pe-4 text-nowrap">
                                            <button className="btn btn-sm btn-light border-0 me-2" onClick={() => { setEditingId(u._id); setFormData({ name: u.name, email: u.email, role: u.role }) }}>
                                                <i className="fa fa-edit text-primary"></i>
                                            </button>
                                            <button className="btn btn-sm btn-light border-0" onClick={() => handleDelete(u._id)}>
                                                <i className="fa fa-trash text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {users.length === 0 && <div className="p-5 text-center text-muted">No users found.</div>}
                </div>
            </div>
        </div>
    );
};

export default Users;
