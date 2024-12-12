// import { useCallback } from 'react'
import userLogo from '../../../images/user.png'
import logo from '../../../images/block.png'
// import { ADD_ORDER } from '../../reducer'

export function Header({ auth, setCreating}){
  return (
    <div className='header__box'>
      <img className='logo' src={logo} alt='X'/>
      <div className='header__ui'>
      <button className='header__create' onClick={() => {setCreating(true)}}>Создать заказ</button>
      <button className='header__account'>
        <p>{auth.username}</p>
        <img src={userLogo}/>
      </button>
      </div>
    </div>
  )
}