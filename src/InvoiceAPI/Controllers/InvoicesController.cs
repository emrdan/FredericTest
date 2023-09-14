using InvoiceAPI.Mappers;
using InvoiceAPI.Models.Domain;
using InvoiceAPI.Models.DTO;
using InvoiceAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly ILogger<CustomersController> _logger;
    private readonly IInvoiceRepository _invoiceRepository;

    public InvoicesController(ILogger<CustomersController> logger, IInvoiceRepository invoiceRepository)
    {
        _logger = logger;
        _invoiceRepository = invoiceRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var invoices = await _invoiceRepository.GetAllAsync();

        var invoicesDtos = invoices.Select(i => InvoiceMapper.ToDto(i));

        return Ok(invoicesDtos);
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var foundInvoice = await _invoiceRepository.GetByIdAsync(id);

        if (foundInvoice == null)
        {
            return NotFound();
        }

        return Ok(InvoiceMapper.ToDto(foundInvoice));
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var invoice = await _invoiceRepository.DeleteAsync(id);

        if (invoice == null)
        {
            return NotFound();
        }

        return Ok(InvoiceMapper.ToDto(invoice));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddInvoiceRequestDto addInvoiceRequestDto)
    {
        var invoiceToAdd = InvoiceMapper.toDomain(addInvoiceRequestDto);

        var createdInvoice = await _invoiceRepository.CreateAsync(invoiceToAdd);

        return CreatedAtAction(nameof(GetById), new { id = createdInvoice.Id }, InvoiceMapper.ToDto(createdInvoice));
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateInvoiceRequestDto updateInvoiceRequestDto)
    {

        var invoiceToUpdate = InvoiceMapper.toDomain(updateInvoiceRequestDto);

        invoiceToUpdate = await _invoiceRepository.UpdateAsync(id, invoiceToUpdate);

        if (invoiceToUpdate == null)
        {
            return NotFound();
        }

        return Ok(InvoiceMapper.ToDto(invoiceToUpdate));
    }
}