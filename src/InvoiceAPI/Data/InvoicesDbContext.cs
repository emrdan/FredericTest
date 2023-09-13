using InvoiceAPI.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace InvoiceAPI.Data
{
	public class InvoicesDbContext: DbContext
	{
		public InvoicesDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
		{

		}

		public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerType> CustomerTypes { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetails { get; set; }
    }
}

