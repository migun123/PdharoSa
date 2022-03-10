const mongoose = require('mongoose')

 const useractivitesSchema = mongoose.Schema({
     activityname:{
         type:String,
         required:true,
         trim:true
     },
     photopath:{
         type:String,
         required:true,
         trim:true
     }
    })
    module.exports = mongoose.model('useractivity',useractivitesSchema)