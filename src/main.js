// 使用伪代码描述 不保证可运行
import EventBus from "./EventBus";


const eventBus = new EventBus()


const m = {
    data:{
        //购买数量
        n :1,
        price: 50 ,
        //总价
        total: function (){
            return m.data.n * m.data.price
        }
    },
    dataChangeListener:null,
    update(n){
        // TODO 处理业务逻辑 购买数量不能超过库存量
        m.data.n = parseInt(n)
        // 5. Model ---> View Model 处理完业务逻辑，数据修改完成后。通知 View 需要展示最新数据
        m.notifyDatasetChange()
    },
    getN(){
      return m.data.n
    },
    getData(){
        return m.data
    },
    // 价格变动 或者 库存不足
    receiverPush(newPrice,newN){
        m.data.price =  newPrice
        m.data.n = newN
        // 4. Model ---> View
        m.notifyDatasetChange()
    },
    notifyDatasetChange(){
        m.dataChangeListener(m.data)
    },
    setOnDataChangeListener(fn){
        m.dataChangeListener = fn

    }

}
const v = {
    input: document.querySelector('#input1'),
    price:document.querySelector('#span1'),
    button:document.querySelector('#button1'),

    init(){
        // 1 View  ——>  Model 监听 Model 数据改变，以便更新数据
        m.setOnDataChangeListener(v.render)

    },
    render(data) {
        //  render view with data
        v.input.value  = data.n    // TODO show  缺货提示
        v.price.textContent  = data.total()
    },

}
const c = {
    init(){
        // bind event   2. Controller ——> View  调用 View 提供的接口，监听 View 的事件
        v.input.addEventListener('input', c.onUserTypeContent)
        v.button.addEventListener('click',c.btnAdd1Click)
        v.render(m.getData())
    },
    // handle user type
    onUserTypeContent(e){
        let value  =  e.target.value;
        if(value === '' )
            value = 0
        // update data   4. Controller ——> Model  收到 View 的通知后，去调用 Model 的借口修改数据（处理业务）
        m.update(value)
    },
    btnAdd1Click() {
        let n = m.getN()
        n += 1
        // update data   4. Controller ——> Model  收到 View 的通知后，去调用 Model 的借口修改数据（处理业务）
        m.update(n)
    }
}
v.init()
c.init()
