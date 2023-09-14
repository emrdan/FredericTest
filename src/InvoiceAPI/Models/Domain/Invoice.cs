using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceAPI.Models.Domain
{
    [Table("Invoice")]
    public class Invoice
    {
        public int Id { get; set; }
        public decimal TotalItbis { get; set; }

        public decimal Total { get; set; }

        public required int CustomerId { get; set; }
    }
}
