module.exports=class mypromise {
    constructor(execute) {
        let that=this;
        that.state='pending';
        that.value=undefined;
        that.reason=undefined;
        that.onFulfilledCallback=[];
        that.onRejectedCallback=[];
        const resolve=(value)=>{
            if(that.state==='pending'){
                that.state='fulfilled';
                that.value=value;
                that.onFulfilledCallback.forEach((cb)=>{cb()})
            }
        }
        const reject=(reason)=>{
            if(that.state==='pending'){
                that.state='rejected';
                that.reason=reason;
                that.onRejectedCallback.forEach((cb)=>{cb()})
            }
        }
        try{
            execute(resolve,reject)
        }catch (e) {
            throw e
        }
    }
    then(onFulfilled,onRejected){
        const that=this;
        onFulfilled=typeof onFulfilled==='function'?onFulfilled:value=>value;
        onRejected=typeof onRejected==='function'?onRejected:reason=>{throw reason}
        let promise2 = new mypromise((resolve,reject)=>{
            if(that.state==='fulfilled'){
                setTimeout(()=>{
                    const x=onFulfilled(that.value);
                    resolve(x);
                })
            }
            if(that.state==='rejected'){
                setTimeout(()=>{
                    const x =onRejected(that.reason);
                    reject(x)
                })
            }
            if(that.state==='pending'){
                that.onFulfilledCallback.push(()=>{
                    const x=onFulfilled(that.value);
                    resolve(x)
                })
                that.onRejectedCallback.push(()=>{
                    const x=onRejected(that.reason);
                    reject(x)
                })
            }
        })
        return promise2
    }
}