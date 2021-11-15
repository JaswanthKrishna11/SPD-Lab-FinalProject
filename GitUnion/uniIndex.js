const { MongoClient } = require("mongodb")
const mongo = require("./Mongo")
const express=require("express")
const app = express()
const fpath=require("path")
const uniScheme = require("./uniScheme")
const UnionInfo = require("./MakeUni/MakeUnion")
const ps=require('prompt-sync')
const joinUnion = require("./Join/uniJoin")
const prompt=ps()

const uri='mongodb+srv://Siva:E8SnW3Ka7kH7yiim@spdproject.zo2tv.mongodb.net/SPDDB?retryWrites=true&w=majority'
const client = new MongoClient(uri)



function takeip(){
    let ip=prompt()
     return ip
  }

const main=async ()=>{
      await mongo().then(async(mongoose)=>{
        try{
        app.listen(3000,()=>{
                console.log("Listening on port 3000")
        })  
        console.log("Connected to MongoDB")
        await client.connect()
        console.log("Welcome to the Union Page ") 


      /* console.log("Do u want to join or create union?")
         const unidecision=takeip()
        if(unidecision==1) await new uniScheme(UnionInfo()).save()
        else if (unidecision==2) { await joinUnion(client) }  */

  app.set('view engine','ejs')
    app.set('views',fpath.join(__dirname,'Views'))
    
    app.get('/',(req,res)=>{
        console.log("At home Page")
        res.render('HomePage.ejs')
    })  
    app.get('/FindPage', async (req,res)=>{
        console.log("hello bro")
        const result= await joinUnion(client) 
        //console.log(result)
        res.render('FindPage.ejs',{ result })
    })
    
    app.get('/CreatePage',(req,res)=>{
        res.render('CreatePage.ejs')
     })  
/*     app.get('/FindPage',(req,res)=>{
        res.render('FindPage.ejs')
       })       */
    }
    catch(e){
         console.error(e)
     } 
finally{
       //await client.close()
    
    }   
 }) 
}
main()