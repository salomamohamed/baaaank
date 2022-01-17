const res = require('express/lib/response')
const fs = require("fs")
// const req=require('express/lib/require')

const ValiadtorController= require("./validator.controller")
const readFromJSON = () =>{
    let data
    try{
        data = JSON.parse(fs.readFileSync('./models/data.json'))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        data = []
    }
    return data
}
const writeDataToJSON = (data) =>{
    try{
        fs.writeFileSync("./models/data.json", JSON.stringify(data))
    }
    catch(e){
        console.log(e.message)
    }
}
class User{
    static showAll=(req,res)=>{
        const data=readFromJSON()
        const isEmpty=data.length==0
        res.render("all", {pageTitle: "All Users", data, isEmpty})
    }
    static addUser=(req,res)=>{
        if(Object.keys(req.query).length!=0){
            const data=readFromJSON()
            let user=req.query
            if(data.length == 0) user.id=1
            else user.id=data[data.length-1].id+1
            data.push(user)
            writeDataToJSON(data)
            res.redirect("/")
        }
        res.render("add",{pageTitle:"add New Client"})
        }
        static addUserPost = (req, res)=>{
            const user = {name:"", address:"", phone:"", accNum:"",	intialbalance:""}
            res.render("addPost", {pageTitle:"add new user(post)", user, errors:{}})
        }
        static addUserLogic=(req,res)=>{
            let user=req.body
            let errors={}
            if(!ValiadtorController.isEmptyString(user.name)) 
            errors.name="name is required"
            if(!ValiadtorController.isEmptyString(user.name)) 
            errors.name="name is required"
            if(!ValiadtorController.isInt(user.intialbalance)) 
            errors.intialbalance="intialbalance is required"
     
            if(Object.keys(errors).length>0) 
            return res.render('addPost', {
                pageTitle:"add new user",
                errors,
                user
            })
            const data = readFromJSON()
            if(data.length == 0) user.id=1
            else user.id = data[data.length-1].id +1
            data.push(user) 
            writeDataToJSON(data)
            res.redirect("/")
        }
        static searchUserById=(id,data)=>{
            let userIndex=data.findIndex(el =>el.id==id)
            return  userIndex
        }
        static singleUser=(req,res)=>{
            let isNotfound=false
            const id=req.params.id
            const data=readFromJSON()
            const userIndex = this.searchUserById(id, data)
        if(userIndex==-1) isNotfound=true
         res.render("single",{pageTitle:"SingleClient",
         user:data[userIndex],
         isNotfound })
        }
        static editUser=(req,res)=>{
            let isNotfound=false
            const id=req.params.id
            const data=readFromJSON()
            const userIndex = this.searchUserById(id, data)
        if(userIndex==-1) isNotfound=true
         res.render("edit",{pageTitle:"EditClient",
         user:data[userIndex],
         isNotfound })
        }
        static editUserPost=(req,res)=>{
            let isNotFound=false
            const id=req.params.id
            const data=readFromJSON()
            const userIndex = this.searchUserById(id, data)
            data[userIndex]={id,...req.body}
            writeDataToJSON(data)
           
            res.redirect("/")

        }
        
      
        static deleteUser=(req,res)=>{
            let isNotfound=false
            const id=req.params.id
            const data=readFromJSON()
            const userIndex = this.searchUserById(id, data)
            if(userIndex!=-1){
            data.splice(userIndex,1)
            writeDataToJSON(data)
            res.redirect("/")}
            else res.redirect('/err')
        }
    


            // static transactionUser=(req,res)=>{
            //     const id=req.params.id
    
            //     const data=readFromJSON()
            //     let newTransaction={}
            //     const userIndex = this.searchUserById(id, data)
            //    console.log(data[userIndex])
            //     // data[userIndex].push(newTransaction);
               
            //     writeDataToJSON(data)
            //  res.render("transaction")
            // // res.redirect("/")
            static addmoney=(req,res)=>{
                const id=req.params.id
                const value=req.query.value
               
                let data=readFromJSON()
                const userIndex=this.searchUserById(id,data)
                //console.log(userIndex)
                data.push(data[userIndex])
            
                const intial=parseInt( data[userIndex].intial)
                data[userIndex].totalbalance=parseInt(value)+intial
              
                writeDataToJSON(data)

             //   res.render("addtt")
               res.render("addtt")

            }
            static withdraw=(req,res)=>{
                res.render("withdraw")
              }
              static withdrawLogic=(req,res)=>{
                const id=req.params.id
                let data=readFromJSON()
                const userIndex=this.searchUserById(id,data)
                const value=req.body.value
                data[userIndex]=value
                const total=parseInt( data[userIndex])
                data[userIndex]=total-parseInt(value)
                writeDataToJSON(data)
                res.redirect("/all")
              }
            }

                  
                  
              


            
                
        

        
            
            
          
            
            
            module.exports=User
                
          

       
    
    
