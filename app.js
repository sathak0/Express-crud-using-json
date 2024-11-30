const express= require('express');

const app = express();

app.use(express.json());

let uId=2;

let users=[
    {id:1,name:"Yousuf",age:21},
    {id:2,name:"Vijay",age:21}
]

app.get('/',(req,res)=>{
    res.json(users);
});

app.get('/:id',(req,res)=>{
    // users.forEach(user=>{
    //     if(user.id==req.params.id){
    //         resUser=user;
    //     }
    // })
    const  user=users.find(u=>u.id===parseInt(req.params.id));
    if(!user) return res.status(404).json({message:"User Not Found"});
    res.json(user);
    
});

app.post('/',(req,res)=>{
    const {name,age}=req.body;
    const  newUser={id:uId+1,name,age};
    users.push(newUser);
    res.json(newUser);
});

app.put('/',(req,res)=>{
    var oldUser=users.find(u=>u.id===parseInt(req.body.id));
    if(!oldUser) res.status(404).json({message:"User Not Found"});
    oldUser.name=req.body.name;
    oldUser.age=req.body.age;
    res.json(oldUser);
});

app.delete('/:id',(req,res)=>{
    const user=users.findIndex(u=>u.id===parseInt(req.params.id));
    if(!user) res.status(404).json({message:"User Not Found"});
    users.splice(user,1);
    res.json({message:"User Deleted Sucessfully"});
})

app.listen(3000);