import formview from "./formview.modal.js";
export default class formuserQues{
    static addForm(ques,Username){
         var key=generateRandomString(25);
         while(!formview.checkKey(key)){
            key=generateRandomString(25);
         }
         if(!dataq[Username]){
         dataq[Username]=[];}
         dataq[Username].push(key);
        formview.addFormQue(ques,key);
        return key;
    }
    
    static GetDataincompresed(Username){
      let datar=[];
      for(let x in dataq[Username]){
        let temp=formview.getQuestion(dataq[Username][x]);
        if(temp){datar.push({key:dataq[Username][x],name:temp.name,description:temp.description});}
      }
      return datar;
    }
    static checkKeyInUser(key,Username){
      for(let x in dataq[Username]){
        if(dataq[Username][x]==key){return true;}
      }
      return false;
    }
    static removeForm(key,Username){
      if(dataq[Username]){
        var temp= dataq[Username];
        dataq[Username] = temp.filter(item => item !== key);
      }
    }

}



function generateRandomString(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charsetLength = charset.length;
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      result += charset.charAt(randomIndex);
    }
    
    return result;
  }

  var dataq={};
