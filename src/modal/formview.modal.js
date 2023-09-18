export default class formview{
    static checkKey(key){
        if(!datav[key]){
            return true;
        }
        return false;
    }
    static addFormQue(ques,key){
        datav[key]=ques;
    }
    static getQuestion(key){
        return datav[key];
    }
    static addDataAnswers(key,ans){
        if(!dataA[key]){
            dataA[key]=[]
        }
        dataA[key].push(ans);
    }
    static getAnswers(key){
        if(!dataA[key]){
            return null;
        }
        else{
            return dataA[key];
        }
    }
    static deleteAnswer(key){
        if(dataA[key]){
            delete dataA[key]
        }
    }
    static deleteQuestion(key){
        if(datav[key]){
            delete datav[key];
        }
    }
}
var datav={};
var dataA={};