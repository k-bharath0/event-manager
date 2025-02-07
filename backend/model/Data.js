const mongoose = require ("mongoose")

const contentSchema=new mongoose.Schema({
    title:{type:String},
    category:{type:String},
    name:{type:String},
    date:{type:String},
    time:{type:String},
    des:{type:String},
    location:{type:String},
    userId:{type:String},
    interestedUsers: [
        { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User' 
        }
      ],
}, {
    timestamps: true,})

const Content = mongoose.model("events",contentSchema)

module.exports = { Content }
