import { useContext } from 'react';
import AuthContext from '../context/auth/auth-context';

export default function useAuth() {
  return useContext(AuthContext);
}