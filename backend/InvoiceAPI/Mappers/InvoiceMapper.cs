using InvoiceAPI.Models.Domain;
using InvoiceAPI.Models.DTO;

namespace InvoiceAPI.Mappers
{
    public class InvoiceMapper
    {
        public static InvoiceDto ToDto(Invoice invoice)
        {
            return new InvoiceDto()
            {
                Id = invoice.Id,
                CustomerId = invoice.CustomerId,
                TotalItbis = invoice.TotalItbis,
                Total = invoice.Total
            };
        }

        public static Invoice toDomain(AddInvoiceRequestDto invoiceDto)
        {
            return new Invoice()
            {
                CustomerId = invoiceDto.CustomerId
            };
        }
        public static Invoice toDomain(UpdateInvoiceRequestDto invoiceDto)
        {
            return new Invoice()
            {
                CustomerId = invoiceDto.CustomerId
            };
        }
    }
}
