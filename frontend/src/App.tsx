import './App.css'
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotFoundRoute } from './components/routing/NotFoundRoute';
import { CustomerTypesList } from './components/core/customer-types/CustomerTypesList';
import { CustomersList } from './components/core/customers/CustomersList';
import { AddCustomer } from './components/core/customers/AddCustomer';
import { EditCustomer } from './components/core/customers/EditCustomer';
import { AddInvoice } from './components/core/invoices/AddInvoice';
import { EditInvoice } from './components/core/invoices/EditInvoice';
import { InvoicesList } from './components/core/invoices/InvoiceList';
import { EditInvoiceDetail } from './components/core/invoice-details/EditInvoiceDetail';
import { AddInvoiceDetail } from './components/core/invoice-details/AddInvoiceDetail';
import { InvoiceDetailsList } from './components/core/invoice-details/InvoiceDetailsList';
import { EditCustomerType } from './components/core/customer-types/EditCustomerType';
import { AddCustomerType } from './components/core/customer-types/AddCustomerType';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 1000,
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
            <Route path="/customers" element={<CustomersList />} />
            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/customers/:id/edit" element={<EditCustomer />} />
            <Route path="/customer-types" element={<CustomerTypesList />} />
            <Route path="/customer-types/add" element={<AddCustomerType />} />
            <Route path="/customer-types/:id/edit" element={<EditCustomerType />} />        
            <Route path="/invoices" element={<InvoicesList />} />
            <Route path="/invoices/add" element={<AddInvoice />} />
            <Route path="/invoices/:id/edit" element={<EditInvoice />} />
            <Route path="/invoice-details" element={<InvoiceDetailsList />} />
            <Route path="/invoice-details/add" element={<AddInvoiceDetail />} />
            <Route path="/invoice-details/:id/edit" element={<EditInvoiceDetail />} />
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
