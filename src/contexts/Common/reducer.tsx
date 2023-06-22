import { actionType } from './action';

export default function commonReducer(state: any, action: any) {
  switch (action.type) {
    case actionType.SET_LOADING:
      return {
        ...state,
        isLoading: action?.isLoading,
      };
    case actionType.SHOW_MODAL:
      return {
        ...state,
        showModal: action?.showModal,
      };
    case actionType.SHOW_MODAL_LOGIN_GMAIL:
      return {
        ...state,
        showModalLoginGmail: action?.showModalLoginGmail,
      };
    case actionType.INFOR_GMAIL:
      return {
        ...state,
        inforGmail: action?.inforGmail,
      };
    case actionType.RESTORE_STATE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
