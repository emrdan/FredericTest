namespace InvoiceAPI.Models.Domain
{
	public class Customer
	{
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public bool Status { get; set; }
        public Guid CustomerTypeId { get; set; }

        public CustomerType CustomerType { get; set; }
    }
}

