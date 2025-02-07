const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const { default: mongoose } = require("mongoose")
const app=express()
const auth = require('./routes/auth');
const {Content}= require('./model/Data')
const {User}= require('./model/User')
const port= process.env.PORT|| 4000;
require("dotenv").config();
app.use(bodyparser.urlencoded({
    extended:true
}))

app.use(bodyparser.json())

app.use(cors({
    origin: '*'
}));

mongoose.connect(process.env["MONGODB_URL"])
    .then(()=>{
        console.log("Mongodb connected successfully !!")
    })
    .catch((err)=>{ 
        console.log(err)
    })

//auth api's
 app.use('/api/auth', auth);

app.get("/",(req,res)=>{
    res.send("API IS WORKING")
})

app.get("/events",async(req,res)=>{
    await Content.find()
        .then(found=>res.json(found))
})

app.post("/store",async(req,res)=>{
     let {title,category,date,time,des,location,userId}=req.body
     console.log(req.body)
    const newData = new Content({
        title,category,date,time,des,location,userId
      });
     
     await newData.save()
     return res.json("Event posted succesfully");
})

app.post("/interest",async(req,res)=>{
    const { userId, eventId } = req.body;
    console.log(userId,eventId);
    try {
        // Find the user
        const user = await User.findById(userId);
        console.log(user);
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        // Find the event
        const event = await Content.findById(eventId);
        console.log(event);
        if (!event) return res.status(404).json({ message: 'Event not found' });
    
        // Check if user is already interested in this event
        if (user.interestedEvents.includes(eventId)) {
          return res.status(400).json({ message: 'User already interested in this event' });
        }
    
        // Add the event to the user's interested events list
        user.interestedEvents.push(eventId);
    
        // Save the user
        await user.save();
    
        // Add the user to the event's interested users list
        event.interestedUsers.push(userId);
    
        // Save the event
        await event.save();
    
        res.status(200).json({ message: 'Event added to interested events' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

app.delete('/:id', async(req, res) => {
    await Content.findByIdAndDelete(req.params.id);
    return res.status(200).json("deleted successful")
});


app.listen(port,()=>console.log("server started successfully"))
