const mongoose = require('mongoose')

 const placesSchema = mongoose.Schema({
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
    photopath:{
        type:String,
        required:true,
        trim:true
    },
    locations:{
        type:Array
    }   
 })
 module.exports = mongoose.model('places',placesSchema)

 // locations:[
//      {lName : 'Fort',desc:'',photoPath:'/images/places/jaipur/loc1/jpg',timing:''}
//  ]
