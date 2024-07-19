const mongoose = require('mongoose')

const studentInfo = mongoose.Schema({
    "name":String,
    "age":Number,
    "email":Number,
    "type":String
})

const Animal = mongoose.Schema({
    "type":String,
    "version":Number
},{versionKey:false})
/* 
studentInfo.methods.typeOfAnimal=function(cb){
    console.log(this.type)
    return mongoose.model('Animals',Animal).find({"type":this.type},cb)
} */

const studentInfos = mongoose.model('school',studentInfo)

const Animals =mongoose.model('Animals',Animal)

module.exports ={studentInfos,Animals}