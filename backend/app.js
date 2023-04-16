const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');


const app = express();

const cors = require('cors')
const db = require('./config/connection')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use(express.static(path.join(__dirname, 'public', './frontend/build')));
// app.set('*',path.join(__dirname,'./frontend/build/index.html'))
// module.exports = app;


const server = app.listen(3001, () => {
  console.log("Server Started");
})


const io = require("socket.io")(server, {
  cors: {
    origin: "https://main.d1m5dwj4swb035.amplifyapp.com",
    methods: "*",
    credentials: true,
  },
});

let users = [];
let peerusers = [];

const addUser = (userid, socketid) => {
    !users.some((user) => user.userid === userid) &&
        users.push({ userid, socketid })
}


const addVideoUser = (userid, peerid, socketid) => {
    if (peerusers.some((user) => user.userid === userid)) {
        peerusers = peerusers.filter(user => user.userid !== userid);
        peerusers.push({ userid, peerid, socketid })
    } else {
        peerusers.push({ userid, peerid, socketid })
    }
    console.log(userid, "userid");
    console.log(peerid, "peer id");
    console.log(socketid, "socket id");
}

    // console.log(user?.userid,"user.userid");
const removeUser = (socketid) => {  
    users = users.filter(user => user.socketid !== socketid)
}

const getUser = (userid) => {
    console.log(userid, "useridd");
    console.log(users, "Display users array");
    // console.log(user?.userid,"user.userid");

    return users?.find((user) => user?.userid === userid)
}

const getaddVideoUser = (userid, peerid) => {
    console.log(userid, "useridd");
    console.log(peerid, "useridd");
    console.log(peerusers, "Display users array");
    // console.log(user?.userid,"user.userid");
    return peerusers?.find((user) => user?.userid === userid)
}


io.on('connection', (socket) => {
    //when connects
    console.log('a user connected');

    socket.on("addUser", id => {
        addUser(id, socket.id)
        io.emit("getUsers", users)
    })


    socket?.on("addVideoUser", ({ userid, peerid }) => {
        addVideoUser(userid, peerid, socket.id)
        io.emit("getaddVideoUsers", peerusers)
    })


    //send and get message

    socket?.on("sendmsg", ({ senderid, receiverid, text }) => {

        const user = getUser(receiverid);
        console.log(receiverid, "receiverid");
        console.log(senderid, "senderid");
        console.log(text, "chat reached socket");
        console.log(user?.socketid, "socket id");
        io.to(user?.socketid)?.emit("getmsg", {
            senderid,
            text
        })

    })

    //send and get notifications

    socket?.on("sendNotification", ({ senderid, senderName, receiverid, type }) => {
        console.log(senderid);
        console.log(senderName);
        console.log(receiverid);
        console.log(type);

        const receiver = getUser(receiverid);
        io.to(receiver?.socketid)?.emit("getNotification", {
            senderid,
            senderName,
            receiverid,
            type
        })

    })


    socket?.on("sendNotificationCount", ({ receiverid, count }) => {
        console.log(count);
        console.log(receiverid);

        const receiver = getUser(receiverid);
        io.to(receiver?.socketid)?.emit("getNotificationCount", {
            count
        })

    })


    socket.on("disconnect", () => {
        //when disconnects
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users)

    })
});



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);

  next();
});

app.use(
  cors({
    origin: ["https://main.d1m5dwj4swb035.amplifyapp.com"],
    methods: "GET,PUT,HEAD,PATCH,POST,DELETE",
    credentials: true
  })
);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);


db.connect((err) => {
  if (err)
    console.log("Connection Error" + err)
  else
    console.log("Database Connected")
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// app.listen(3001,()=>{
//   console.log("Server Started");
// })
