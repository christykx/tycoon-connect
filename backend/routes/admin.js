const express = require('express');
const router = express.Router();
const userHelpers = require('../helpers/user-helpers')
const adminHelpers = require('../helpers/admin-helpers');
const { sLOT_COLLECTION } = require('../config/collections');

const { response } = require('express');




router.get('/adminlogin', function (req, res, next) {

    res.render('admin/login');

});


router.post('/adminlogin', function (req, res) {
    try {
        const { email, password } = req.body;
        console.log("Login info", req.body)
        adminHelpers.doLogin(req.body).then((response, error) => {
            if (response.status) {
                res.json({ status: true })
                // res.render('/userpage')
            } else {

                console.log("-----error---", error);
                // res.redirect('/')
            }
        })
    }
    catch (e) {
        console.log(e);
    }

});


router.post('/user-block',(req,res)=>{
   console.log(req.body,"Block details");
    adminHelpers.blockUser(req.body.userid).then((response)=>{
        if (response) {
            // console.log("##############", response.username);
            console.log("Block res##############", response);

            // let username = response.username;
            res.status(200).json(response)
            // res.render('/userpage')
          } else {
            console.log("-----error---");
            // res.redirect('/')
          }
    })
  })
  


  
router.post('/user-unblock',(req,res)=>{
    console.log(req.body,"UNblock details");
     adminHelpers.unblockUser(req.body.userid).then((response)=>{
         if (response) {
             // console.log("##############", response.username);
             console.log("Unblock res##############", response);
             
             // let username = response.username;
             res.status(200).json(response)
             // res.render('/userpage')
           } else {
             console.log("-----error---");
             // res.redirect('/')
           }
     })
   })
  
   


// router.get('/user-block/:id',(req,res)=>{
//     let userId=req.params.id;
//     userHelpers.blockUser(userId).then((response)=>{
//       res.redirect('/admin/view-user')
//     })
//   })
  
//   router.get('/user-unblock/:id',(req,res)=>{
//     let userId=req.params.id;
//     userHelpers.unblockUser(userId).then((response)=>{
//       res.redirect('/admin/view-user')
//     })
//   })



router.get('/approve/:id', function (req, res, next) {
    try {
        console.log("Appplicant info")
        console.log(req.params.id);
        userid = req.params.id
        adminHelpers.doapprove(req.params.id).then((applicants) => {
            console.log("###########", applicants);

            res.status(200).json(applicants)
        }).catch((err) => {
            console.log(err.message);
        })

    }
    catch (e) {
        console.log(e);

    }

});


router.get('/disapprove/:id', function (req, res, next) {
    try {
        console.log("Appplicant info")
        console.log(req.params.id);
        userid = req.params.id
        adminHelpers.dodisapprove(req.params.id).then((applicants) => {
            console.log("###########", applicants);

            res.status(200).json(applicants)
        }).catch((err) => {
            console.log(err.message);
        })

    }
    catch (e) {
        console.log(e);

    }
});


module.exports = router;
