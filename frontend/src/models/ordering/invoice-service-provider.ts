export type CustomerType = {
  id: number,
  description: string
}

export type Customer = {
  id: number,
  name: string,
  address: string,
  status: boolean,
  customerTypeId: number
}

export type Invoice = {
  id: number,
  customerId: number,
  totalItbis: number,
  total: number
}

export type InvoiceDetail = {
  id: number,
  subtotal: number,
  price: number,
  quantity: number,
  invoiceId: number
}

export interface InvoiceServiceProvider {
  getAllInvoiceDetails(): Promise<InvoiceDetail[]>;
  getInvoiceDetailById(id: number): Promise<InvoiceDetail>;
  deleteInvoiceDetail(id: number): Promise<InvoiceDetail>;
  createInvoiceDetail(
    price: number, 
    quantity: number,
    invoiceId: number
  ): Promise<InvoiceDetail>;
  updateInvoiceDetail(
    id: number,
    price: number, 
    quantity: number,
    invoiceId: number
  ): Promise<InvoiceDetail>;
  getAllInvoices(): Promise<Invoice[]>;
  getInvoiceById(id: number): Promise<Invoice>;
  deleteInvoice(id: number): Promise<Invoice>;
  createInvoice(customerId: number): Promise<Invoice>;
  updateInvoice(id: number, customerId: number): Promise<Invoice>;
  getAllCustomerTypes(): Promise<CustomerType[]>;
  getCustomerTypeById(id: number): Promise<CustomerType>;
  deleteCustomerType(id: number): Promise<CustomerType>;
  createCustomerType(description: string): Promise<CustomerType>;
  updateCustomerType(id: number, description: string): Promise<CustomerType>;
  getAllCustomers(): Promise<Customer[]>;
  getCustomerById(id: number): Promise<Customer>;
  deleteCustomer(id: number): Promise<Customer>;
  createCustomer(
    name: string,
    address: string,
    status: boolean,
    customerTypeId: number
  ): Promise<Customer>;
  updateCustomer(
    id: number,
    name: string,
    address: string,
    status: boolean,
    customerTypeId: number
  ): Promise<Customer>;
}