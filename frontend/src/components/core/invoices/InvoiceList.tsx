import { useQuery } from '@tanstack/react-query';
import { FredericInvoice } from '../../../lib/service-providers/frederic-invoice';
import { Customer, Invoice } from '../../../models/ordering/invoice-service-provider';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const InvoicesList = () => {
  const { isLoading, isError, refetch, data = [] } = useQuery(['Invoices'], fetchInvoices);
  let navigate = useNavigate();

  async function fetchInvoices () {
    return await new FredericInvoice().getAllInvoices();
  }

  async function deleteInvoiceById(id: number) {
    await new FredericInvoice().deleteInvoice(id);
    refetch();
  }
  
  return (
    <>
      <Link className="add" to="/invoices/add">Add a new Invoice</Link>
      {isLoading && <p>Invoices are loading....</p>}
      {isError && <p>An error has ocurred while loading invoices.</p>}
      {data.length > 0 ? (
        <>
          {data.map((invoice: Invoice) => (
            <div
              className="flex items-center bg-gray-100 mb-10 shadow"
              key={invoice.id}
            >
              <div className="flex-auto text-left px-4 py-2 m-2">
                <div className="flex justify-between">
                    <p className="text-gray-900 leading-none">
                        Total: {invoice.total}
                    </p>
                </div>
                <p className="text-gray-600">
                  With ITBIS: {invoice.totalItbis}
                </p>
                <span className="inline-block text-sm font-semibold mt-1">
                  Charged to: {invoice.customer.name}
                </span>
                <div className="controls flex justify-end">
                    <Link to={`/invoices/${invoice.id}/edit`}>Edit</Link>
                    <span onClick={() => deleteInvoiceById(invoice.id)}>Delete</span>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
      )}
    </>
  );
};