using InvoiceAPI.Models.Domain;
using InvoiceAPI.Models.DTO;

namespace InvoiceAPI.Mappers
{
    public class CustomerMapper
    {
        public static CustomerDto ToDto(Customer customer)
        {
            return new CustomerDto()
            {
                Id = customer.Id,
                Name = customer.Name,
                Address = customer.Address,
                Status = customer.Status,
                CustomerType = customer.CustomerType
            };
        }

        public static Customer toDomain(AddCustomerRequestDto customerDto)
        {
            return new Customer()
            {
                Name = customerDto.Name,
                Address = customerDto.Address,
                Status = customerDto.Status,
                CustomerTypeId = customerDto.CustomerTypeId
            };
        }
        public static Customer toDomain(UpdateCustomerRequestDto customerDto)
        {
            return new Customer()
            {
                Name = customerDto.Name,
                Address = customerDto.Address,
                Status = customerDto.Status,
                CustomerTypeId = customerDto.CustomerTypeId
            };
        }
    }
}
