using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceAPI.Models.DTO
{
    public class AddInvoiceDetailRequestDto
    {
        public required decimal Price { get; set; }
        public required int Quantity { get; set; }

        public required int InvoiceId { get; set; }
    }
}
