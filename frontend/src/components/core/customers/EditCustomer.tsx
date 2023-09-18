import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FredericInvoice } from '../../../lib/service-providers/frederic-invoice';
import { CustomerType } from '../../../models/ordering/invoice-service-provider';

export const EditCustomer = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const customerToEdit = useQuery(['Customer'], fetchCustomer);
  const { isLoading, data = [] } = useQuery(['CustomerTypes'], fetchCustomerTypes);

  async function fetchCustomer() {
    return await new FredericInvoice().getCustomerById(parseInt(id!));
  }
  async function fetchCustomerTypes () {
    return await new FredericInvoice().getAllCustomerTypes();
  }

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("true");
  const [customerTypeId, setCustomerTypeId] = useState(1);

  useEffect(() => {
    setName(customerToEdit.data?.name || '');
    setAddress(customerToEdit.data?.address || '');
    setStatus(`${customerToEdit.data?.status}`);
    setCustomerTypeId(customerToEdit.data?.customerType?.id || 1);
  }, [customerToEdit.data])

  async function onSubmit (e: any) {
    e.preventDefault();
    
    await new FredericInvoice().updateCustomer(
        parseInt(id!),
        name,
        address,
        (status === 'false' ? false : true),
        customerTypeId
    )
    
    navigate("/customers");
  };

  return (
    <>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Customer Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter address"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="customertype"
            >
              Status
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
                <option value="true">Active</option>
                <option value="false">Inactive</option>

            </select>
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="customertype"
            >
              Customer Type
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={customerTypeId}
              onChange={(e) => setCustomerTypeId(parseInt(e.target.value))}
            >
                {isLoading 
                    ? <option value="1">Loading...</option>
                    : <>
                        {data.map((ctype: CustomerType) => (
                        <option key={ctype.id} value={ctype.id}>{ctype.description}</option>
                        ))}
                      </>
                }
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button className="add-button mt-5  w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Customer
            </button>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <Link to="/customers">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
};