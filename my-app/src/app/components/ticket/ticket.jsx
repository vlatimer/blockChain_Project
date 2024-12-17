import transferLogo from '../../../images/arrows.png'
import { Token } from '../token/token';
import './transfer.css';

const DEPLOYER = 'DEPLOYER';

export function Ticket({ ticket }) {
  return (
    <div className='transfer'>
      <h4>Транзакция</h4>
      <div className='transfer__box'>
        <p className='transfer__from'>{ticket.from.name === DEPLOYER ? 'Контракт' : ticket.from.name}</p>
        <img className='transfer__logo' src={transferLogo} alt="Перевод" />
        <p className='transfer__to'>{ticket.to.name === DEPLOYER ? 'Контракт' : ticket.to.name}</p>
      </div>
      <p className='transfer__amount'>Сумма: <strong>{ticket.amount}</strong><Token/></p>
    </div>
  )
}