import style from './notification.css'

const Notification=({msj,type})=>{
    return  <div id="toasts" className={`${type?"toast "+type:"toast"}`}>{msj}</div>
}

export default Notification