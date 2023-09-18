export default class usercontainer{
    constructor(name,email,password){
        this.password=password;
        this.name=name;
        this.email=email;
    }
    static add(name,email,password){
        const temp=new usercontainer(name,email,password);
        users.push(temp);
    }
    static searchEmailAndUserName(email,name){
        for(let i=0;i<users.length;i++){
            if(users[i].email==email||users[i].name==name){
                return true;
            }
        }
        return false;
    }
    static searchAccount(email,password){
        for(let i=0;i<users.length;i++){
            if(users[i].email==email){
                if(users[i].password==password){
                    return users[i].name;
                }
            }
        }
        return null;
    }
}
const users=[];