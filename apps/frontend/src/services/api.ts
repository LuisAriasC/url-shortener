import axios from 'axios';
import { from, Observable } from 'rxjs';

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export function fromAxios<T>(request: Promise<T>): Observable<T> {
  return from(request.then(res => res));
}