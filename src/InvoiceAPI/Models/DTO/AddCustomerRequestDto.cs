using System;

namespace InvoiceAPI.Models.DTO
{
    public class AddCustomerRequestDto
    {
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required bool Status { get; set; }

        public int CustomerTypeId { get; set; }
    }
}