const { MongoClient } = require("mongodb")
const mongo = require("./Mongo")
const express=require("express")
const app = express()
const userSchema=require('./userSchema')
const fpath=require("path")
const { urlencoded } = require("body-parser")

const uri='mongodb+srv://Siva:E8SnW3Ka7kH7yiim@spdproject.zo2tv.mongodb.net/SPDDB?retryWrites=true&w=majority'
const client = new MongoClient(uri)

const main=async ()=>{
    await mongo().then(async(mongoose)=>{
        try{
            app.listen(8080,()=>{
                console.log("Listening on port 8080")
        })
        console.log("Connected to MongoDB")
        await client.connect()
        app.set('view engine','ejs')
        app.set('views',fpath.join(__dirname,'Views'))
        app.use(express.urlencoded({extended: true}))
        app.use(express.static(fpath.join(__dirname,'Public')))


        app.post('/Login',async (req,res)=>{
            console.log("Sent creds")
            const nameverify=(req.body).UserName
            const passcheck=await userSchema.findOne({"UserName" : nameverify},{Password: 1 , _id:0})
            console.log(passcheck.Password)
             const recvpassy=(req.body).Pass
             console.log(recvpassy)
             if(recvpassy==(passcheck.Password)){
                res.redirect('/Hello')
                console.log("IN man ")
            } 
            else{
                res.redirect('/Login')
            } 
        }) 
        app.get('/',(req,res)=>{
            console.log("at home page")
            res.render('Hello')
        })
        app.get('/Login',(req,res)=>{
            console.log("At Login Page")
            res.render('LoginPage.ejs')
        })

        app.post('/Register',async(req,res)=>{
            console.log("Got request !")
            const newUser =  new userSchema(req.body)
            newUser.UnionPresent=0
            console.log(newUser)
            await newUser.save()
        })
        app.get('/Register',(req,res)=>{
            console.log("At Register Page")
            res.render('RegisterPage')
        }) 
        app.get('*',(req,res)=>{
            console.log("at home page")
            res.render('Hello')
        })

        }
        catch(e){
            console.error(e)
        }
        finally{
            await client.close()
        }

    })
}

main()