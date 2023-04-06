const db = require('../config/connection')
const collection = require('../config/collections')
const bcrypt = require('bcrypt')
//const Promise=require('promise')
const { response } = require('express')
const objectId = require('mongodb').ObjectId
 

module.exports = {
    doSignup: (userData) => {
        try {
            console.log(userData);
            let findemail = userData.email
            return new Promise(async (resolve, reject) => {
                let userCheck = await db.get().collection(collection.USER_COLLECTION)?.findOne({ email: findemail })
                userData.password = await bcrypt.hash(userData.password, 10)
                if (userCheck) {
                    let err = 'Email id already exist'
                    reject(err)  
                }
                else {
                    db.get().collection(collection.USER_COLLECTION)?.insertOne(userData).then((data) => {
                        console.log("----userdat---", userData);
                        console.log("$$$$$$$$$$$$$$$", userData._id);
                        // db.get().collection(collection.USER_COLLECTION).updateOne({ email: findemail }, { $set: { "isVerified": false } })

                        resolve(userData, { userid: userData._id })
                    }).catch((err) => {
                        console.log("do signup catch", err);
                        reject(err)
                    })
                }
            })
        } catch (e) {
            console.log(e);
        }


    },


    doupdateprofile: (userid, userData) => {
        console.log(userid, "USerid reached backend");
        console.log(userData, "userdata for updating reached backend");

        try {
            console.log(userData, "userdata for updating reached backend");
            return new Promise(async (resolve, reject) => {

                if (userData.updatebusinessName !== '') {
                    let ubn = await db.get().collection(collection.USER_COLLECTION)?.findOneAndUpdate({ _id: objectId(userid) }, { $set: { businessName: userData.updatebusinessName } })
                    resolve(ubn)
                }

                if (userData.updateusername !== '') {
                    let un = await db.get().collection(collection.USER_COLLECTION)?.findOneAndUpdate({ _id: objectId(userid) }, { $set: { username: userData.updateusername } })
                    resolve(un)
                }

                if (userData.updatephone !== '') {
                    let p = await db.get().collection(collection.USER_COLLECTION)?.findOneAndUpdate({ _id: objectId(userid) }, { $set: { phone: userData.updatephone } })
                    resolve(p)
                }

            })
        } catch (e) {
            console.log(e);
        }


    },


    dochangepswd: (userid, pswdData) => {
        console.log(userid, "USerid reached backend");
        console.log(pswdData, "userdata for updating reached backend");

        try {
            return new Promise(async (resolve, reject) => {

                if ((pswdData.password == pswdData.cpassword) && (pswdData.password !== '') && (pswdData.cpassword !== '')) {

                    pswdData.password = await bcrypt.hash(pswdData.password, 10)

                    let upswd = await db.get().collection(collection.USER_COLLECTION)?.findOneAndUpdate({ _id: objectId(userid) }, { $set: { password: pswdData.password, cpassword: pswdData.cpassword } })
                    resolve(upswd)
                }


            })
        } catch (e) {
            console.log(e);
        }


    },


    getLoginDetails: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userid, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let userdetails = await db.get().collection(collection.USER_COLLECTION)?.findOne({ _id: objectId(userid) })
                console.log(userdetails, ">>>>>>>>>>>>>>>");
                resolve(userdetails)
            })
        }
        catch (e) {
            console.log(e);
        }


    },


    verifyupdate: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userid, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let userdetails = await db.get().collection(collection.USER_COLLECTION)?.findOneAndUpdate({ _id: objectId(userid) }, { $set: { "verified": true } })
                console.log(userdetails, ">>>>>>>>>>>>>>>");
                resolve(userdetails)
            })
        }
        catch (e) {
            console.log(e);
        }


    },



    doupdateVerify: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userid, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let VerifyUpdate = await db.get().collection(collection.USER_COLLECTION)?.findOneAndUpdate({ _id: objectId(userid) }, { $set: { "isVerified": true } })
                console.log(VerifyUpdate, ">>>>>>>>>>>>>>>");
                resolve(VerifyUpdate)
            })
        }
        catch (e) {
            console.log(e);
        }


    },

    doLogin: (userData) => {
        try {
            return new Promise(async (resolve, reject) => {
                // let loginStatus = false
                let response = {}
                let user = await db.get().collection(collection.USER_COLLECTION)?.findOne({ email: userData.email })
                // let verifycheck = await db.get().collection(collection.USER_COLLECTION).find({ $and:[{email: userData.email},{isVerified:true}] })
                console.log("Checking verified or unverifiedddddddddddddddd ");
                // if ((user) && (user.isVerified == true)) {
                if (user) {

                    bcrypt.compare(userData.password, user.password).then((status) => {
                        if (status) {
                            console.log("Login success")
                            console.log(user._id);
                            response.user = user
                            response.status = true
                            // db.get().collection(collection.USER_COLLECTION).updateOne({_id:user._id},{$push:{isSubmit:false}})
                            // db.get().collection(collection.USER_COLLECTION).findOneAndUpdate(
                            //     { _id: objectId(user._id) },
                            //     { $set: { isSubmitted: false } }
                            // )
                            console.log("Verifiedddddddddddddddddddddddddddddddddddd ");


                            resolve(response)
                        } else {
                            let err = "Please check your Password"
                            console.log("login fail")
                            console.log("Please check your Password");
                            // resolve({ status: false })
                            reject(err)
                        }
                    }).catch((err) => {
                        console.log(err);
                        reject(err);
                    })
                }
                //  else if(user.isVerified == false) {
                //     console.log("Email not Verifiedddddddddddddddd ::::::::::::::::::::::");
                // } 
                else {
                    let err2 = "Please check your Email id"
                    console.log("Please check your Email id or check it is verified");
                    // reject(err2)
                    // console.log("Login failed")
                }
            })
            //.catch((err) => {
            //     console.log(err);
            //     return err;
            // })
        }
        catch (e) {
            console.log(e);
        }

    },

    doAddPost: (PostData) => {

        try {
            console.log("33333333333333", PostData);
            let userid = PostData.userid
            console.log(userid);
            return new Promise(async (resolve, reject) => {
                console.log(userid, "IDDDDDDD");
                let userCheck = await db.get().collection(collection.USER_COLLECTION)?.findOne({ _id: objectId(userid) })
                if (userCheck) {

                    db.get().collection(collection.POST_COLLECTION)?.insertOne(PostData)
                    resolve(PostData)
                }
                else {
                    let err = 'Email does not match'
                    return err;

                }

            })
        } catch (e) {
            console.log(e);
        }

    },


    doAddProfile: (ProfileData) => {

        try {
            console.log("33333333333333", ProfileData);
            let userid = ProfileData.userid
            console.log(userid);
            return new Promise(async (resolve, reject) => {
                console.log(userid, "IDDDDDDD");
                let userCheck = await db.get().collection(collection.USER_COLLECTION)?.findOne({ _id: objectId(userid) })
                if (userCheck) {

                    db.get().collection(collection.USER_COLLECTION)?.findOneAndUpdate(
                        { _id: objectId(userid) },
                        { $set: { ProfileData } },
                    )
                    resolve(response)
                }
                else {
                    let err = 'Email does not match'
                    return err;

                }

            })
        } catch (e) {
            console.log(e);
        }

    },

    getprofile: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userid, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let userdetails = await db.get().collection(collection.USER_COLLECTION)?.findOne({ _id: objectId(userid) })
                console.log(userdetails?.ProfileData?.profilePicture, ">>>>>>>>>>>>>>>");
                resolve(userdetails?.ProfileData?.profilePicture)
            })
        }
        catch (e) {    
            console.log(e);    
        }
    },

    getpostdetails: (userId) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userId, " get post !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let userdetails = await db.get().collection(collection.POST_COLLECTION)?.find({ userid: userId }).toArray()
                console.log(userdetails, ">>>>>>>>>>>>>>>");
                resolve(userdetails)
            })
        }
        catch (e) {
            console.log(e);
        }
    },


    getfollowingpostdetails: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("REACHED   Following post details %%%%%");
                let userdetails = await db.get().collection(collection.USER_COLLECTION)?.aggregate([

                    {
                        $match: { _id: objectId(userid) }
                    },

                    {
                        $unwind: '$following'
                    },
                    {
                        $lookup:
                        {
                            from: collection.POST_COLLECTION,
                            localField: 'following',
                            foreignField: 'userid',
                            as: 'followingdetails'
                        }
                    },



                    // {
                    //     $project: {

                    //         _id: 1,
                    //         username: 1
                    //     }
                    // }

                ]).toArray()


                console.log(userdetails, "Following details list of users^^^^^^^^^^^^^^^^^^^^^^");
                resolve(userdetails)
            })
        }
        catch (e) {
            console.log(e);
        }
    },


    getfollowingslistdetails: (userId) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userId, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let followingsArray = await db.get().collection(collection.USER_COLLECTION)?.findOne({ _id: objectId(userId) })
                console.log(followingsArray.following, "followings people >>>>>>>>>>>>>>>");
                // let followingsfulllist = await db.get().collection(collection.USER_COLLECTION).find({ _id: { $in: [followingsArray.following] } },{username:1}).toArray()
                // console.log(followingsfulllist,"followingsfulllist");
                resolve(followingsArray.following)
            })
        }
        catch (e) {
            console.log(e);
        }
    },


    getfollowerslistdetails: (userId) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userId, "!!!!!!!!!!%%%%%%%%%!!!!!!!!!!!!!!!!!!!!!!");
                let followersArray = await db.get().collection(collection.USER_COLLECTION)?.find({ following: { $in: [userId] } }).toArray()
                // let followingsArray = await db.get().collection(collection.USER_COLLECTION).find({ _id: userId }).toArray()
                console.log(followersArray, "followers people >>>>>>>>>>>>>>>");
                resolve(followersArray)
            })
        }
        catch (e) {
            console.log(e);
        }
    },


    getsavedpostdetails: (userId) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userId, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let savedpost = await db.get().collection(collection.POST_COLLECTION)?.find({ userid: userId }).toArray()
                console.log(savedpost, "Saved post >>>>>>>>>>>>>>>");
                resolve(savedpost)
            })
        }
        catch (e) {
            console.log(e);
        }
    },

    getlikedpostdetails: (userId) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userId, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let likedpost = await db.get().collection(collection.POST_COLLECTION)?.find({ userid: userId }).toArray()
                console.log(likedpost, "liked post >>>>>>>>>>>>>>>");
                resolve(likedpost)
            })
        }
        catch (e) {
            console.log(e);
        }
    },


    findusername: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userid, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let userdetails = await db.get().collection(collection.USER_COLLECTION)?.findOne({ _id: objectId(userid) })
                console.log(userdetails.username, ">>>>>>>>>>>>>>>");
                resolve(userdetails.username)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    finduseremail: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(userid, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let userdetails = await db.get().collection(collection.USER_COLLECTION)?.findOne({ _id: objectId(userid) })
                console.log(userdetails.email, ">>>>>>>>>>>>>>>");
                resolve(userdetails.email)
            })
        }
        catch (e) {
            console.log(e);
        }
    },


    findusernames: () => {
        try {
            return new Promise(async (resolve, reject) => {

                console.log("user name list!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let allusers = await db.get().collection(collection.USER_COLLECTION)?.find().toArray()
                console.log(allusers, ">>>>>>>>>>>>>>>");
                // console.log(allusers.username, "***********")

                resolve(allusers)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    findsuggestionusers: () => {
        try {
            return new Promise(async (resolve, reject) => {

                console.log("find suggestion users!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

                let allusers = await db.get().collection(collection.USER_COLLECTION)?.aggregate([
                    { $match: {} },
                    { $sample: { size: 5 } }

                ]).toArray()


                console.log(allusers, ">>>>>>>>>>>>>>>");
                // console.log(allusers.username, "***********")
                resolve(allusers)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    findmyaccount: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {

                console.log("user name list!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let mine = await db.get().collection(collection.USER_COLLECTION)?.find({ _id: objectId(userid) }).toArray()
                console.log(mine, ">>>>>>>>>>>>>>>");
                // console.log(allusers.username, "***********")
                resolve(mine)

            })
        }
        catch (e) {
            console.log(e);
        }

    },


    // finduserfollowing: () => {
    //     try {
    //         return new Promise(async (resolve, reject) => {

    //             console.log("user name list!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    //             let alluserfollowing = await db.get().collection(collection.FOLLOW_COLLECTION).find().toArray()
    //             console.log(alluserfollowing, "Got itttt>>>>>>>>>>>>>>>");
    //             // console.log(allusers.username, "***********")

    //             resolve(alluserfollowing)
    //         })
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }

    // },

    findsingleuser: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {

                console.log("user Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let userData = await db.get().collection(collection.USER_COLLECTION)?.find({ _id: objectId(userid) }).toArray()
                console.log(userData, ">>>>>>>>>>>>>>>");
                // console.log(allusers.username, "***********")

                resolve(userData)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    updatefollowing: (userid, otheruserid) => {
        try {
            return new Promise(async (resolve, reject) => {

                console.log("Following user Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

                // let userCheck = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(userid) })
                // if (userCheck) {

                let upadateFollowing = await db.get().collection(collection.USER_COLLECTION)?.findOneAndUpdate({ _id: objectId(userid) }, { $push: { following: otheruserid } })

                // let upadateFollowing = await db.get().collection(collection.FOLLOW_COLLECTION).insertOne(
                //     { userid, otheruserid }
                // )
                //   db.get().collection(collection.USER_COLLECTION).findOneAndUpdate({_id:objectId(otheruserid)},{$set:{ isFollowing:true}})

                console.log(upadateFollowing, "@@@@");
                resolve(upadateFollowing)
                // }

            })
        }
        catch (e) {
            console.log(e);
        }

    },




    dounfollow: (userid, otheruserid) => {
        try {
            return new Promise(async (resolve, reject) => {

                console.log("Following user Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

                // let userCheck = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(userid) })
                // if (userCheck) {
                let unfollow = await db.get().collection(collection.USER_COLLECTION)?.findOneAndUpdate({ _id: objectId(userid) }, { $pull: { following: otheruserid } })


                //Needeeeedddddddddddd

                // let unfollow = await db.get().collection(collection.FOLLOW_COLLECTION).deleteOne(
                //     { userid: userid, otheruserid: otheruserid }
                // )
                //Needeeeedddddddddddd


                //   db.get().collection(collection.USER_COLLECTION).findOneAndUpdate({_id:objectId(otheruserid)},{$set:{ isFollowing:true}})

                console.log(unfollow, "@@@@");
                resolve(unfollow)
                // }

            })
        }
        catch (e) {
            console.log(e);
        }

    },




    dosavepost: (postid, userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("Following user Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(postid);
                console.log(userid);
                let save = await db.get().collection(collection.POST_COLLECTION)?.findOneAndUpdate({ _id: objectId(postid) }, { $push: { saved: userid } })
                console.log(save, "@@@@");
                resolve(save)
            })
        }
        catch (e) {
            console.log(e);
        }

    },

    dounsavepost: (postid, userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("Following user Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(postid);
                console.log(userid);
                let save = await db.get().collection(collection.POST_COLLECTION)?.findOneAndUpdate({ _id: objectId(postid) }, { $pull: { saved: userid } })
                console.log(save, "@@@@");
                resolve(save)
            })
        }
        catch (e) {
            console.log(e);
        }

    },

    dolikepost: (postid, userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("Following user Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let like = await db.get().collection(collection.POST_COLLECTION)?.findOneAndUpdate({ _id: objectId(postid) }, { $push: { liked: userid } })
                console.log(like, "@@@@");
                resolve(like)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    dounlikepost: (postid, userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("Following user Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let unlike = await db.get().collection(collection.POST_COLLECTION)?.findOneAndUpdate({ _id: objectId(postid) }, { $pull: { liked: userid } })
                console.log(unlike, "@@@@");
                resolve(unlike)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    dodeletepost: (postid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("Following user Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let delte = await db.get().collection(collection.POST_COLLECTION)?.deleteOne({ _id: objectId(postid) })
                console.log(delte, "@@@@");
                resolve(delte)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    doeditpost: (postData) => {

        try {
            return new Promise(async (resolve, reject) => {

                console.log(postData, "Reached updation for post ");

                if (postData.postpic !== '') {
                    let pp = await db.get().collection(collection.POST_COLLECTION)?.findOneAndUpdate({ _id: objectId(postData.curpostid) }, { $set: { postpic: postData.postpic, createdAt: postData.createdAt } })
                    resolve(pp)
                }

                if (postData.caption !== '') {
                    let pc = await db.get().collection(collection.POST_COLLECTION)?.findOneAndUpdate({ _id: objectId(postData.curpostid) }, { $set: { caption: postData.caption, createdAt: postData.createdAt } })
                    resolve(pc)
                }


                if (postData.description !== '') {
                    let pd = await db.get().collection(collection.POST_COLLECTION)?.findOneAndUpdate({ _id: objectId(postData.curpostid) }, { $set: { description: postData.description, createdAt: postData.createdAt } })
                    resolve(pd)
                }

                if (postData.location !== '') {
                    let pd = await db.get().collection(collection.POST_COLLECTION)?.findOneAndUpdate({ _id: objectId(postData.curpostid) }, { $set: { location: postData.location, createdAt: postData.createdAt } })
                    resolve(pd)
                }


            })
        } catch (e) {
            console.log(e);
        }


    },


    doeditcomment: (cmtData) => {

        try {
            return new Promise(async (resolve, reject) => {

                console.log(cmtData, "Reached updation for cmt ");

                if (cmtData.comment !== '') {
                    let cc = await db.get().collection(collection.COMMENT_COLLECTION)?.findOneAndUpdate({ _id: objectId(cmtData.curcmtid) }, { $set: { comment: cmtData.comment, createdAt: cmtData.createdAt } })
                    resolve(cc)
                }


            })
        } catch (e) {
            console.log(e);
        }


    },


    dodeletecmt: (cmtid) => {
        try {
            return new Promise(async (resolve, reject) => {
                let delte = await db.get().collection(collection.COMMENT_COLLECTION)?.deleteOne({ _id: objectId(cmtid) })
                console.log(delte, "@@@@");
                resolve(delte)
            })
        }
        catch (e) {
            console.log(e);
        }

    },



    doreport: (postid, username, userid, text) => {
        console.log(postid, username, userid, text);
        try {
            return new Promise(async (resolve, reject) => {
                console.log("Following user Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let report = await db.get().collection(collection.POST_COLLECTION)?.findOneAndUpdate({ _id: objectId(postid) }, { $push: { report: { username, userid, text } } })
                console.log(report, "@@@@");
                resolve(report)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    doconversation: (senderid, receiverid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("conversation  Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(senderid, "SENDER THAT IS YOU");
                console.log(receiverid, "RECEIVER that is sitting on other side");

                let conversation = await db.get().collection(collection.CONVERSATION_COLLECTION)?.find({}).toArray()
                console.log(conversation, "Full list of conversation");

                let conversationcheck = await db.get().collection(collection.CONVERSATION_COLLECTION)?.find({ members: { $all: [senderid, receiverid] } }).toArray()

                console.log(conversationcheck, "Conversationn checkkk");
                if (conversationcheck) {
                    console.log("Conversation already exsist");
                    resolve(conversationcheck)
                } else {
                    let conversation = await db.get().collection(collection.CONVERSATION_COLLECTION)?.insertOne({ members: [senderid, receiverid] })
                    console.log(conversation, "@@@@");
                    resolve(conversation)
                }

            })
        }
        catch (e) {
            console.log(e);
        }

    },



    getconversation: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("conversation getting Detailss>>>>>><<<<<<<<<<<<<<<<<<<!");
                // let conversation = await db.get().collection(collection.CONVERSATION_COLLECTION).find({members:{$in:[userid]}}).toArray()
                let conversation = await db.get().collection(collection.CONVERSATION_COLLECTION)?.find({ members: { $in: [userid] } }).toArray()

                console.log("Getting conversation success", conversation, "@@@@");
                resolve(conversation)
            })
        }
        catch (e) {
            console.log(e);
        }

    },



    getcurrentconv: (senderid, receiverid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("conversation current getting Detailss>>>>>><<<<<<<<<<<<<<<<<<<!");
                console.log(senderid.id, receiverid);

                let conversation = await db.get().collection(collection.CONVERSATION_COLLECTION)?.find({ members: { $all: [senderid.id, receiverid] } }).toArray()

                // let conversation = await db.get().collection(collection.CONVERSATION_COLLECTION).find({members:{$in:[userid]}}).toArray()
                // let conversation = await db.get().collection(collection.CONVERSATION_COLLECTION).find({ members: { $in: [userid] } }).toArray()

                console.log("Getting current conversation success", conversation, "@@@@");
                resolve(conversation)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    domessage: (details) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("Message  Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let msg = await db.get().collection(collection.MESSAGE_COLLECTION)?.insertOne(details)
                console.log(msg, "msg@@@@");
                resolve(msg)
            })
        }
        catch (e) {
            console.log(e);
        }

    },

    getcurrentmessage: (msgId) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("msg  Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(msgId, "Conversation id reached backend");
                let msg = await db.get().collection(collection.MESSAGE_COLLECTION)?.find({ _id: objectId(msgId) }).toArray()
                console.log(msg, "getting current msgg ");
                resolve(msg)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    getmessage: (conversationID) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("conversation  Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(conversationID, "Conversation id reached backend");
                let msg = await db.get().collection(collection.MESSAGE_COLLECTION)?.find({ conversationId: conversationID }).toArray()
                console.log(msg, "getting msgg @@@@");
                resolve(msg)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    dogetreceivername: (receiverID) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("receiverID  Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(receiverID, "receiverID id reached backend");
                let userdetails = await db.get().collection(collection.USER_COLLECTION)?.findOne({ _id: objectId(receiverID) })
                console.log(userdetails.username, ">>>>>>>>>>>>>>>");
                resolve(userdetails.username)

            })
        }
        catch (e) {
            console.log(e);
        }

    },



    dogetsendername: (senderid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("senderid  Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(senderid, "senderid id reached backend");
                let userdetails = await db.get().collection(collection.USER_COLLECTION)?.findOne({ _id: objectId(senderid) })
                console.log(userdetails.username, ">>>>>>>>>>>>>>>");
                resolve(userdetails.username)

            })
        }
        catch (e) {
            console.log(e);
        }

    },

    getfollowingid: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("conversation  Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let fid = await db.get().collection(collection.USER_COLLECTION)?.find({ _id: objectId(userid) }).toArray()
                console.log(fid[0].following, "@@@@");
                resolve(fid[0].following)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    addcomment: (details) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("Comment Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let cmt = await db.get().collection(collection.COMMENT_COLLECTION)?.insertOne(details)
                console.log(cmt, "cmt@@@@");
                resolve(cmt)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    getcomment: () => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("comment  Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                // console.log(conversationID, "Conversation id reached backend");
                let cmt = await db.get().collection(collection.COMMENT_COLLECTION)?.find({}).toArray()
                console.log(cmt, "getting msgg @@@@");
                resolve(cmt)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    addnotification: (details) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("Notification Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let ntfn = await db.get().collection(collection.NOTIFICATION_COLLECTION)?.insertOne(details)
                console.log(ntfn, "ntfn@@@@");
                resolve(ntfn)
            })
        }
        catch (e) {
            console.log(e);
        }

    },

    findnotification: () => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("notification  Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                // console.log(conversationID, "Conversation id reached backend");
                let ntfn = await db.get().collection(collection.NOTIFICATION_COLLECTION)?.find({}).toArray()
                console.log(ntfn, "getting ntfn @@@@");
                resolve(ntfn)
            })
        }
        catch (e) {
            console.log(e);
        }

    },

    removenotification: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("Notification deletion Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let delte = await db.get().collection(collection.NOTIFICATION_COLLECTION)?.deleteOne({ receiverid: userid })
                console.log(delte, "@@@@");
                resolve(delte)
            })
        }
        catch (e) {
            console.log(e);
        }

    },

    getntfnlength: (userid) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("notification length  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let nl = await db.get().collection(collection.NOTIFICATION_COLLECTION)?.find({ receiverid: userid }).toArray()
                console.log(nl, "notification length@@@@");
                resolve(nl)
            })
        }
        catch (e) {
            console.log(e);
        }

    },

    findblockdata: (email) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("notification length  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let user = await db.get().collection(collection.USER_COLLECTION)?.findOne({ email: email })
                console.log(user, "block data@@@@");
                resolve(user)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    findreports: () => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log("report  Detailss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                // console.log(conversationID, "Conversation id reached backend");
                let report = await db.get().collection(collection.POST_COLLECTION)?.find({}).toArray()
                console.log(report, "getting report @@@@");
                resolve(report)
            })
        }
        catch (e) {
            console.log(e);
        }

    },



    findallposts: () => {
        try {
            return new Promise(async (resolve, reject) => {
                let allposts = await db.get().collection(collection.POST_COLLECTION)?.find({}).toArray()
                // console.log(allposts, "getting report @@@@");
                resolve(allposts)
            })
        }
        catch (e) {
            console.log(e);
        }

    },


    findreportid: (reportId) => {
        try {
            return new Promise(async (resolve, reject) => {
                console.log(reportId, "report id reached backend");
                let userdetails = await db.get().collection(collection.USER_COLLECTION)?.findOne({ _id: objectId(reportId) })
                console.log(userdetails.username, ">>>>>>>>>>>>>>>");
                resolve(userdetails.username)

            })
        }
        catch (e) {
            console.log(e);
        }

    },




}