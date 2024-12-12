import { Link } from "react-router-dom"
import { AuthForm } from "../authForm/AuthForm"

export function Auth({setAuth, auth}){
  return (
    <div className="auth">
      <div className="auth__box glass">
        <AuthForm setAuth={setAuth} auth={auth}/>
        <Link className="link_to" to='/reg'>Регистрация</Link>
      </div>
    </div>
  )
}