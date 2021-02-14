const mongoose = require('mongoose');

const UnSchema = new mongoose.Schema(
  {
    email: String,
    age: String,
    name: String,
    pass: String,
    skills: String,
    cur: String,
    send: [
      {
        type: mongoose.Schema.Types.String,
        ref: 'Employers',
      },
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Unemployer', UnSchema);
