using InvoiceAPI.Models.Domain;
using InvoiceAPI.Models.DTO;

namespace InvoiceAPI.Mappers
{
    public class InvoiceDetailMapper
    {
        public static InvoiceDetailDto ToDto(InvoiceDetail invoiceDetail)
        {
            return new InvoiceDetailDto()
            {
                Id = invoiceDetail.Id,
                InvoiceId = invoiceDetail.InvoiceId,
                Price = invoiceDetail.Price,
                Quantity = invoiceDetail.Quantity,
                Subtotal = invoiceDetail.Subtotal
            
            };
        }

        public static InvoiceDetail toDomain(AddInvoiceDetailRequestDto invoiceDetailDto)
        {
            return new InvoiceDetail()
            {
                InvoiceId = invoiceDetailDto.InvoiceId,
                Price = invoiceDetailDto.Price,
                Quantity = invoiceDetailDto.Quantity
            };
        }
        public static InvoiceDetail toDomain(UpdateInvoiceDetailRequestDto invoiceDetailDto)
        {
            return new InvoiceDetail()
            {
                InvoiceId = invoiceDetailDto.InvoiceId,
                Price = invoiceDetailDto.Price,
                Quantity = invoiceDetailDto.Quantity
            };
        }
    }
}
