using InvoiceAPI.Mappers;
using InvoiceAPI.Models.DTO;
using InvoiceAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerTypesController : ControllerBase
{
    private readonly ILogger<CustomersController> _logger;
    private readonly ICustomerTypeRepository _customerTypeRepository;

    public CustomerTypesController(ILogger<CustomersController> logger, ICustomerTypeRepository customerTypeRepository)
    {
        _logger = logger;
        _customerTypeRepository = customerTypeRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var customerTypes = await _customerTypeRepository.GetAllAsync();

        var customerTypesDtos = customerTypes.Select(cType => CustomerTypeMapper.ToDto(cType));

        return Ok(customerTypesDtos);
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var foundCustomerType = await _customerTypeRepository.GetByIdAsync(id);

        if (foundCustomerType == null)
        {
            return NotFound();
        }

        return Ok(CustomerTypeMapper.ToDto(foundCustomerType));
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var customerType = await _customerTypeRepository.DeleteAsync(id);

        if (customerType == null)
        {
            return NotFound();
        }

        return Ok(customerType);
    }
}