using InvoiceAPI.Models.Domain;

namespace InvoiceAPI.Repositories
{
    public interface ICustomerTypeRepository
    {
        Task<List<CustomerType>> GetAllAsync();

        Task<CustomerType?> GetByIdAsync(int id);

        Task<CustomerType> CreateAsync(CustomerType customerType);

        Task<CustomerType?> UpdateAsync(int id, CustomerType customerType);

        Task<CustomerType?> DeleteAsync(int id);
    }
}
