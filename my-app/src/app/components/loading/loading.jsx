import load from '../../../images/loading_logo.png'
import './loading-styles.css';

export function Loading(){
  return (
    <div className='loading__window'>
      <div className='loading__box'>
        <img className='loading__icon' src={load} alt="загрузка"/>
      </div>
    </div>
  )
}