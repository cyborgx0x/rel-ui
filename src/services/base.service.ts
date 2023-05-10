import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { EqualityFn } from 'react-redux/src/types';

import store, { AppState, AppDispatch } from '../state/redux/store';

export class BaseService {
  static dispatch = store.dispatch;

  static useDispatch = useDispatch<AppDispatch>;

  static useSelector = <T>(selector: (state: AppState) => T, equalityFn?: EqualityFn<T>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSelector<AppState, T>(selector, equalityFn || shallowEqual);
  };
}
