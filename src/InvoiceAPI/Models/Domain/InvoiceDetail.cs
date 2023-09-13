using System;
namespace InvoiceAPI.Models.Domain
{
	public class InvoiceDetail
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double TotalITBIS { get; set; }
        public double Subtotal { get; set; }
        public double Total { get; set; }
        public Guid CustomerId { get; set; }

        public Customer Customer { get; set; }
    }
}

