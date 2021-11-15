const express = require("express")
const app= express()

async function joinUnion(client){
    const targetdb= await client.db('SPDproject').collection('unions').find({})
    const result=await targetdb.toArray()
/*  
     result.forEach((result,i) => {
        console.log(`${i+1}.name:${result.uniName}`) 
    })  */
    //console.log(result[0])
    return result
}  

module.exports=joinUnion