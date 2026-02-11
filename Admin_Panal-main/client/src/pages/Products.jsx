import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ name: '', category: '', price: '', stock: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await api.get('/admin/products');
        setProducts(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/admin/products/${editingId}`, formData);
            } else {
                await api.post('/admin/products', formData);
            }
            setFormData({ name: '', category: '', price: '', stock: '' });
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await api.delete(`/admin/products/${id}`);
            fetchProducts();
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0">Product Inventory</h3>
                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => { setEditingId(null); setFormData({ name: '', category: '', price: '', stock: '' }) }}>
                    <i className="fa fa-plus"></i> Add Product
                </button>
            </div>

            <div className="card border-0 mb-4 p-4">
                <h5 className="fw-bold mb-4">{editingId ? 'Update Product Details' : 'Register New Product'}</h5>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-muted text-uppercase">Product Name</label>
                        <input type="text" className="form-control" placeholder="Gaming Mouse" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-muted text-uppercase">Category</label>
                        <input type="text" className="form-control" placeholder="Electronics" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label small fw-bold text-muted text-uppercase">Price ($)</label>
                        <input type="number" className="form-control" placeholder="49.99" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label small fw-bold text-muted text-uppercase">Stock Qty</label>
                        <input type="number" className="form-control" placeholder="100" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} required />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary w-100">{editingId ? 'Update' : 'Add Stock'}</button>
                    </div>
                </form>
            </div>

            <div className="card border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">Product Infomation</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock Status</th>
                                    <th className="pe-4">Quick Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-light p-2 rounded-3 text-secondary">
                                                    <i className="fa fa-shopping-bag"></i>
                                                </div>
                                                <div className="fw-bold">{p.name}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-secondary fw-medium">{p.category}</span>
                                        </td>
                                        <td>
                                            <div className="fw-bold text-indigo" style={{ color: 'var(--primary-color)' }}>${p.price}</div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column gap-1">
                                                <div className="progress" style={{ height: '6px', width: '80px' }}>
                                                    <div className={`progress-bar ${p.stock < 10 ? 'bg-danger' : 'bg-primary'}`} style={{ width: `${Math.min(p.stock, 100)}%` }}></div>
                                                </div>
                                                <span className="small text-muted">{p.stock} in stock</span>
                                            </div>
                                        </td>
                                        <td className="pe-4 text-nowrap">
                                            <button className="btn btn-sm btn-light border-0 me-2" onClick={() => { setEditingId(p._id); setFormData({ name: p.name, category: p.category, price: p.price, stock: p.stock }) }}>
                                                <i className="fa fa-pencil text-primary"></i>
                                            </button>
                                            <button className="btn btn-sm btn-light border-0" onClick={() => handleDelete(p._id)}>
                                                <i className="fa fa-trash-o text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {products.length === 0 && <div className="p-5 text-center text-muted">No products registered.</div>}
                </div>
            </div>
        </div>
    );
};

export default Products;
