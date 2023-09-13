using System.ComponentModel.DataAnnotations;

namespace InvoiceAPI.Models.DTO
{
	public class AddCustomerRequestDto
	{
        [Required]
        [MaxLength(30, ErrorMessage = "Name has to be a maximum of 30 characters")]
        public required string Name { get; set; }

        public required string Address { get; set; }

        public bool Status { get; set; }
        public int CustomerTypeId { get; set; }
    }
}

