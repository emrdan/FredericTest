import { useQuery } from '@tanstack/react-query';
import { FredericInvoice } from '../../../lib/service-providers/frederic-invoice';
import { Customer, InvoiceDetail } from '../../../models/ordering/invoice-service-provider';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const InvoiceDetailsList = () => {
  const { isLoading, isError, refetch, data = [] } = useQuery(['InvoiceDetails'], fetchInvoiceDetails);
  let navigate = useNavigate();

  async function fetchInvoiceDetails () {
    return await new FredericInvoice().getAllInvoiceDetails();
  }

  async function deleteInvoiceDetailById(id: number) {
    await new FredericInvoice().deleteInvoiceDetail(id);
    refetch();
  }
  
  return (
    <>
      <Link className="add" to="/invoice-details/add">Add a new Invoice Detail</Link>
      {isLoading && <p>Invoice Details are loading....</p>}
      {isError && <p>An error has ocurred while loading invoice details.</p>}
      {data.length > 0 ? (
        <>
          {data.map((invDetail: InvoiceDetail) => (
            <div
              className="flex items-center bg-gray-100 mb-10 shadow"
              key={invDetail.id}
            >
              <div className="flex-auto text-left px-4 py-2 m-2">
                <div className="flex justify-between">
                    <p className="text-gray-900 leading-none">
                        Price: {invDetail.price}
                    </p>
                </div>
                <p className="text-gray-600">
                  Quantity: {invDetail.quantity}
                </p>
                <p className="text-gray-600">
                  Subtotal: {invDetail.subtotal}
                </p>
                <span className="inline-block text-sm font-semibold mt-1">
                  Invoice Id: {invDetail.invoiceId}
                </span>
                <div className="controls flex justify-end">
                    <Link to={`/invoice-details/${invDetail.id}/edit`}>Edit</Link>
                    <span onClick={() => deleteInvoiceDetailById(invDetail.id)}>Delete</span>
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