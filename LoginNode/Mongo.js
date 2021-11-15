const mongoose= require('mongoose')
//const {mongoPass}=require ('./config')
const mongoPath='mongodb+srv://Siva:E8SnW3Ka7kH7yiim@spdproject.zo2tv.mongodb.net/SPDproject?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
return mongoose
} 