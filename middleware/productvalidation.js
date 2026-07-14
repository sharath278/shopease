const jProductSchema = require("../Schema");
const MyError = require("../utils/error");

const productValidataion = (req,res,next)=>{
         const {error} = jProductSchema.validate(req.body);
    if(error){
        throw new MyError(400,error.details[0].message);
    }
    next();
}

module.exports = productValidataion;
