using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceAPI.Models.Domain
{
    [Table("InvoiceDetail")]
    public class InvoiceDetail
    {
        public int Id { get; set; }

        [Column("SubTotal")]
        public decimal Subtotal { get; set; }
        public decimal Price { get; set; }
        [Column("Qty")]
        public int Quantity { get; set; }

        public required int InvoiceId { get; set; }
    }
}