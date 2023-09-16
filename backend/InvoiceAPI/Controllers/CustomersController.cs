using InvoiceAPI.Mappers;
using InvoiceAPI.Models.Domain;
using InvoiceAPI.Models.DTO;
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

        var customerDtos = customers.Select(c => CustomerMapper.ToDto(c));

        return Ok(customerDtos);
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

        return Ok(CustomerMapper.ToDto(foundCustomer));
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var customer = await _customerRepository.DeleteAsync(id);

        if (customer == null)
        {
            return NotFound();
        }

        return Ok(CustomerMapper.ToDto(customer));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddCustomerRequestDto addCustomerRequestDto)
    {
        var customerToAdd = CustomerMapper.toDomain(addCustomerRequestDto);

        var createdCustomer = await _customerRepository.CreateAsync(customerToAdd);

        return CreatedAtAction(nameof(GetById), new { id = createdCustomer.Id }, CustomerMapper.ToDto(createdCustomer));
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCustomerRequestDto updateCustomerRequestDto)
    {

        var customerToUpdate = CustomerMapper.toDomain(updateCustomerRequestDto);

        customerToUpdate = await _customerRepository.UpdateAsync(id, customerToUpdate);

        if (customerToUpdate == null)
        {
            return NotFound();
        }

        return Ok(CustomerMapper.ToDto(customerToUpdate));
    }
}