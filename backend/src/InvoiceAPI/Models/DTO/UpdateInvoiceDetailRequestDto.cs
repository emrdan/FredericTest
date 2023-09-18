namespace InvoiceAPI.Models.DTO
{
    public class UpdateInvoiceDetailRequestDto
    {
        public required decimal Price { get; set; }
        public required int Quantity { get; set; }

        public required int InvoiceId { get; set; }
    }
}
