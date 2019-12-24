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
        onFulfilled=typeof onFulfilled==='function'?onFulfilled:(value)=>value;
        onRejected=typeof onRejected==='function'?onRejected:(reason)=>{throw reason}
        if(that.state==='fulfilled'){
            setTimeout(()=>{
                onFulfilled(that.value)
            })
        }
        if(that.state==='rejected'){
            setTimeout(()=>{
                onRejected(that.reason)
            })
        }
        if(that.state==='pending'){
            that.onFulfilledCallback.push(()=>{
                onFulfilled(that.value)
            })
            that.onRejectedCallback.push(()=>{
                onRejected(that.reason)
            })
        }
    }
}