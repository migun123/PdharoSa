const express = require('express')
const path = require('path')
// const user = require('../models/user')
const router = express.Router()
const multer = require('multer')
const useractivity = require('../models/useractivity')
const bcrypt = require('bcrypt');

const User = require('../models/user')
const Places = require('../models/places')
const Activity = require('../models/activities')
const isUser = require('../middleware/isUser')
const isAdmin = require('../middleware/isAdmin')
const activities = require('../models/activities')
const { Router } = require('express')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload/aadhar')
    },
    filename: function (req, file, cb) {
      const fileName = `aadhar_${req.session.user.username}.${file.mimetype.split('/')[1]}`
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage ,fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
}})

router.get('/',(req,res)=>{
    res.render('welcome')
})

router.get("/places",async (req,res)=>{
    const places = await Places.find()
    // console.log(places[0].name);
    res.render('places',{places})
})

router.get("/place/:name",async (req,res)=>{
    const data = await Places.find({name:req.params.name})

    const activites = await Activity.find({city:req.params.name})

    // console.log(data[0])

    res.render('main1',{activites,city:data[0]})
})
// router.get("/description",(req,res)=>{
//     res.render('')
// })
router.get("/login",(req,res)=>{
    res.render('login',{msg:''})
})

router.get("/signup",(req,res)=>{
    res.render('signup')                                           
})
router.get("/activities",isUser,(req,res)=>{
    res.render('activities',{userid:req.session.user._id})
})
router.get("/viewactivities",isAdmin,async(req,res)=>{
    const result = await activities.find()
    res.render('activities',{result})
})
router.post("/useractivity",upload.single('fufile'),async(req,res)=>{
    // console.log(req.file);
    const data = {
        userid:req.session.user._id, 
        activityname:req.body.activityname,
        photopath:req.body.fufile
    }
    const result = await useractivity(data).save()
    if(result){
       return res.render('/thankyou',{userid:req.session.user._id})
    }
    else{
        return res.redirect('/activities')
    }
})

router.get("/welcome",isUser,(req,res)=>{
    res.render('welcome',{userid:req.session.user._id})
})
router.get("/main1",isUser,(req,res)=>{
    res.render('main1',{userid:req.session.user._id})
})
router.get("/addplaces",isUser,(req,res)=>{
    res.render('addplaces',{userid:req.session.user._id})
})
router.post("/addactivity",async(req,res)=>{

    console.log(req.body);

    const data={
        userid:req.session.user._id,       
         city:req.body.city,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        starttime:req.body.starttime,
        endtime:req.body.endtime
    }
    const result = await Activity(data).save()
    // console.log(result);
    res.render('/addactivity',{userid:req.session.user._id})
})

router.post("/checkuser",async(req,res)=>{
    // console.log(req.body);
    const result= await User.find({username:req.body.username})

    if(result.length >0){
        const istrue = bcrypt.compareSync(req.body.password,result[0].password);
       if(istrue){
           req.session.user = result[0]
           req.session.save(()=>{
               res.redirect('/places')

           }) 
       }  
    else{
        res.render('login',{msg:'Incorrect Password'})

    }
}
    else{
        res.render('login',{msg:'User not Registered'})
    }

// router.post("/checkdata",(req,res)=>{
//     console.log(req.body);
})

// router.get('/places/:place',async (req,res) => {

//     const data = await Places.find({name:place})

    
// })

router.post("/savedata",async (req,res)=>{
    // console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password,12);

    const data = {
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
        isAdmin:false
    }

    const result = await User(data).save()
    // console.log(result);
    if(result) {
        return res.redirect('/login')
    }
    else {
        return res.redirect('/signup')
    }
})

router.get('/addactivity1',isUser,(req,res) => {
    res.render('addactivity1',{userid:req.session.user._id})
})

router.get("/dashboard",isUser,(req,res)=>{
    res.render('dashboard',{userid:req.session.user._id})
})
router.get("/addactivity",(req,res)=>{
    res.render('addactivity')
})
router.get('/thankyou',isUser,(req,res)=>{
    res.render('thankyou',{userid:req.session.user._id})
})

module.exports = router