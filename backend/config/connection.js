const mongoClient = require('mongodb').MongoClient
const state = {
    db: null
}

// mongodb+srv://christy:christy123@cluster0.j4mcb1t.mongodb.net/test


module.exports.connect = function (done) {
    // const url='mongodb://localhost:27017'
    const url = 'mongodb+srv://christy:christy123@cluster0.j4mcb1t.mongodb.net/socialMedia?retryWrites=true&w=majority'

    const dbname = 'socialMedia'
    // mongoClient.connect("mongodb://localhost:27017/socialMedia", { useNewUrlParser: true },(err,client)=>{

    mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("-----------err---------", err);
            // process.exit(1);   
        }
        else {
            console.log("--------------");
            state.db = client.db(dbname)
            done()
        } 
    })


    // mongoClient.connect(url,(err,data)=>{
    //     if(err)
    //     return done(err)
    //     state.db=data.db(dbname)
    //      done()

    // })


}

module.exports.get = function () {
    return state.db
}


