using InvoiceAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
    
namespace InvoiceAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{ 
    private readonly ILogger<CustomersController> _logger;
    private readonly ICustomerRepository _customerRepository;

    public CustomersController(ILogger<CustomersController> logger, ICustomerRepository customerRepository)
    {
        _logger = logger;
        _customerRepository = customerRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var customers = await _customerRepository.GetAllAsync();

        return Ok(customers);
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var foundCustomer = await _customerRepository.GetByIdAsync(id);

        if (foundCustomer == null)
        {
           return NotFound();
        }

        return Ok(foundCustomer);
    }
}