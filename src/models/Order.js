const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [{ name: String, price: Number, quantity: Number }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'canceled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model('Order', orderSchema);