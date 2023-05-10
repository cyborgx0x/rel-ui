import { actionType } from './action';

export default function userReducer(state: any, action: any) {
  switch (action.type) {
    case actionType.INITIALIZE: {
      const { isAuthenticated, user } = action?.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    }
    case actionType.LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case actionType.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
}
