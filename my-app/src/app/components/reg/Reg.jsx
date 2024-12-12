import { Link } from "react-router-dom"
import { RegForm } from "../regForm/regForm"

export function Reg({setAuth}){
  return (
    <div className="reg">
      <div className="reg__box glass">
        <RegForm setAuth={setAuth}/>
        <Link className="link_to" to='/auth'>Войти</Link>
      </div>  
    </div>
  )
}