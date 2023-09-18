import './App.css'
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotFoundRoute } from './components/routing/NotFoundRoute';
import { CustomerTypesList } from './components/core/customer-types/CustomerTypesList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <NavLink to={"/customers"}>Customers</NavLink>
        <NavLink to={"/customer-types"}>Customer Types</NavLink>
        <NavLink to={"/invoices"}>Invoices</NavLink>
        <NavLink to={"/invoice-details"}>Invoice Details</NavLink>
      </div>
      <div className="content">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/customer-types" />} />
            <Route path="/customer-types" element={<CustomerTypesList />} />
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
