const db = require('../config/connection')
const collection = require('../config/collections')
const bcrypt = require('bcrypt')
//const Promise=require('promise')
const { response } = require('express')
const objectId = require('mongodb').ObjectId


module.exports = {

    doLogin: (userData) => {
        try {
            return new Promise(async (resolve, reject) => {
                let loginStatus = false
                let response = {}
                let user = { email: "admin@gmail.com", password: "Admin1804" }
                // let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})

                if (user.email == userData.email) {

                    if (userData.password == user.password) {
                        // if(status){
                        console.log("Login success")
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("login fail")
                        resolve({ status: false })
                    }
                    // }
                } else {
                    let err = "Login failed"
                    reject(err)
                    console.log("Login failed")
                }
            }).catch((err) => {
                console.log(err);
                return err;
            })

        } catch (e) {
            console.log(e);
        }

    },


    blockUser: (userId) => {
        return new Promise((resolve, reject) => {
            console.log(objectId(userId))
            let query = { _id: objectId(userId) };
            db.get().collection(collection.USER_COLLECTION).findOneAndUpdate(query, { $set: { block: true } }).then((response) => {
                console.log(response)
                resolve(response)
            }).catch((err) => {
                console.log(err)
            })
        })
    },

    unblockUser: (userId) => {
        return new Promise((resolve, reject) => {
            console.log(objectId(userId))
            let query = { _id: objectId(userId) };
            db.get().collection(collection.USER_COLLECTION).findOneAndUpdate(query, { $set: { block: false } }).then((response) => {
                console.log(response)
                resolve(response)
            }).catch((err) => {
                console.log(err)
            })
        })
    },




    doapprove: async (userid) => {
        try {
            return await new Promise(async (resolve, reject) => {
                console.log("HEEEEEEEEEElllllllloooooooooooooooo")
                console.log(objectId(userid))
                // let applicants = await db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(userid)})
                let applicants = await db.get().collection(collection.USER_COLLECTION).findOneAndUpdate(
                    { _id: objectId(userid) },
                    { $set: { isApprove: true } }
                )
                console.log("Printing applicant details")
                console.log(applicants)

                resolve(applicants)

            })
        } catch (err) {
            console.log(err)
            return err
        }
    },




    dodisapprove: async (userid) => {
        try {
            return await new Promise(async (resolve, reject) => {
                console.log("HEEEEEEEEEElllllllloooooooooooooooo")
                console.log(objectId(userid))
                // let applicants = await db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(userid)})
                let applicants = await db.get().collection(collection.USER_COLLECTION).findOneAndUpdate(
                    { _id: objectId(userid) },
                    { $set: { isDisapprove: true } }
                )
                console.log("Printing applicant details")
                console.log(applicants)
                resolve(applicants)

            })
        } catch (err) {
            console.log(err)
            return err
        }
    },



}