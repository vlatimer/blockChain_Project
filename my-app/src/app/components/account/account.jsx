import { useCallback, useEffect, useState } from 'react'
import closeLogo from '../../../images/close.png'
import { getTickets } from '../../fetch/tickets';
import { Ticket } from '../ticket/ticket';
import { Token } from '../token/token';
import { getBalance, buyTokens } from '../../fetch/balance';

export function Account({ auth, setAccountOpen }){
  const [tickets, setTickets] = useState([]);
  const [balance, setBalance] = useState(0);
  const [inputValue, setInputValue] = useState('')

  const inputCost = useCallback((e) => {
    setInputValue(e.target.value);
  }, [setInputValue]);

  const handleBuyTokens = useCallback(async () => {
    const data = await buyTokens(auth, inputValue);

    if(data.status === 'success') {
      setBalance(data.response);
    }
  }, [auth, inputValue, setBalance])

  const isPaymentValid = useCallback(() => {
    if(/^\d+$/.test(inputValue)){
      return false;
    }
    return true;
  }, [inputValue])

  useEffect(() => {
    (async () => {
      const data1 = await getTickets(auth);
      if(data1.status === 'success'){
        setTickets(data1.response);
      }

      const data2 = await getBalance(auth);
      if(data2.status === 'success'){
        setBalance(data2.response);
      }
    })()
  }, [auth, setTickets, setBalance])

   return (
    <div className='account__window'>
      <div className='account__box'>
        <button className="xmark" onClick={() => {setAccountOpen(false)}}>
          <img src={closeLogo} alt='X'/>
        </button>
        <div className='account__name'>
          <h2>{auth.username}</h2>
          <p>Баланс: <span>{balance}</span> <Token/></p>
        </div>
        <div className='account__buy'>
          <input placeholder='wei' className="account__input" type="text" value={inputValue} onChange={inputCost}/>
          <button className='account__submit' onClick={handleBuyTokens}
            disabled={isPaymentValid()}
          >Пополнить баланс</button>
        </div>
        <div className='transfer__array'>
          <p className='transfer__header'>Список транзакций:</p>
          <div className='transfers'>
            {tickets.map((ticket, i) => 
              (<Ticket key={i} ticket={ticket}/>)
            )}
          </div>
        </div>
      </div>
    </div>
   )
}