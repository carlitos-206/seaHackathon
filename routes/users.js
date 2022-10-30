const { Router } = require("express");
const router = Router();
const cors = require("cors")
// Data interface
const mongoConnection = require("../dataInterface/mongo")


// "POST" requests

    // curl -X POST -H "Content-Type: application/json" -d '{"username":"user1", "email":"carlitos@uw.edu","password":"secrets!", "firstName":"Carlos", "lastName":"Caceres"}' http://localhost:8000/users/register
    router.post("/register",cors(), async (req, res) => {
      let result = await mongoConnection.createUser(req.body)
      if(!result.Error){
        return res.status(200).send(result)
      }else{
        res.status(500).send(result)
      }
    }),

    // curl -X POST -H "Content-Type: application/json" -d '{"usernameOrEmail":"carlitos@uw.edu","password":"secrets!",}' http://localhost:8000/users/login
    // curl -X POST -H "Content-Type: application/json" -d '{"usernameOrEmail":"user1","password":"secrets!"}' http://localhost:8000/users/login
    router.post("/login", cors(), async (req, res) => {
        let result = await mongoConnection.signIn(req.body)
        if(!result.error){
          //console.log(result)
          res.status(200).send(result)
        }else{
         // console.log(result)
          res.status(500).send(result)
        }
    }),
    // curl -X DELETE http://localhost:8000/users/delete/:username
    router.delete('/delete/:username', cors(), async(req, res)=>{
      let result = await mongoConnection.deleteAccount(req.params.username)
      if(!result.Error){
        res.status(200).send(result)
      }else{
        res.status(500).send(result)      
      }
    })





module.exports = router;