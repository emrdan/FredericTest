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

        public static CustomerType toDomain(AddCustomerTypeRequestDto cTypeDto)
        {
            return new CustomerType()
            {
                Description = cTypeDto.Description
            };
        }
        public static CustomerType toDomain(UpdateCustomerTypeRequestDto cTypeDto)
        {
            return new CustomerType()
            {
                Description = cTypeDto.Description
            };
        }
    }
}
