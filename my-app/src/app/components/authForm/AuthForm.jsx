import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getFormData } from "../../helper";

export function AuthForm({setAuth, auth, setLoading}){
  const navigate = useNavigate();
  const [loginValue, setLogin] = useState('');
  const [passwordValue, setPassword] = useState('');

  const logInUser = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = getFormData(e);
    try {
      const response = await fetch(`http://localhost:8080/api/auth?login=${formData.login}&password=${formData.password}`, {
        method: 'GET',
      })
      const data = await response.json();

      if(data.status === 'found'){
        console.log(data);
        setAuth(data.data.name, data.data.publicKey, true) && navigate('/home');
      }
    } catch(error) {
      console.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, [setAuth, navigate, setLoading]);

  function inputChange(event){
    setLogin(event.target.value);
  }
  function passwordChange(event){
    setPassword(event.target.value);
  }

  useEffect(() => {
    if(auth.isAuthorized){
      setLogin(auth.username);
    }
  }, [auth])

  return (
    <>
      <form className="auth__form form" onSubmit={(e) => logInUser(e)}>
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
            className="form__input"
            name="password"
            placeholder="Пароль"
            value={passwordValue}
            onChange={passwordChange}>
          </input>
          <input
            className="form__submit"
            type="submit"
            disabled={ (loginValue.trim() && passwordValue.trim()) ? false : true }
            value='Отправить'/>
        </div>
      </form>
    </>
  )
}