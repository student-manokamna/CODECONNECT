// const express=require('express');
// const app=express() //INSANCE OF EXPRESS
// const {adminAuth,userAuth}=require("./middlewares/auth")
// app.get('/getuserdata',(req,res)=>{
//     try{
//         throw new Error("fdgd");
//         res.send('user data sent')
//     }
//     catch(err){
//         res.status(500).send("something went wrong contact the team")// ihave send request do not get further 
//     }
   
    
// })
// app.use('/',(err,req,res,next)=>{ //wild card thing matches all route err should be first paraametet 
// if(err){ 
//     //log your error

//     res.status(500).send("something went wrong") //now ui handle gracefully do no tshow random meesaget o user 
// }
// })
// // app.use("/",(req,res)=>{  //request,response
// //     res.send("hello namste   from the dashboard") 
// //     }) 
// // app.use("/hello",(req,res)=>{  //request,response
// //     res.send("hello hello hello")
// //     }) 
// //tjis will only match get call to /user 
// // app.get('/user/:userId/:name/:password',(req,res)=>{ //: col means dynamic path
// //     // console.log(req.query)
// //     console.log(req.params)

    
// //     res.send({firstname:"akshay",lastname:"saini"})
// // })
// // app.post('/user',(req,res)=>{
// //     // console.log("dsaven data to dtatabase")
// //     res.send("data successfully saved to database")
// // })
// //handle auth middleware for all get post request
// // app.use("/admin",adminAuth) //called only for /admin
// // // app.use("/user",userAuth)  // i have only on epath so write it isode 
// // app.post("/user/login",(req,res)=>{
// //     res.send("user logged in succewssfullly") //no need of authetication so no put userauth
// // })
// // app.get('/user/data',userAuth,(req,res)=>{
// //     res.send("user data sent")
// // })
// // app.get('/admin/getalldata',(req,res)=>{
// //     res.send("all data sent")
// // })
// // app.get('/admin/deletealldata',(req,res)=>{
// //     // const token="xyz"  //req.body?.token
// //     // const isAdminAuthrised=token==="xyz"
// //     // // console.log("dsaven data to dtatabase")
// //     // if(isAdminAuthrised){
// //     res.send("all data sent")
// //     // }
// //     // else{
// //     //     res.status(401).send("unautrisedn request")
// //     // } upar /admin me hi likg diya logic
// // })
// // app.delete('/user',(req,res)=>{
    
// //     res.send("delted succesfully")
// // })
// //this will match app the http method callto /test
// // app.use("/user",(req,res,next)=>{  //request,response
// // // res.send("hello from the server")
// // console.log("handeling the route user")
// // res.send("response")
// // next()
// // },
// // (req,res)=>{
// //     console.log("handeling the route user 2")
// //     res.send("response 2")
// // }) //request handeler srver is lsiting over here
// // app.use("/",(req,res)=>{  //request,response
// //     res.send("hello namste   from the dashboard")
// //     }) 
// app.listen(8888,()=>{
//     console.log("server is successfully listing on port 8888")
// })