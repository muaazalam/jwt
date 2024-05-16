const express=require("express");
const jwt=require('jsonwebtoken');
const app=express();
const secretKey='secretkey';

app.get('/', (req, res)=>{
    res.json({
        message: "a sample API"
    })
})

app.post('/login',(req,res)=>{
    const user={
        id:1,
        username:'Muaaz',
        email:'alammuaaz@gmail.com'
    }
    jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
        res.json({token})
    })
})

app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token, secretKey, (err,authData)=>{
        if(err){
            res.send({result:"Invalid Token"})
        }
        else{
            res.json({
                message:"Profile Accessed",
                authData
            })
        }
    })

})

function verifyToken(req, res, next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer=bearerHeader.split(' ');
        const token=bearer[1];
        req.token=token;
        next();
    }
    else{
        res.send({
            result: 'Token is Invalid'
        })
    }

}

app.listen(5000, ()=>{
    console.log('app is listening on port number: 5000');
})