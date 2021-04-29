

//简易版EventBus
class  EventBus {


    constructor() {
        this._events = {}
    }
    on(eventName,callback){
        if(!this._events[eventName]){
            this._events[eventName] = [callback]
        }else {
            this._events[eventName].push(callback)
        }
    }
    off(eventName,callback){
        if(this._events[eventName]) {
            this._events[eventName].forEach((item,index)=>{
                if(item === callback) {
                    this._events[eventName].splice(index,1)
                }
            })
        }
    }
    trigger(eventName,data){
        if(this._events[eventName]){
            this._events[eventName].forEach((item)=>{
                item.call(this,data)
            })

        }

    }
    // vue 中的 命名
    emit(eventName,data){
        this.trigger.apply(this,arguments)
    }
}

export  default EventBus
