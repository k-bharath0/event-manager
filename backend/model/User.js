const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    interestedEvents: [
        { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Event'
        }
      ],
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };