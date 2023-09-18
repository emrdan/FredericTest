import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FredericInvoice } from '../../../lib/service-providers/frederic-invoice';

export const AddCustomerType = () => {
  let navigate = useNavigate();

  const [description, setDescription] = useState("");

  async function onSubmit (e: any) {
    e.preventDefault();
    
    await new FredericInvoice().createCustomerType(
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
              placeholder="Description"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="add-button mt-5  w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Customer Type
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