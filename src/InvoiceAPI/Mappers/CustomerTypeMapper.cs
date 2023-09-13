using InvoiceAPI.Models.Domain;
using InvoiceAPI.Models.DTO;

namespace InvoiceAPI.Mappers
{
    public class CustomerTypeMapper
    {
        public static CustomerTypeDto ToDto (CustomerType cType) {
            return new CustomerTypeDto()
            {
                Id = cType.Id,
                Description = cType.Description
            };
        }
    }
}
