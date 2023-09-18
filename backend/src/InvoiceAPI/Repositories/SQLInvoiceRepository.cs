using InvoiceAPI.Data;
using Microsoft.EntityFrameworkCore;
using InvoiceAPI.Models.Domain;

namespace InvoiceAPI.Repositories
{
    public class SQLInvoiceRepository : IInvoiceRepository
    {
        private readonly InvoicesDbContext dbContext;

        public SQLInvoiceRepository(InvoicesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public async Task<List<Invoice>> GetAllAsync()
        {
            return await dbContext.Invoices
                .Include("Customer")
                .ToListAsync();
        }

        public async Task<Invoice?> GetByIdAsync(int id)
        {
            return await dbContext.Invoices
                .Include("Customer")
                .FirstOrDefaultAsync(invoice => invoice.Id == id);
        }

        public async Task<Invoice?> DeleteAsync(int id)
        {
            var existingInvoice = await dbContext.Invoices.FirstOrDefaultAsync(invoice => invoice.Id == id);


            if (existingInvoice == null)
            {
                return null;
            }

            dbContext.Invoices.Remove(existingInvoice);
            await dbContext.SaveChangesAsync();

            return existingInvoice;
        }

        public async Task<Invoice> CreateAsync(Invoice invoice)
        {
            await dbContext.Invoices.AddAsync(invoice);
            await dbContext.SaveChangesAsync();

            return invoice;
        }

        public async Task<Invoice?> UpdateAsync(int id, Invoice invoice)
        {
            var existingInvoice = await dbContext.Invoices.FirstOrDefaultAsync(i => i.Id == id);

            if (existingInvoice == null)
            {
                return null;
            }

            existingInvoice.CustomerId = invoice.CustomerId;
            existingInvoice.TotalItbis = invoice.TotalItbis > 0 ? invoice.TotalItbis : existingInvoice.TotalItbis;
            existingInvoice.Total = invoice.Total > 0 ? invoice.Total : existingInvoice.Total;

            await dbContext.SaveChangesAsync();

            return existingInvoice;
        }
    }
}

