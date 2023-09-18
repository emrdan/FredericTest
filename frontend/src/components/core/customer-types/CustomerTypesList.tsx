import { useQuery } from '@tanstack/react-query';
import { FredericInvoice } from '../../../lib/service-providers/frederic-invoice';
import { Customer, CustomerType } from '../../../models/ordering/invoice-service-provider';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const CustomerTypesList = () => {
  const { isLoading, isError, refetch, data = [] } = useQuery(['CustomerTypes'], fetchCustomerTypes);
  let navigate = useNavigate();

  async function fetchCustomerTypes () {
    return await new FredericInvoice().getAllCustomerTypes();
  }

  async function deleteCustomerTypeById(id: number) {
    await new FredericInvoice().deleteCustomerType(id);
    refetch();
  }
  
  return (
    <>
      <Link className="add" to="/customer-types/add">Add a new Customer Type</Link>
      {isLoading && <p>Customer types are loading....</p>}
      {isError && <p>An error has ocurred while loading customer types.</p>}
      {data.length > 0 ? (
        <>
          {data.map((cType: CustomerType) => (
            <div
              className="flex items-center bg-gray-100 mb-10 shadow"
              key={cType.id}
            >
              <div className="flex-auto text-left px-4 py-2 m-2">
                <div className="flex justify-between">
                    <p className="text-gray-900 leading-none">
                        {cType.description}
                    </p>
                </div>
                <div className="controls flex justify-end">
                    <Link to={`/customer-types/${cType.id}/edit`}>Edit</Link>
                    <span onClick={() => deleteCustomerTypeById(cType.id)}>Delete</span>
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