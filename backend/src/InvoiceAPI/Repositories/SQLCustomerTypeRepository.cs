using InvoiceAPI.Data;
using Microsoft.EntityFrameworkCore;
using InvoiceAPI.Models.Domain;

namespace InvoiceAPI.Repositories
{
	public class SQLCustomerTypeRepository : ICustomerTypeRepository
	{
        private readonly InvoicesDbContext dbContext;

        public SQLCustomerTypeRepository(InvoicesDbContext dbContext)
		{
           this.dbContext = dbContext;
        }


        public async Task<List<CustomerType>> GetAllAsync()
        {
            return await dbContext.CustomerTypes.ToListAsync();
        }

        public async Task<CustomerType?> GetByIdAsync(int id)
        {
            return await dbContext.CustomerTypes.FirstOrDefaultAsync(cType => cType.Id == id);
        }

        public async Task<CustomerType?> DeleteAsync(int id)
        {
            var existingType = await dbContext.CustomerTypes.FirstOrDefaultAsync(cType => cType.Id == id);


            if (existingType == null)
            {
                return null;
            }

            dbContext.CustomerTypes.Remove(existingType);
            await dbContext.SaveChangesAsync();

            return existingType;
        }

        public async Task<CustomerType> CreateAsync(CustomerType customerType)
        {
            await dbContext.CustomerTypes.AddAsync(customerType);
            await dbContext.SaveChangesAsync();

            return customerType;
        }

        public async Task<CustomerType?> UpdateAsync(int id, CustomerType customerType)
        {
            var existingType = await dbContext.CustomerTypes.FirstOrDefaultAsync(cType => cType.Id == id);

            if (existingType == null)
            {
                return null;
            }

            existingType.Description = customerType.Description;

            await dbContext.SaveChangesAsync();

            return existingType;
        }
    }
}

