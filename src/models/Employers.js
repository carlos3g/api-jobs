const mongoose = require('mongoose');

const EmSchema = new mongoose.Schema({
  email: String,
  name: String,
  pass: String,
  search: String,
  received: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employers',
  }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Employer', EmSchema);
