import EventBus from "./EventBus.js";


const eventBus = new EventBus()

function f1(data) {
    console.log('f1   '+ data)
}
function f2(data) {
    console.log('f2   '+ data)
}
eventBus.on('event1',f1)

eventBus.on('event1',f2)

eventBus.trigger('event1',3)

eventBus.off('event1',f2)

eventBus.emit('event1',5)




