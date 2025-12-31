const mongoose = require('mongoose')

const connectdb = async ()=> {
    try{
        mongodb = mongoose.connect(process.env.MONGO_URI)
        console.log("db connected")
    }
    catch(error){
        console.log("error connecting to db: ", error.message)
    }

}


module.exports = connectdb