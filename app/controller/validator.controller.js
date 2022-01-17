const validator = require("validator")
class ValiadtorController{
    static isEmptyString = (val)=>{
        return val.length //0=false >0 =true
    }
   
    
   static isInt=(val)=>{
        return validator.isInt(val)
    }
}
module.exports = ValiadtorController