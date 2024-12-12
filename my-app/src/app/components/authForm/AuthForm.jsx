import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getFormData } from "../../helper";

export function AuthForm({setAuth, auth}){
  const navigate = useNavigate();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [loginValue, setLogin] = useState('');

  const logInUser = useCallback(async (e) => {
    e.preventDefault();

    const formData = getFormData(e);
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/auth/${formData.login}`, {
        method: 'GET',
      })
      const data = await response.json();

      if(data.status === 'found'){
        console.log(data);
        setAuth(data.data.name, data.data.publicKey, true) && navigate('/home');
      }
    } catch(error){
      console.error('Failed to fetch');
    }finally{
      setLoading(false);
    }
  }, [form, setAuth, navigate]);

  function inputChange(event){
    setLogin(event.target.value);
  }

  useEffect(() => {
    if(auth.isAuthorized){
      setLogin(auth.username);
    }
  }, [auth])

  return (
    <>
    {loading ? (<p>Загрузка</p>) : 
        (<form className="auth__form form" ref={form} onSubmit={(e) => logInUser(e)}>
          <h1 className="form__header">Войдите в аккаунт</h1>
          <div className="form__ui">
            <input
              className="form__input"
              name="login"
              placeholder="Логин"
              value={loginValue}
              onChange={inputChange}>
            </input>
            <input
              className="form__submit"
              type="submit"
              disabled={ loginValue.trim() ? false : true }
              value='Отправить'/>
          </div>
        </form>)
        }
    </>
  )
}