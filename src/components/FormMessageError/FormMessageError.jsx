



import style from './FormMessageError.module.css'
export const FormMessageError=({msg})=>{

    return <span className={style.error}>{msg}</span>
}
