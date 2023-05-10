import { actionType } from './action';

export default function commonReducer(state: any, action: any) {
  switch (action.type) {
    case actionType.SET_LOADING:
      return {
        ...state,
        isLoading: action?.isLoading,
      };
    default:
      return state;
  }
}
