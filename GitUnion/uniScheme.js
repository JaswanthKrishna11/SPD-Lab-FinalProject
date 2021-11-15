const mongooose = require('mongoose') 

const reqString= {
    type: String ,
    required : true

}
const unionschema=mongooose.Schema({
    uniName : reqString ,
    Crops : String ,
    State: reqString,
    Description: String,
    Members:[String]
})
module.exports = mongooose.model('Unions',unionschema)