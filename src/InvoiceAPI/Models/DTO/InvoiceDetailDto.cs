using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceAPI.Models.DTO
{
    public class InvoiceDetailDto
    {
        public int Id { get; set; }

        public decimal Subtotal { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public int InvoiceId { get; set; }
    }
}
