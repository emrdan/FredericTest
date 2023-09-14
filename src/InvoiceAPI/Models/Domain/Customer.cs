using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceAPI.Models.Domain
{
	public class Customer
	{
        public int Id { get; set; }

        [Column("CustName")]
        public required string Name { get; set; }

        [Column("Adress")]
        public required string Address { get; set; }

        public required bool Status { get; set; }
        public required int CustomerTypeId { get; set; }

        public CustomerType? CustomerType { get; set; }
    }
}

