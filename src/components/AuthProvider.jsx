import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '@/api';
import { addUser } from '@/state/users/usersSlice';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  const user = users[userId] || null;

  const setUser = useCallback(
    (user) => {
      if (user) {
        dispatch(addUser(user));
        setUserId(user.id);
      } else {
        setUserId(null);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/me');
        setToken(response.data.accessToken);
        setUser(response.data.user);
      } catch {
        setToken(null);
        setUser(null);
      }
    };

    fetchMe();
  }, [dispatch, setUser]);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === 'Unauthorized'
        ) {
          try {
            const response = await api.get('/api/refreshToken');

            setToken(response.data.accessToken);
            setUser(response.data.user);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
            setUser(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ setToken, setUser, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
