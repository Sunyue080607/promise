console.log(1)
new Promise((resolve,reject)=>{
    console.log(2);
    resolve("sunyue")
}).then(
    value=>{
        console.log(4)
    console.log("value:"+value)
}, reason => {
    console.log("reason:"+reason)
    }
)
console.log(3)