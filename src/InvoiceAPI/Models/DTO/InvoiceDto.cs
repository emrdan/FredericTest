using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceAPI.Models.DTO
{
    public class InvoiceDto
    {
        public int Id { get; set; }
        public required decimal TotalItbis { get; set; }

        public required decimal Total { get; set; }

        public required int CustomerId { get; set; }
    }
}
