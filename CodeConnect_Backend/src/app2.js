// const express=require("express")
// const app2=express()
// // app2.use("/",(err,req,res,next)=>{
// //     console.log("hi")
// //     // if(err) res.status(500).send("something wetn wrong")
    
// //     res.send("hi");
// // })
// app2.use("/",(req,res)=>{
//     res.send("wer")
// })
// app2.get("/hello",(req,res)=>{
//     // throw new Error("asddfgg")
//     res.send("from hello")
// })
// // app2.use("/",(err,req,res,next)=>{
// //     console.log("hi")
// //     if(err) res.status(500).send("something wetn wrong")
    
// //     // res.send("hi");4
// // })
// app2.listen(3000,()=>{
//     console.log("uccessfully running")
// })
const obj={
    "hi":12,
    "by":13,
    7:56,
    obj2:{
        city:"banlgore"
    }
}
const bi=Object.keys(obj)
for(const key of bi){
    console.log(obj[key])
}

console.log(bi)
// console.log(obj[hi])
for(const i in obj){
    console.log(obj[i])
}
// const arr=["red","orange","green ","white"]
// // console.log(arr)
// // // const [color1, color2, color3, color4] = arr;
// const {2:color3}=arr
// console.log(color3)
// const {hi:usename,by,"7",obj2:{city}}=obj
// const a=obj.v
// console.log(usename)
// console.log(city)
// console.log(obj["hi"])
// debugger
// const result = (function() {
//     var x = 5;
//     return function() {
//         x++;
//         return x;
//     };
// })();

// console.log(result()); // Call the returned function and log the result
// console.log(result()); // Call the returned function again and log the result




// console.log(fun2())
// console.log(fun2())
