import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getFormData } from '../../helper';

export function RegForm({setAuth, setLoading}){
  const navigate = useNavigate();

  const [loginValue, setLogin] = useState('');

  const regUser = useCallback(async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = getFormData(e);
    try {

      const response = await fetch(`http://localhost:8080/api/auth`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: formData.login }),
      })
      const data = await response.json();

      console.log(data)
      if(data.status === 'written'){
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

  return (
    <>
      <form className="reg__form form" onSubmit={(e) => regUser(e)}>
        <h1 className="form__header">Регистрация</h1>
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
      </form>
    </>
  )
}