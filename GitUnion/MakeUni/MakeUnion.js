const ps=require('prompt-sync')
const prompt=ps()

function takeip(){
  let ip=prompt()
   return ip
}

function UnionInfo(){
    console.log("Uni Name")
    const Uniname=takeip()
    console.log("pref crops")
    const Unicrops=takeip()
    console.log("max number")
    const maxmem=takeip()
    const uniinfo={
        uniName : Uniname ,
        Crops : Unicrops ,
        memberLimit : maxmem
    }
    return uniinfo
}
module.exports=UnionInfo