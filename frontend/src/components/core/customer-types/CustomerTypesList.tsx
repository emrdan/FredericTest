import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FredericInvoice } from '../../../lib/service-providers/frederic-invoice';
import { CustomerType } from '../../../models/ordering/invoice-service-provider';

export const CustomerTypesList = () => {
  const { isLoading, isError, data } = useQuery(['CustomerTypes'], fetchCustomerTypes);

  async function fetchCustomerTypes () {
    const customerTypes: CustomerType[] = await new FredericInvoice().getAllCustomerTypes();

    return customerTypes;
  }
  
  return (
    <React.Fragment>
      {isLoading && <p>Customer types are loading....</p>}
      {isError && <p>An error has ocurred while loading customer types.</p>}
      {data!.length > 0 ? (
        <React.Fragment>
          {data!.map((customerType: CustomerType) => (
            <div
              className="flex items-center bg-gray-100 mb-10 shadow"
              key={customerType.id}
            >
              <div className="flex-auto text-left px-4 py-2 m-2">
                <p className="text-gray-900 leading-none">
                  {customerType.description}
                </p>
              </div>
            </div>
          ))}
        </React.Fragment>
      ) : (
        <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
      )}
    </React.Fragment>
  );
};