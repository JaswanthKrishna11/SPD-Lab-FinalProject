const mongooose = require('mongoose') 
const { boolean } = require('webidl-conversions')


const reqString= {
    type: String ,
    required : true

}
const userSchema=mongooose.Schema({
    FirstName : String ,
    LastName : String ,
    UserName : String,
    Password :  String ,
    ProducedCrops : String,
    District: String,
    State : String,
    PhoneNumber: Number,
    Email : String,
    UnionPresent: Number
})
module.exports = mongooose.model('Farmers',userSchema)