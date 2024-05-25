const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// Middleware

const requireLogin = (req, res, next) => {
  if (req.session.userId || req.cookies.userId) {
    // User is logged in, proceed to the next middleware or route handler
    next();
  } else {
    // User is not logged in, redirect to login page
    res.redirect('/');
  }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'cD&2#jLm$5nQaG7t',
  resave: false,
  saveUninitialized: true
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/loginf', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var loginschema = new mongoose.Schema({
  name: String,
  email: String,
  pnum: Number,
  userid2: String,
  enterp: String,
  confirmp: String
});

var Login = mongoose.model('Login', loginschema);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/home.html', requireLogin, (req, res) => {
  // Check if user is logged in

  if (req.session.userId || req.cookies.userId) {
    res.sendFile(path.join(__dirname, '/home.html'));
  } else {
    res.redirect('/'); // Redirect to login page if not logged in
  }
});


app.get('/public/profile.html', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '/profile.html'));
});

app.get('/public/editprofile3.html', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '/editprofile3.html'));
});

app.get('/public/cart.html', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '/cart.html'));
});

app.get('/public/men.html', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '/men.html'));
});

app.get('/public/women.html', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '/women.html'));
});

app.get('/public/wishlist.html', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '/wishlist.html'));
});

app.get('/public/FAQs2.html', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '/FAQs2.html'));
});


app.post('/register', (req, res) => {
  const userData = req.body;
  console.log(userData);
  // Check if the username already exists in the database
  Login.findOne({ userid2: userData.userid2 })
    .then((userExists) => {
      if (userExists) {
        // If the username exists, send an alert message along with the registration page
        res.sendFile(path.join(__dirname, '/public/v2.html'), { alert: 'Username already exists' });
        console.log('Username already exists');
      } else {
        // If the username doesn't exist, create a new user
        Login.create(userData)
          .then((con) => {
            // Set session and cookie after successful registration
            req.session.userId = userData.userid2; // Store userId in session
            res.cookie('userId', userData.userid2); // Set userId cookie
            res.sendFile(path.join(__dirname, '/public/v2.html'));
            console.log('Registered successfully');
          })
          .catch((err) => {
            console.log('Error: ', err);
            res.status(500).send('Internal Server Error');
          });
      }
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/login', (req, res) => {
  var userid = req.body.userid;
  var password = req.body.password;

  Login.findOne({ userid2: userid })
    .then((userExists) => {
      if (userExists) {
        // If the username exists, check the password
        Login.findOne({ userid2: userid, enterp: password })
          .then((loginResult) => {
            if (loginResult) {
              // Set session and cookie after successful login
              req.session.userId = userid; // Store userId in session
              res.cookie('userId', userid); // Set userId cookie
              res.sendFile(path.join(__dirname, '/home.html'));
            } else {
              // If password is incorrect, send an alert message on the login page itself
              res.sendFile(path.join(__dirname, '/public/v2.html'), { alert: 'Wrong password' });
            }
          })
          .catch((err) => {
            console.log('Error: ', err);
            res.status(500).send('Internal Server Error');
          });
      } else {
        // If the username doesn't exist, send an alert message on the login page itself
        res.sendFile(path.join(__dirname, '/public/v2.html'), { alert: 'User not found' });
      }
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.status(500).send('Internal Server Error');
    });
});

// Start server
app.listen(3000, () => {
  console.log(`Server is running on port 3000..`);
});

app.get('/logout', (req, res) => {
  // Destroy session on the server
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Clear userId cookie
      res.clearCookie('userId');
      res.redirect('/v2.html'); // Redirect to the home page or login page
    }
  });
});

app.post('/updateProfile', (req, res) => {
  const userId = req.session.userId || req.cookies.userId;
  const { oldPassword, newPassword } = req.body;

  if (!userId) {
    // User not logged in
    return res.status(401).send('Unauthorized');
  }

  Login.findOne({ userid2: userId, enterp: oldPassword })
    .then((user) => {
      if (!user) {
        // Old password does not match
        return res.status(400).send('Old password is incorrect');
      }

      // Update password
      user.enterp = newPassword;
      return user.save();
    })
    .then(() => {
      res.send('Password updated successfully');
    })
    .catch((err) => {
      console.error('Error updating password:', err);
      res.status(500).send('Internal Server Error');
    });
});


// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});