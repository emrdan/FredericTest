import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FredericInvoice } from '../../../lib/service-providers/frederic-invoice';
import { CustomerType, Invoice } from '../../../models/ordering/invoice-service-provider';

export const EditInvoiceDetail = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const invoiceDetailToEdit = useQuery(['InvoiceDetail'], fetchInvoiceDetail);
  const { isLoading, data = [] } = useQuery(['Invoices'], fetchInvoices);

  async function fetchInvoiceDetail() {
    return await new FredericInvoice().getInvoiceDetailById(parseInt(id!));
  }
  async function fetchInvoices () {
    return await new FredericInvoice().getAllInvoices();
  }

  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [invoiceId, setInvoiceId] = useState(1);

  useEffect(() => {
    setPrice(invoiceDetailToEdit.data?.price || 0);
    setQuantity(invoiceDetailToEdit.data?.quantity  || 0);
    setInvoiceId(invoiceDetailToEdit.data?.invoiceId || data[0].id);
  }, [invoiceDetailToEdit.data, data])

  async function onSubmit (e: any) {
    e.preventDefault();
    
    await new FredericInvoice().updateInvoiceDetail(
        parseInt(id!),
        price,
        quantity,
        invoiceId
    )
    
    navigate("/invoice-details");
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
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              step={0.01}
              type="number"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="address"
            >
              Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              step={0.01}
              type="number"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="customertype"
            >
              Pick an Invoice
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={invoiceId}
              onChange={(e) => setInvoiceId(parseInt(e.target.value))}
            >
                {isLoading 
                    ? <option value="1">Loading...</option>
                    : <>
                        {data.map((i: Invoice) => (
                        <option key={i.id} value={i.id}>{i.id}</option>
                        ))}
                      </>
                }
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button className="add-button mt-5  w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Invoice Detail
            </button>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <Link to="/invoice-details">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
};