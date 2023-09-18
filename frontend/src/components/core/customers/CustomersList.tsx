import { useQuery } from '@tanstack/react-query';
import { FredericInvoice } from '../../../lib/service-providers/frederic-invoice';
import { Customer } from '../../../models/ordering/invoice-service-provider';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const CustomersList = () => {
  const { isLoading, isError, refetch, data = [] } = useQuery(['Customers'], fetchCustomers);
  let navigate = useNavigate();

  async function fetchCustomers () {
    return await new FredericInvoice().getAllCustomers();
  }

  async function deleteCustomerById(id: number) {
    await new FredericInvoice().deleteCustomer(id);
    refetch();
  }
  
  return (
    <>
      <Link className="add" to="/customers/add">Add a new Customer</Link>
      {isLoading && <p>Customers are loading....</p>}
      {isError && <p>An error has ocurred while loading customers.</p>}
      {data.length > 0 ? (
        <>
          {data.map((customer: Customer) => (
            <div
              className="flex items-center bg-gray-100 mb-10 shadow"
              key={customer.id}
            >
              <div className="flex-auto text-left px-4 py-2 m-2">
                <div className="flex justify-between">
                    <p className="text-gray-900 leading-none">
                        {customer.name}
                    </p>
                    <span className="inline-block text-sm font-semibold mt-1">
                        {customer.status ? 'Active': 'Inactive'}
                    </span>
                </div>
                <p className="text-gray-600">
                  {customer.address}
                </p>
                <span className="inline-block text-sm font-semibold mt-1">
                  {customer.customerType.description}
                </span>
                <div className="controls flex justify-end">
                    <Link to={`/customers/${customer.id}/edit`}>Edit</Link>
                    <span onClick={() => deleteCustomerById(customer.id)}>Delete</span>
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