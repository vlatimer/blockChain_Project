import closeLogo from '../../../images/close.png'
import { Title }from './modalComponents/title-modal'
import { Cost } from './modalComponents/cost-modal'
import { Creator } from './modalComponents/name-modal'
import { EmployeeView } from './modalComponents/employee-modal';
import { CreatorView } from './modalComponents/creator-modal';
import { Status } from './modalComponents/status-modal';

export function ModalOrder({ dispatch, auth, order, setOrderId }) {

  return (
    <div className="modal-order__box">
      <div className="order">
        <button className="xmark" onClick={() => setOrderId(0)}>
          <img src={closeLogo} alt='X'/>
        </button>

        <Title order={order}/>
        <Cost order={order}/>
        <Creator order={order}/>
        <Status order={order}/>
        <EmployeeView order={order} auth={auth} dispatch={dispatch}/>
        <CreatorView order={order} auth={auth} dispatch={dispatch}/>
      </div>
    </div>
  )
}