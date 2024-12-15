import { Link } from "react-router-dom"
import { AuthForm } from "../authForm/authForm"
import { Loading } from "../loading/loading"
import { useState } from "react"

export function Auth({auth, setAuth}){
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <div className="auth">
        <div className="auth__box glass">
          <AuthForm setAuth={setAuth} auth={auth} setLoading={setLoading}/>
          <Link className="link_to" to='/reg'>Регистрация</Link>
        </div>
      </div>
      {isLoading ? (<Loading/>) : ''}
    </>
  )
}