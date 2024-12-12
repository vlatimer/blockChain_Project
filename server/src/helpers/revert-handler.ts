const CREATEORDER_NOT_EHOUGH_MONEY = 'Not enough money';
const ACCEPTORDER_YOURE_OWN_ORDER = "You can't accept own order";
const ACCEPTORDER_ORDER_IS_HANDELED = 'Order is already handeled';
const COMPLETEORDER_NOT_YOURS = 'You not working on that order';
const SUBMITORDER_ORDER_IS_NOT_HADELED = 'Order is not handeled yet';

function getErrorMessage(error) {
  try {
    let errFlat = JSON.stringify(error);
    let { innerError : { message } } = JSON.parse(errFlat);
  
    message = message.replace('VM Exception while processing transaction: revert ', '');
    return message;
  } catch(e){
    throw error;
  }
}

export function getRevertError(error){
  const errorMessage = getErrorMessage(error);

  switch(errorMessage){
    case CREATEORDER_NOT_EHOUGH_MONEY:
      return {
        message: CREATEORDER_NOT_EHOUGH_MONEY,
        status: 'reverted',
      }
    case ACCEPTORDER_YOURE_OWN_ORDER:
      return {
        message: CREATEORDER_NOT_EHOUGH_MONEY,
        status: 'reverted',
      }
    case ACCEPTORDER_ORDER_IS_HANDELED:
      return {
        message: ACCEPTORDER_ORDER_IS_HANDELED,
        status: 'reverted',
      }
    case COMPLETEORDER_NOT_YOURS:
      return {
        message: COMPLETEORDER_NOT_YOURS,
        status: 'reverted',
      }
    case SUBMITORDER_ORDER_IS_NOT_HADELED:
      return {
        message: SUBMITORDER_ORDER_IS_NOT_HADELED,
        status: 'reverted',
      }
    default:
      return {
        message: `Unknown error: ${errorMessage}`,
        status: 'reverted',
      }
  }
}