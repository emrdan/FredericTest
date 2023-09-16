using InvoiceAPI.Models.Domain;

namespace InvoiceAPI.Repositories
{
    public interface IInvoiceDetailRepository
    {
        Task<List<InvoiceDetail>> GetAllAsync();

        Task<InvoiceDetail?> GetByIdAsync(int id);

        Task<InvoiceDetail> CreateAsync(InvoiceDetail invoiceDetail);

        Task<InvoiceDetail?> UpdateAsync(int id, InvoiceDetail invoiceDetail);

        Task<InvoiceDetail?> DeleteAsync(int id);
    }
}