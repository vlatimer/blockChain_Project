import closeLogo from '../../../images/close.png'

export function Account({}){
   return (
    <div>
      <div>
        <h2>Тут имя</h2>
        <button className="xmark" onClick={() => {setCreating(false)}}>
          <img src={closeLogo}/>
        </button>
      </div>
    </div>
   )
}