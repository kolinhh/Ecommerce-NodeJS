const DB = require('../models/permit');
const Helper = require('../utils/helper');

const all = async(req, res, next)=>{
    let permits = await DB.find()
    Helper.fMsg(res, "All permission", permits)
}
const add = async ( req,res, next) => {
    let dbPermit = await DB.findOne({ name: req.body.name })
    if (dbPermit) {
        next(new Error("Permit name is already exit"))
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, "Permit name is added", result)
    }
}

const get = async (req, res, next)=>{
    let dbPermits = await DB.findById(req.params.id)
    if(dbPermits){
        Helper.fMsg(res,"Single permission", dbPermits)
    }else{
        next (new Error("No user with that id sir"))
    }
}


module.exports = {
    add,
    all,
    get
}