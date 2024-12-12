import { useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getFormData } from '../../helper';

export function RegForm({setAuth}){
  const navigate = useNavigate();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [loginValue, setLogin] = useState('');

  const regUser = useCallback(async (e) => {
    e.preventDefault();

    const formData = getFormData(e);
    try {
      setLoading(true);

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

    } catch(error){
      console.error('Failed to fetch');
    }finally{
      setLoading(false);
    }
  }, [form, setAuth, navigate]);

  function inputChange(event){
    setLogin(event.target.value);
  }

  return (
    <>
    {loading ? (<p>Загрузка</p>) : 
        (<form className="reg__form form" ref={form} onSubmit={(e) => regUser(e)}>
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
        </form>)
        }
    </>
  )
}