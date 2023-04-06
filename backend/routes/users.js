const express = require('express');
const router = express.Router();


const verify = require('../middleware/verifyToken')
const userHelpers = require('../helpers/user-helpers')
const { USER_COLLECTION } = require('../config/collections');
const jwt = require("jsonwebtoken");
const { db } = require('mongodb');

const objectId = require('mongodb').ObjectId

const controller = require('../controllers/userControllers')

const maxAge = 3 * 24 * 60 * 60;

const multer = require('multer');
// const { generateOTP, mailTransport, generateEmailTemplate } = require('../utils/mail');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
})


const upload = multer({ storage: storage })

console.log(upload, "UUUUUPPPPPPPPLOOOOOOADDDDDDDD");


router.post('/signup', controller.postSignup);


router.post('/updateVerify', controller.updateVerify)


router.get('/login/:id', controller.getlogin);


router.post('/login', controller.postLogin);


router.post('/post', verify, upload.single("postpic"), controller.postPost);


router.post('/profile', verify, upload.single("profile"), controller.postProfile);


router.get('/getfollowingpost/:id', verify, controller.getfollowingpost);


router.get('/getfollowingslist/:id', verify, controller.getfollowingslist);


router.get('/getfollowerslist/:id', verify, controller.getfollowerslist);


router.get('/getpost/:id', verify, controller.getPost);


router.get('/getsavedpost/:id', verify, controller.getsavedpost);


router.get('/getlikedpost/:id', verify, controller.getlikedpost);


router.get('/getprofile/:id', verify, controller.getprofile);


router.get('/getusername/:id', verify, controller.getUsername);


router.get('/getuseremail/:id', verify, controller.getUseremail);


router.get('/getallusers', verify, controller.getallusers);


router.get('/getsuggestionusers', verify, controller.getsuggestionusers);


router.get('/getmyaccount/:id', verify, controller.getmyaccount);


router.get('/cmtuser/:cmtuserid', verify, controller.cmtuser);


router.get('/SingleUserDetails/:id', verify, controller.SingleUserDetails);


router.post('/following', verify, controller.following);


router.post('/unfollow', verify, controller.unfollow);


router.post('/savepost', verify, controller.savepost);


router.post('/unsavepost', verify, controller.unsavepost);


router.post('/likepost', verify, controller.likepost);


router.post('/unlikepost', verify, controller.unlikepost);


router.post('/reportpost', verify, controller.reportpost);


router.get('/likepost/:id', controller.likepost);


router.post('/deletepost', controller.deletepost);


router.post('/editpost', controller.editpost);


router.post('/editcomment', controller.editcomment);


router.post('/deletecmt', controller.deletecmt);


router.post('/conversation', verify, controller.conversation);


router.get('/conversationget/:id', verify, controller.conversationget);


router.get('/currentconv/:otheruserid', verify, controller.currentconv);


router.get('/getreceivername/:postuserid', verify, controller.getreceivername);


router.get('/getsendername/:sendername', verify, controller.getsendername);


router.post('/message', verify, controller.message);


router.get('/currentmessage/:msgid', controller.currentmessage);


router.get('/messageget/:conversationid', controller.messageget);


router.get('/getmyfollowing/:id', controller.getmyfollowing);


router.post('/addcomment', controller.addcomment);


router.get('/getcomment', controller.getcomment);


router.post('/updateprofile', verify, controller.updateprofile);


router.post('/changepswd', verify, controller.changepswd);


router.post('/notificationspost', verify, controller.notificationspost);


router.get('/getnotifications', verify, controller.getnotifications);


router.post('/deletenotification', verify, controller.deletenotification);


router.get('/getnotificationlength/:id', verify, controller.getnotificationlength);


router.get('/getblockdetails/:email', controller.getblockdetails);


router.get('/getreports', controller.getreports);


router.get('/getallposts', controller.getallposts);


router.get('/getreportid/:reportid', controller.getreportid);



module.exports = router;
