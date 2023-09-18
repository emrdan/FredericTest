using InvoiceAPI.Data;
using Microsoft.EntityFrameworkCore;
using InvoiceAPI.Models.Domain;

namespace InvoiceAPI.Repositories
{
    public class SQLInvoiceDetailRepository : IInvoiceDetailRepository
    {
        private readonly InvoicesDbContext dbContext;

        public SQLInvoiceDetailRepository(InvoicesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public async Task<List<InvoiceDetail>> GetAllAsync()
        {
            return await dbContext.InvoiceDetails.ToListAsync();
        }

        public async Task<InvoiceDetail?> GetByIdAsync(int id)
        {
            return await dbContext.InvoiceDetails.FirstOrDefaultAsync(invoiceDetail => invoiceDetail.Id == id);
        }

        public async Task<InvoiceDetail?> DeleteAsync(int id)
        {
            var existingInvoiceDetail = await dbContext.InvoiceDetails.FirstOrDefaultAsync(i => i.Id == id);


            if (existingInvoiceDetail == null)
            {
                return null;
            }

            dbContext.InvoiceDetails.Remove(existingInvoiceDetail);
            await dbContext.SaveChangesAsync();

            return existingInvoiceDetail;
        }

        public async Task<InvoiceDetail> CreateAsync(InvoiceDetail invoiceDetail)
        {
            await dbContext.InvoiceDetails.AddAsync(invoiceDetail);
            await dbContext.SaveChangesAsync();

            return invoiceDetail;
        }

        public async Task<InvoiceDetail?> UpdateAsync(int id, InvoiceDetail invoiceDetail)
        {
            var existingInvoiceDetail = await dbContext.InvoiceDetails.FirstOrDefaultAsync(i => i.Id == id);

            if (existingInvoiceDetail == null)
            {
                return null;
            }

            existingInvoiceDetail.InvoiceId = invoiceDetail.InvoiceId;
            existingInvoiceDetail.Subtotal = invoiceDetail.Subtotal;
            existingInvoiceDetail.Quantity = invoiceDetail.Quantity;
            existingInvoiceDetail.Price = invoiceDetail.Price;

            await dbContext.SaveChangesAsync();

            return existingInvoiceDetail;
        }
    }
}

