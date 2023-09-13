namespace InvoiceAPI.Models.Domain
{
	public class Invoice
	{
        public Guid Id { get; set; }
        public double TotalITBIS { get; set; }
        public double Subtotal { get; set; }
        public double Total { get; set; }
        public Guid CustomerId { get; set; }

        public Customer Customer { get; set; }
    }
}

