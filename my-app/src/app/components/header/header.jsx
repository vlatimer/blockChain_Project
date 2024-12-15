// import { useCallback } from 'react'
import userLogo from '../../../images/user.png'
import logo from '../../../images/block.png'
import { useCallback, useState, useEffect } from 'react'
import { UPLOAD_ORDERS } from '../../reducer'

const ALL = 'all'
const CREATOR = 'creator'
const EMPLOYEE = 'employee'

export function Header({ auth, dispatch, setCreating, setLoading}){
  const [active, setActive] = useState(ALL);

  const getMyOrders = useCallback(async () => {
    if(active === CREATOR) return;

    setLoading(true);
    const response = await fetch(`http://localhost:8080/api/orders?account=${auth.publicKey}&filter=creator`, {
      method: 'GET',
    })
    const data = await response.json();
    console.log(data)
    if(data.status === "success"){
      dispatch({type: UPLOAD_ORDERS, payload: data.response});
      setActive(CREATOR)
    }
    setLoading(false);
  }, [auth, dispatch, active, setActive, setLoading])

  const getAllOrders = useCallback(async () => {
    if(active === ALL) return;

    setLoading(true);
    const response = await fetch(`http://localhost:8080/api/orders`, {
      method: 'GET',
    })
    const data = await response.json();
    console.log(data);
    if(data.status === "success"){
      dispatch({type: UPLOAD_ORDERS, payload: data.response});
      setActive(ALL)
    }
    setLoading(false);
  }, [dispatch, active, setActive, setLoading])

  const getWorkOrders = useCallback(async () => {
    if(active === EMPLOYEE) return;

    setLoading(true);
    const response = await fetch(`http://localhost:8080/api/orders?account=${auth.publicKey}&filter=employee`, {
      method: 'GET',
    })
    const data = await response.json();
    console.log(data);
    if(data.status === "success"){
      dispatch({type: UPLOAD_ORDERS, payload: data.response});
      setActive(EMPLOYEE)
    }
    setLoading(false);
  }, [auth, dispatch, active, setActive, setLoading])

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/orders`, {
        method: 'GET',
      })
      const data = await response.json();
      if(data.status === "success"){
        dispatch({type: UPLOAD_ORDERS, payload: data.response});
      }
      setLoading(false);
    })();
  }, [dispatch, setLoading])

  return (
    <div className='header__box'>
      <img className='logo' src={logo} alt='logo'/>
      <div className='header__filters'>
        <button 
          className={'filter__btn ' + (active === ALL ? 'active': '')}
          onClick={getAllOrders}>
            Все
        </button>
        <button 
          className={'filter__btn ' + (active === CREATOR ? 'active': '')}
          onClick={getMyOrders}>
            Мои заказы
        </button>
        <button 
          className={'filter__btn ' + (active === EMPLOYEE ? 'active': '')}
          onClick={getWorkOrders}>
            Мои работы
        </button>
      </div>
      <div className='header__ui'>
        <button className='header__create' onClick={() => {setCreating(true)}}>Создать заказ</button>
        <button className='header__account'>
          <p>{auth.username}</p>
          <img src={userLogo} alt='пользователь'/>
        </button>
      </div>
    </div>
  )
}