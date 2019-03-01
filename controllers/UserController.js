var User = require('../models/User').User;
var userController = {};


userController.allUsers = (req, res)=>{
    var userList = [];
    User.find({}, (err, users)=>{
        users.map((user) => userList.push({nickname:user.nickname, el_pastas:user.username}));    
        res.render('auth/users', {userList: userList, user: req.user});
    });
}

userController.myProfile =  (req, res) => {
    let name;  
    if(req.params.name){
        name = req.params.name
    }else{
        name = req.user.nickname
    }
    User.findOne({nickname: name}, (err, userFromDB)=>{   
        
      res.render('auth/profile', {user: userFromDB});
    })
}

module.exports = userController;