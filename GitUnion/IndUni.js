const { MongoClient } = require("mongodb")
const mongo = require("./Mongo")
const express=require("express")
const app = express()
const fpath=require("path")
const uniScheme = require("./uniScheme")
const UnionInfo = require("./MakeUni/MakeUnion")
const ps=require('prompt-sync')
const joinUnion = require("./Join/uniJoin")
const searchUnion = require("./Join/searchUnion")
const prompt=ps()

const uri='mongodb+srv://Siva:E8SnW3Ka7kH7yiim@spdproject.zo2tv.mongodb.net/SPDDB?retryWrites=true&w=majority'
const client = new MongoClient(uri)


const main=async ()=>{
      await mongo().then(async(mongoose)=>{
        try{
        app.listen(3000,()=>{
                console.log("Listening on port 3000")
        })  
        console.log("Connected to MongoDB")
        await client.connect()
        //console.log("Welcome to the Union Page ") 
        const username='Aamon'


    app.set('view engine','ejs')
    app.set('views',fpath.join(__dirname,'Views'))
    app.use(express.urlencoded({extended: true}))    
    
    app.get('/',(req,res)=>{
        console.log("At home Page")
        res.sendFile('C:\\Users\\gauta\\OneDrive\\Desktop\\UnionNode\\Views\\FindPage.ejs')
        res.render('HomePage.ejs')
    })  
    app.get('/FindPage'||'/FindPage/', async (req,res)=>{
        console.log("hello bro")
        const result= await joinUnion(client) 
        //console.log(result)
        res.render('FindPage.ejs',{ result })
    })
    
/    app.get('/CreatePage',(req,res)=>{
        res.render('CreatePage.ejs')
     })   
     
    
     app.get('/FindPage/:id',async (req,res)=>{
       const { id }=req.params
      /* console.log(id)  */
      //const id = '61880f22e9a5559d4f7fba8f'
    const  nameU  = await uniScheme.findById(id)
      console.log(nameU)  
      res.render('UnionDisplay.ejs', { nameU } ) 
     })      


     app.post('/CreatePage',async (req,res)=>{
        const newUnionEntry= new uniScheme(req.body)
        const idupdate=newUnionEntry._id
        await newUnionEntry.save()
        await uniScheme.findByIdAndUpdate({_id:idupdate},{
          $push:{
              Members: username
          } 
               })
        const urlidtage= await uniScheme.findOne({uniName:`${newUnionEntry.uniName}`},{_id:1})
        console.log(urlidtage)
        
        res.redirect(`/FindPage/${newUnionEntry._id}`)
     })
      
     app.get('*',(req,res)=>{
            console.log("At home Page")
            res.render('HomePage.ejs')
        })

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