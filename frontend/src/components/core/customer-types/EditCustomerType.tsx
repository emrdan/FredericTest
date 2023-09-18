import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FredericInvoice } from '../../../lib/service-providers/frederic-invoice';
import { CustomerType } from '../../../models/ordering/invoice-service-provider';

export const EditCustomerType = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data } = useQuery(['CustomerType'], fetchCustomerType);

  async function fetchCustomerType() {
    return await new FredericInvoice().getCustomerTypeById(parseInt(id!));
  }


  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(data?.description || "");
  }, [data])

  async function onSubmit (e: any) {
    e.preventDefault();
    
    await new FredericInvoice().updateCustomerType(
        parseInt(id!),
       description
    )
    
    navigate("/customer-types");
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
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter description"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="add-button mt-5  w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Customer Type
            </button>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <Link to="/customer-types">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
};