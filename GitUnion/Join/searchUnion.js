const express = require("express")
const app= express()

const mongoose = require('mongoose');
const uniScheme = require("../uniScheme");

async function searchUnion(id){
    const idunion = await uniScheme.findById(id)
    //console.log(idunion)
    return idunion
}  

module.exports=searchUnion