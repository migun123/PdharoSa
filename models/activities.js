const mongoose = require('mongoose')

 const activitesSchema = mongoose.Schema({
     city:{
         type:String,
         required:true,
         trim:true
     },
     name:{
         type:String,
         required:true,
         trim:true
     },
     description:{
         type:String,
         required:true,
         trim:true
     },
     price:{
        type:String,
        required:true,
        trim:true
     },
     starttime:{
         type:String,
         required:true,
         trim:true
        },
        endtime:{
            type:String,
            required:true,
            trim:true
        }
 })

 module.exports = mongoose.model('activities',activitesSchema)