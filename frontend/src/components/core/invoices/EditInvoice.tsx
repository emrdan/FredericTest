import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FredericInvoice } from '../../../lib/service-providers/frederic-invoice';
import { Customer } from '../../../models/ordering/invoice-service-provider';

export const EditInvoice = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const invoiceToEdit = useQuery(['Invoice'], fetchInvoice);
  const { isLoading, data = [] } = useQuery(['Customers'], fetchCustomers);

  async function fetchInvoice() {
    return await new FredericInvoice().getInvoiceById(parseInt(id!));
  }
  async function fetchCustomers () {
    return await new FredericInvoice().getAllCustomers();
  }

  const [customerId, setCustomerId] = useState(1);

  useEffect(() => {
    setCustomerId(invoiceToEdit.data?.customerId || 1);
  }, [invoiceToEdit.data])

  async function onSubmit (e: any) {
    e.preventDefault();
    
    await new FredericInvoice().updateInvoice(
        parseInt(id!),
        customerId
    )
    
    navigate("/invoices");
  };

  return (
    <>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="customertype"
            >
              Pick a Customer
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={customerId}
              onChange={(e) => setCustomerId(parseInt(e.target.value))}
            >
                {isLoading 
                    ? <option value="1">Loading...</option>
                    : <>
                        {data.map((c: Customer) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </>
                }
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button className="add-button mt-5  w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Invoice
            </button>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <Link to="/invoices">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
};