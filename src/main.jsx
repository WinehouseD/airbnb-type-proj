import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { seedLocalDatabase } from '@/api/data/seed';
import AuthProvider from '@/components/AuthProvider';
import ThemeProvider from '@/components/ThemeProvider';
import { store } from '@/state/store';

import Router from './Router';

import './index.css';

seedLocalDatabase();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <Provider store={store}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </QueryClientProvider>,
);
