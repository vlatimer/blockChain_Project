// import { useCallback } from 'react'
import userLogo from '../../../images/user.png'
import logo from '../../../images/block.png'
import { useCallback, useState, useEffect } from 'react'
import { UPLOAD_ORDERS } from '../../reducer'
import { getOrders } from '../../fetch/order'
import { Account } from '../account/account'

const ALL = 'accessible'
const CREATOR = 'creator'
const EMPLOYEE = 'employee'

export function Header({ auth, dispatch, setCreating, setLoading }){
  const [active, setActive] = useState(ALL);
  const [isAccountOpen, setAccountOpen] = useState(false);

  const ordersHandler = useCallback(async (whatActive) => {
    if(active === whatActive) return;

    setLoading(true);

    const data = await getOrders(auth, whatActive);

    if(data.status === "success") {
      dispatch({type: UPLOAD_ORDERS, payload: data.response});
      setActive(whatActive)
    }

    setLoading(false);
  }, [active, setLoading, auth, dispatch, setActive])

  useEffect(() => {
    (async () => {
      setLoading(true);

      const data = await getOrders(auth, ALL);

      if(data.status === "success"){
        dispatch({type: UPLOAD_ORDERS, payload: data.response});
      }
      setLoading(false);
    })();
  }, [auth, dispatch, setLoading])

  return (
    <div className='header__box'>
      <img className='logo' src={logo} alt='logo'/>
      <div className='header__filters'>
        <button 
          className={'filter__btn ' + (active === ALL ? 'active': '')}
          onClick={() => ordersHandler(ALL)}>
            Все
        </button>
        <button
          className={'filter__btn ' + (active === CREATOR ? 'active': '')}
          onClick={() => ordersHandler(CREATOR)}>
            Мои заказы
        </button>
        <button 
          className={'filter__btn ' + (active === EMPLOYEE ? 'active': '')}
          onClick={() => ordersHandler(EMPLOYEE)}>
            Мои работы
        </button>
      </div>
      <div className='header__ui'>
        <button className='header__create' onClick={() => {setCreating(true)}}>Создать заказ</button>
        <button className='header__account'
          onClick={() => setAccountOpen(true)}>
          <p>{auth.username}</p>
          <img src={userLogo} alt='пользователь'/>
        </button>
      </div>
      {isAccountOpen ? <Account auth={auth} setAccountOpen={setAccountOpen}/> : ''}
    </div>
  )
}