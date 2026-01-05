# devtindet api
 ## authrouter using express.router
- post /signup // these all are routes paxked in roter 
- post /login
- post /logout
create one routwr that will handle this like this creare for each catwgoriy 
 #### best industrie praticw to club api and make router for it
## profilerouter
- get /profile/view
- patch /profile/edit
- patch/profile/password      
connectionRequestRouter
- post /request/send/interested/:userId 
- post /request/send/ignored/:userId 



now i recieve reuest wheter to accept or reject
- post/request/review/accepted/:requestId
 - post/request/review/rejected/:requestId

userRouter
 - Get user/connection
 - Get user/requests/recieved
 - GET user /feed- get profile of other user on platform 
status: ignore ,intrsted,accepted,rejected