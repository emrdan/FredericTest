using InvoiceAPI.Models.Domain;

namespace InvoiceAPI.Repositories
{
    public interface IInvoiceRepository
    {
        Task<List<Invoice>> GetAllAsync();

        Task<Invoice?> GetByIdAsync(int id);

        Task<Invoice> CreateAsync(Invoice invoice);

        Task<Invoice?> UpdateAsync(int id, Invoice invoice);

        Task<Invoice?> DeleteAsync(int id);
    }
}
