using InvoiceAPI.Data;
using Microsoft.EntityFrameworkCore;
using InvoiceAPI.Models.Domain;

namespace InvoiceAPI.Repositories
{
	public class SQLCustomerRepository : ICustomerRepository
	{
		private readonly InvoicesDbContext dbContext;

		public SQLCustomerRepository(InvoicesDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

        public async Task<List<Customer>> GetAllAsync()
        {
            return await dbContext.Customers
              .Include("CustomerType")
              .ToListAsync();
        }

        public async Task<Customer?> GetByIdAsync(int id)
        {
            return await dbContext.Customers
              .Include("CustomerType")
              .FirstOrDefaultAsync(cst => cst.Id == id);
        }

        public async Task<Customer?> DeleteAsync(int id)
        {
            var existingCustomer = await dbContext.Customers
                .Include("CustomerType")
                .FirstOrDefaultAsync(cst => cst.Id == id);


            if (existingCustomer == null)
            {
                return null;
            }

            dbContext.Customers.Remove(existingCustomer);
            await dbContext.SaveChangesAsync();

            return existingCustomer;
        }

        public async Task<Customer> CreateAsync(Customer customer)
        {
            await dbContext.Customers.AddAsync(customer);
            await dbContext.SaveChangesAsync();

            return customer;
        }

        public async Task<Customer?> UpdateAsync(int id, Customer customer)
        {
            var existingCustomer = await dbContext.Customers.FirstOrDefaultAsync(cst => cst.Id == id);

            if (existingCustomer == null)
            {
                return null;
            }

            existingCustomer.Name = customer.Name;
            existingCustomer.Address = customer.Address;
            existingCustomer.Status = customer.Status;
            existingCustomer.CustomerTypeId = customer.CustomerTypeId;

            await dbContext.SaveChangesAsync();

            return existingCustomer;
        }

    }
}

