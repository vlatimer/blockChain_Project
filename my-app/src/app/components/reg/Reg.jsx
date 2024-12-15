import { Link } from "react-router-dom"
import { RegForm } from "../regForm/regForm"
import { Loading } from "../loading/loading"
import { useState } from "react"

export function Reg({setAuth}){
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <div className="reg">
        <div className="reg__box glass">
          <RegForm setAuth={setAuth} setLoading={setLoading}/>
          <Link className="link_to" to='/auth'>Войти</Link>
        </div>
      </div>
      {isLoading ? (<Loading/>) : ''}
    </>
  )
}