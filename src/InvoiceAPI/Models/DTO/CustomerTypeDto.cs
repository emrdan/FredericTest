using System;
namespace InvoiceAPI.Models.DTO
{
	public class CustomerTypeDto
	{
        public int Id { get; set; }
        public required string Description { get; set; }
    }
}

