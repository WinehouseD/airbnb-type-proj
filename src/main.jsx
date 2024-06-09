import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';
import { store } from './state/store';
import { AuthProvider } from '@/components/AuthProvider';

import Router from './Router';

import './index.css';

seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  </ThemeProvider>,
);
