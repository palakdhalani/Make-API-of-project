const User = require('../models/User');
const Product = require('../models/Product');

exports.getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        const stats = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            usersData: [12, 19, 3, 5, 2, 3],
            productsData: [2, 3, 20, 5, 1, 4]
        };

        res.json({
            totalUsers,
            totalProducts,
            stats
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
