using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceAPI.Models.DTO
{
    public class AddInvoiceRequestDto
    {

        public required int CustomerId { get; set; }
    }
}
