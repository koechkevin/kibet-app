import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { logout } from './redux/actions/authentication';

export const axiosErrorHandler = (e: AxiosError, dispatch: Dispatch) => {
  switch (e?.response?.status) {
    case 401:
      logout(dispatch);
      break;
    case 403:
      logout(dispatch);
      break;
    default:
      break;
  }
};

const prependZero = (value: number): string => value < 10 ? `0${value}`: value.toString();

export const dateFormat = (value: number): string => {
  const days = Math.floor(value / (1000 * 60 * 60 * 24));
  const hours = Math.floor((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor(((value % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((((value % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) % (1000 * 60))/ 1000);
  return `${days ? days + ':': ''}${(days || hours) ? prependZero(hours) + ':' : '' }${prependZero(minutes) + ':'}${prependZero(seconds)}`
};
