using Microsoft.AspNetCore.Mvc;
    
namespace InvoiceAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomersController : ControllerBase
{ 
    private readonly ILogger<CustomersController> _logger;

    public CustomersController(ILogger<CustomersController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAllCustomers()
    {
        string[] customerNames = new string[] { "Daniel", "Luis" };

        return Ok(customerNames);
    }
}