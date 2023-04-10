// var express = require('express');
// var router = express.Router();
require('dotenv').config()
const verify = require('../middleware/verifyToken')
const userHelpers = require('../helpers/user-helpers')
const { USER_COLLECTION } = require('../config/collections');
const { POST_COLLECTION } = require('../config/collections');

const jwt = require("jsonwebtoken");
const { db } = require('mongodb');


const objectId = require('mongodb').ObjectId

const controller = require('../controllers/userControllers')

const maxAge = 3 * 24 * 60 * 60;

const multer = require('multer');

// const { generateOTP, mailTransport, generateEmailTemplate } = require('../utils/mail');

const { getprofile } = require('../helpers/user-helpers');
// const {v4:uuidv4}=require('uuid')
// const path=require('path')


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


module.exports = {

  postSignup: async (req, res) => {
    const { businessName, username, phone, email, password } = req.body;
    console.log(req.body, "Bodyyyyy");
    try {
      userHelpers.doSignup(req.body)
        .then((response) => {
          if (response._id) {
            userid = response._id
            console.log(userid, "MYY USER IDDDD");
            const accessToken = jwt.sign(
              {
                id: userid,
                email: response.email,
              },
              process.env.JWT,
              { expiresIn: "7d" });

            // const OTP = generateOTP();
            // console.log(OTP, "otpppppppppppppppppppppppp");
            // console.log(response.email, "Emailllll");
            // mailTransport().sendMail({
            //   from: 'tycoonconnect@gmail.com',
            //   to: response.email,
            //   subject: "verify your email account",
            //   // html: `<h1>${OTP}</h1>`
            //   html: generateEmailTemplate(OTP)
            // })

        //     res.cookie("accessToken", accessToken,
        //     { withCredentials: true, secure: false, httpOnly: false }).status(200).json({ userid, accessToken, OTP })
        // }
            res.cookie("accessToken", accessToken,
              { withCredentials: true, secure: false, httpOnly: false }).status(200).json({ userid, accessToken })
          }
        }).catch((err) => {
          res.status(500).json(err)
        })

    }
    catch (e) {
      console.log(e);
    }

  },


  updateprofile: async (req, res) => {
    console.log(req.body, "Bodyyyyy of updating profile dataaaaa");
    console.log(req.user,"Now user is hereeeeee");

    try {
      userHelpers.doupdateprofile(req.user,req.body)
        .then((response) => {
         
            res.status(200).json(response)
          
        }).catch((err) => {
          res.status(500).json(err)
        })

    }
    catch (e) {
      console.log(e);
    }

  },


  editpost: async (req, res) => {
    console.log(req.body, "Bodyyyyy of updating post dataaaaa");
    console.log(req.user,"Now user is hereeeeee");

    try {
      userHelpers.doeditpost(req.body)
        .then((response) => {
         
            res.status(200).json(response)
          
        }).catch((err) => {
          res.status(500).json(err)
        })

    }
    catch (e) {
      console.log(e);
    }

  },


  editcomment: async (req, res) => {
    console.log(req.body, "Bodyyyyy of updating comment dataaaaa");

    try {
      userHelpers.doeditcomment(req.body)
        .then((response) => {
         
            res.status(200).json(response)
          
        }).catch((err) => {
          res.status(500).json(err)
        })

    }
    catch (e) {
      console.log(e);
    }

  },


  changepswd: async (req, res) => {
    console.log(req.body, "Bodyyyyy of updating password");
    console.log(req.user,"Now user is hereeeeee");

    try {
      userHelpers.dochangepswd(req.user,req.body)
        .then((response) => {
         
            res.status(200).json(response)
          
        }).catch((err) => {
          res.status(500).json(err)
        })

    }
    catch (e) {
      console.log(e);
    }

  },



  updateVerify: async (req, res) => {
    try {
      console.log("reached update");
      console.log(req.body.userid);
      userHelpers.doupdateVerify(req.body.userid)
        .then((response) => {
          res.status(200).json(response)
        })
    } catch (err) {
      console.log(err);
    }

  },

  getlogin: function (req, res, next) {

    console.log("Login informationnnn", req.params.id)
    userHelpers.getLoginDetails(req.params.id).then((response) => {
      console.log(response, "Loginnn response");
      res.json(response)
      // console.log(response.user);
      // userid = response.user._id
      // console.log(userid, "$$$$$$$$$$$");

    })

  },

  postLogin: function (req, res) {
    try {

      const { email, password } = req.body;
      console.log("Login info", req.body)
      userHelpers.doLogin(req.body).then((response) => {

        if(response.user.block){
         return res.json({status:false,message:'Admin Blocked You'})
        }                          

        if (response.status) {
          console.log(response.user);
          userid = response.user._id
          

          console.log(userid, "$$$$$$$$$$$");
          const accessToken = jwt.sign(
            {
              id: userid,
              email: response.email
            },
            process.env.JWT,
            { expiresIn: "7d" });

          
          // res.cookie("accessToken", accessToken,
          //   { withCredentials: true, httpOnly: true, secure: false })
            res.status(200).json({ userid, accessToken })
          console.log(req.cookies, 'cookies is here');

        } else {
          console.log("-----error---");
        }
      }).catch((err) => {
        console.log(" loginn errrrrrrrrrrrrrrrrrrrr", err);
        // res.status(500).json(err)
      })
    }
    catch (e) {
      console.log(e);
    }

  },

  postPost: function (req, res) {
    // console.log("hiiiiiiiiiiiiiiiiiii");
    // console.log(req.file, "REQ FILEEEEEEEEEE");
    // console.log(req.file.filename)
    // console.log(req.body)
    try {

      // let postPicture = (req.file) ? req.file.filename : null;
      // console.log(postPicture, "::::::::::::::::::::::::::::::::::");
      const {
        caption: caption,
        location: location,
        description: description,
        // postpic:(req.file)?req.file.filename:null
      } = req.body;
      console.log("Post details", req.body)
      // console.log("Post", req.body.postpic)
      // console.log("Post", req.file.originalname)


      // console.log(postpic,"$$$$$$$$$$$");

      userHelpers.doAddPost(req.body).then((response) => {
        if (response) {
          console.log("############## post response", response);
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  postProfile: function (req, res) {
    // console.log("Dppppppppppppppppppp");
    // console.log(req.file, "REQ FILEEEEEEEEEE");
    // console.log(req.file.filename)
    // console.log(req.body)
    try {

      // let profilePicture = (req.file) ? req.file.filename : null;
      // console.log(profilePicture, "::::::::::::::::::::::::::::::::::");
      const {
        caption: caption,
        location: location,
        description: description,
        // postpic:(req.file)?req.file.filename:null
      } = req.body;
      console.log("Profile details", req.body)
      // console.log("profileprofile", req.body.profile)
      // console.log("Post", req.file.originalname)


      // console.log(postpic,"$$$$$$$$$$$");

      userHelpers.doAddProfile(req.body).then((response) => {
        if (response) {
          console.log("##############", response);
          res.json({ status: true })
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },

  getPost: function (req, res) {

    try {

      const { userid } = req.body
      console.log(req.cookies.accessToken, 'hai all');

      console.log(req.params.id, "REQ body contains post id");
      userHelpers.getpostdetails(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          // console.log("##############", response.PostData);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },

  getfollowingpost: function (req, res) {

    try {


      userHelpers.getfollowingpostdetails(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          // console.log("##############", response.PostData);
          // let username = response.username;

          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getfollowingslist: function (req, res) {

    try {
      userHelpers.getfollowingslistdetails(req.params.id).then((response) => {
        if (response) {
          res.status(200).json(response)
        } else {
          console.log("-----error---");
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getfollowerslist: function (req, res) {

    try {
      userHelpers.getfollowerslistdetails(req.params.id).then((response) => {
        if (response) {
          res.status(200).json(response)
        } else {
          console.log("-----error---");
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getsavedpost: function (req, res) {
    console.log("hiiiiiiiiiiiiiiiiiii");
    try {

      const { userid } = req.body

      console.log(req.params.id, "REQ body contains post id");
      userHelpers.getsavedpostdetails(req.params.id).then((response) => {
        if (response) {
          console.log("##############", response);
          // console.log("##############", response.PostData);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getlikedpost: function (req, res) {
    console.log("hiiiiiiiiiiiiiiiiiii");
    try {

      const { userid } = req.body

      console.log(req.params.id, "REQ body contains post id");
      userHelpers.getlikedpostdetails(req.params.id).then((response) => {
        if (response) {
          console.log("##############", response);
          // console.log("##############", response.PostData);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getprofile: function (req, res) {
    console.log("hiiiiiiiiiiiiiiiiiii");
    try {

      const { userid } = req.body

      console.log(req.params.id, "REQ body contains user id");
      userHelpers.getprofile(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          // console.log("##############", response.PostData);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getotherprofile: function (req, res) {
    console.log("hiiiiiiiiiiiiiiiiiii");
    try {

      const { userid } = req.body

      console.log(req.params.id, "REQ body contains user id");
      userHelpers.getprofile(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          // console.log("##############", response.PostData);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },

  getUsername: function (req, res) {
    console.log("getuser nameee");
    console.log(req.cookies, 'cookies is here in get post page');

    try {

      const { userid } = req.body

      console.log(req.params.id, "REQ body contains user id");
      userHelpers.findusername(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          // console.log("##############", response.PostData);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },

  getUseremail: function (req, res) {
    console.log("emailllllll ");
    console.log(req.cookies, 'cookies is here in get post page');

    try {

      const { userid } = req.body
      console.log(req.cookies.accessToken, 'hai all');

      console.log(req.params.id, "REQ body contains user id");
      userHelpers.finduseremail(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },

  getallusers: function (req, res) {
    console.log("Userssssssssssssss");
    try {

      const { userid } = req.body

      userHelpers.findusernames().then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },

  getsuggestionusers: function (req, res) {
    console.log("get suggestion Userssssssssssssss");
    try {

      const { userid } = req.body

      userHelpers.findsuggestionusers().then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getmyaccount: function (req, res) {
    console.log("Userssssssssssssss");
    try {

      const { userid } = req.body

      userHelpers.findmyaccount(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },



  cmtuser: function (req, res) {
    try {

      const { userid } = req.body

      userHelpers.findmyaccount(req.params.cmtuserid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },



  SingleUserDetails: function (req, res) {

    console.log("User detailsssssssssss");
    try {

      const { userid } = req.body

      userHelpers.findsingleuser(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  following: function (req, res) {

    console.log("Your following update", req.body);
    try {

      const { userid } = req.body

      userHelpers.updatefollowing(req.body.userid, req.body.otheruserid, req.body).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  unfollow: function (req, res) {

    console.log("Your following update", req.body);
    try {

      const { userid } = req.body

      userHelpers.dounfollow(req.body.userid, req.body.otheruserid, req.body).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },



  savepost: function (req, res) {

    console.log("Your saved post", req.body);
    try {

      const { userid } = req.body

      userHelpers.dosavepost(req.body.postid, req.body.userid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  unsavepost: function (req, res) {

    console.log("Your unnnnsaved post", req.body);
    try {

      const { userid } = req.body

      userHelpers.dounsavepost(req.body.postid, req.body.userid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  likepost: function (req, res) {

    console.log("Your liked post", req.body);
    try {

      const { userid } = req.body

      userHelpers.dolikepost(req.body.postid, req.body.userid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },



  unlikepost: function (req, res) {

    console.log("Your liked post", req.body);
    try {

      const { userid } = req.body

      userHelpers.dounlikepost(req.body.postid, req.body.userid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  deletepost: function (req, res) {

    try {

      const { userid } = req.body

      userHelpers.dodeletepost(req.body.postid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  deletecmt: function (req, res) {

    try {

      const { userid } = req.body

      userHelpers.dodeletecmt(req.body.cmtid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  reportpost: function (req, res) {

    console.log("Your reported post", req.body);
    console.log(req.user,"Now user is hereeeeee");

    try {

      const { userid } = req.body

      userHelpers.doreport(req.body.postid,req.body.username, req.body.userid,req.body.text).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },



  conversation : function (req, res) {

    console.log("Your conversation details", req.body);
    try {

      const { userid } = req.body

      userHelpers.doconversation(req.body.userid, req.body.otheruserid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },



  conversationget: function (req, res) {

    console.log("Your get conservationnnn ", req.params.id);
    console.log(req.user,"Now user is hereeeeee");

    try {

      const { userid } = req.body

      userHelpers.getconversation(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  
  currentconv: function (req, res) {

    console.log("Your get conservationnnn ", req.params.otheruserid);
    console.log(req.user,"Now user is hereeeeee");

    try {

      const { userid } = req.body


      userHelpers.getcurrentconv(req.user,req.params.otheruserid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },

  

  message: function (req, res) {

    console.log("Your Messagesssss", req.body);
    try {

      //req.body includes conversationid,senderid,text
      userHelpers.domessage(req.body).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  currentmessage: function (req, res) {

    console.log("Your message gettt", req.params.msgid);
    try {

      const { userid } = req.body
      //req.body includes conversationid,senderid,text
      userHelpers.getcurrentmessage(req.params.msgid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response); 
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  messageget: function (req, res) {

    console.log("Your message gettt", req.params.conversationid);
    try {

      const { userid } = req.body
      //req.body includes conversationid,senderid,text
      userHelpers.getmessage(req.params.conversationid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getreceivername: function (req, res) {

    console.log("Your receivername gettt", req.params.postuserid);
    try {

      const { userid } = req.body
      //req.body includes conversationid,senderid,text
      userHelpers.dogetreceivername(req.params.postuserid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },



  

  getsendername: function (req, res) {

    console.log("Your sender name gettt", req.params.sendername);
    try {

      const { userid } = req.body
      //req.body includes conversationid,senderid,text
      userHelpers.dogetsendername(req.params.sendername).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },
  
  getmyfollowing: function (req, res) {

    console.log("Your liked post", req.body);
    try {

      const { userid } = req.body
      //req.body includes conversationid,senderid,text
      userHelpers.getfollowingid(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },



  addcomment: function (req, res) {

    console.log("Your Comment detailsss", req.body);
    try {

      //req.body includes conversationid,senderid,text
      userHelpers.addcomment(req.body).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("Comment##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getcomment: function (req, res) {

    console.log("comments gettt");
    try {

      const { userid } = req.body
      //req.body includes conversationid,senderid,text
      userHelpers.getcomment().then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  notificationspost :function (req, res) {

    console.log("Your notification detailsss", req.body);

    try {

      //req.body includes conversationid,senderid,text
      userHelpers.addnotification(req.body).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("Notification##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getnotifications: function (req, res) {

    console.log("notification gettt");
    try {

      userHelpers.findnotification().then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },

  deletenotification :function (req, res) {

    console.log("Your notification deletion", req.body);

    try {

      //req.body includes conversationid,senderid,text
      userHelpers.removenotification(req.body.userid).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("Notification deletion##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  
  getnotificationlength: function (req, res) {

    console.log(req.params.id,"notification length route id");
    try {

      const { userid } = req.body
      //req.body includes conversationid,senderid,text
      userHelpers.getntfnlength(req.params.id).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("length##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getblockdetails: function (req, res) {

    console.log(req.params.email,"blocked email");
    try {

      //req.body includes conversationid,senderid,text
      userHelpers.findblockdata(req.params.email).then((response) => {
        if (response) {
          // console.log("##############", response.username);
          if(response.block ===true){
            // console.log("block gett##############", response);
            res.json({"blockmsg":"Admin blocked you",status:true})

          }else{
            console.log("block gett##############", response);

            res.status(200).json(response)

          }
          // let username = response.username;
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  
  getreports: function (req, res) {

    console.log("reports gettt");
    try {

      userHelpers.findreports().then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("reportsss##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getallposts: function (req, res) {

    try {

      userHelpers.findallposts().then((response) => {
        if (response) {
          // console.log("##############", response.username);
          console.log("reportsss##############", response);
          // let username = response.username;
          res.status(200).json(response)
          // res.render('/userpage')
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },


  getreportid: function (req, res) {

    console.log(req.params.reportid,"report id");
    try {

      //req.body includes conversationid,senderid,text
      userHelpers.findreportid(req.params.reportid).then((response) => {
        if (response) {
          console.log("reportsss##############", response);
            res.status(200).json(response)
        } else {
          console.log("-----error---");
          // res.redirect('/')
        }
      }).catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrr", err);
        res.status(500).json(err)
      })

    }
    catch (e) {
      console.log(e);
    }

  },



}

