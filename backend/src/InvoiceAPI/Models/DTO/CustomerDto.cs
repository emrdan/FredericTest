using InvoiceAPI.Models.Domain;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceAPI.Models.DTO
{
	public class CustomerDto
	{
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public bool Status { get; set; }
        public int CustomerTypeId { get; set; }

    }
}

