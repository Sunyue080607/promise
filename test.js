let mypromise=require('./mypromise');
console.log(1)
new mypromise((resolve,reject)=>{
    console.log(2);
    resolve('sunyue')
}).then(
    value=>{
        console.log(4)
        console.log("value:"+value)
        return value
    }, reason => {
        console.log("reason:"+reason)
    }
).then((value)=>{
    console.log("value2:"+value)
},(reason)=>{
    console.log(reason)
})
console.log(3)