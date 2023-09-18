import { Customer, CustomerType, Invoice, InvoiceDetail, InvoiceServiceProvider } from "../../models/ordering/invoice-service-provider";
import { ServiceProvider } from "../../models/shared/service-provider"

export class FredericInvoice extends ServiceProvider implements InvoiceServiceProvider {
  constructor () {
    super('https://localhost:7263/api');
  }

  private readonly customersUrl = '/customers';
  private readonly customerTypesUrl = '/customertypes';
  private readonly invoicesUrl = '/invoices';
  private readonly invoiceDetailsUrl = '/invoicedetails';

  async updateCustomer(id: number, name: string, address: string, status: boolean, customerTypeId: number): Promise<Customer> {
    const result = await this.put(this.customersUrl + `/${id}`, {
      name,
      address,
      status,
      customerTypeId
    })

    return result.data as Customer;
  }

  async updateCustomerType(id: number, description: string): Promise<CustomerType> {
    const result = await this.put(this.customerTypesUrl + `/${id}`, {
      description
    })

    return result.data as CustomerType;
  }

  async updateInvoice(id: number, customerId: number): Promise<Invoice> {
    const result = await this.put(this.invoicesUrl + `/${id}`, {
      customerId  
    })

    return result.data as Invoice;
  }

  async updateInvoiceDetail(id: number, price: number, quantity: number, invoiceId: number): Promise<InvoiceDetail> {
    const result = await this.put(this.invoiceDetailsUrl + `/${id}`, {
      price,
      quantity,
      invoiceId
    })

    return result.data as InvoiceDetail;
  }

  async createCustomer(name: string, address: string, status: boolean, customerTypeId: number): Promise<Customer> {
    const result = await this.post(this.customersUrl, {
      name,
      address,
      status,
      customerTypeId
    })

    return result.data as Customer;
  }

  async createCustomerType(description: string): Promise<CustomerType> {
    const result = await this.post(this.customerTypesUrl, {
      description
    })

    return result.data as CustomerType;
  }

  async createInvoice(customerId: number): Promise<Invoice> {
    const result = await this.post(this.invoicesUrl, {
      customerId  
    })

    return result.data as Invoice;
  }

  async createInvoiceDetail(price: number, quantity: number, invoiceId: number): Promise<InvoiceDetail> {
    const result = await this.post(this.invoiceDetailsUrl, {
      price,
      quantity,
      invoiceId
    })

    return result.data as InvoiceDetail;
  }

  async deleteCustomerType(id: number): Promise<CustomerType> {
    const result = await this.delete(this.customerTypesUrl + `/${id}`);
    return result.data as CustomerType;
  }

  async deleteCustomer(id: number): Promise<Customer> {
    const result = await this.delete(this.customersUrl + `/${id}`);
    return result.data as Customer;
  }

  async deleteInvoice(id: number): Promise<Invoice> {
    const result = await this.delete(this.invoicesUrl + `/${id}`);
    return result.data as Invoice;
  }

  async deleteInvoiceDetail(id: number): Promise<InvoiceDetail> {
    const result = await this.delete(this.invoiceDetailsUrl + `/${id}`);
    return result.data as InvoiceDetail;
  }

  async getAllCustomerTypes(): Promise<CustomerType[]> {
    const result = await this.get(this.customerTypesUrl);
    return result.data as CustomerType[];
  }

  async getCustomerTypeById(id: number): Promise<CustomerType> {
    const result = await this.get(this.customerTypesUrl + `/${id}`);
    return result.data as CustomerType;
  }

  async getCustomerById(id: number): Promise<Customer> {
    const result = await this.get(this.customersUrl + `/${id}`);
    return result.data as Customer;
  }

  async getInvoiceById(id: number): Promise<Invoice> {
    const result = await this.get(this.invoicesUrl + `/${id}`);
    return result.data as Invoice;
  }

  async getInvoiceDetailById(id: number): Promise<InvoiceDetail> {
    const result = await this.get(this.invoiceDetailsUrl + `/${id}`);
    return result.data as InvoiceDetail;
  }

  async getAllCustomers(): Promise<Customer[]> {
    const result = await this.get(this.customersUrl);
    return result.data as Customer[];
  }
  
  async getAllInvoiceDetails(): Promise<InvoiceDetail[]> {
    const result = await this.get(this.invoiceDetailsUrl);
    return result.data as InvoiceDetail[];
  }
  
  async getAllInvoices(): Promise<Invoice[]> {
    const result = await this.get(this.invoicesUrl);
    return result.data as Invoice[];
  }
}