using InvoiceAPI.Mappers;
using InvoiceAPI.Models.Domain;
using InvoiceAPI.Models.DTO;
using InvoiceAPI.Repositories;
using InvoiceAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace InvoiceAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoiceDetailsController : ControllerBase
{
    delegate Invoice CalculatorDelegate(Invoice invoice, InvoiceDetail invoiceDetail);

    private CalculatorDelegate calculator;
    private readonly ILogger<CustomersController> _logger;
    private readonly IInvoiceDetailRepository _invoiceDetailRepository;
    private readonly IInvoiceRepository _invoiceRepository;

    public InvoiceDetailsController(
        ILogger<CustomersController> logger, 
        IInvoiceDetailRepository invoiceDetailRepository,
        IInvoiceRepository invoiceRepository
    )
    {
        _logger = logger;
        _invoiceDetailRepository = invoiceDetailRepository;
        _invoiceRepository = invoiceRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var invoiceDetails = await _invoiceDetailRepository.GetAllAsync();

        var invoiceDetailsDtos = invoiceDetails.Select(i => InvoiceDetailMapper.ToDto(i));

        return Ok(invoiceDetailsDtos);
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var foundInvoiceDetails = await _invoiceDetailRepository.GetByIdAsync(id);

        if (foundInvoiceDetails == null)
        {
            return NotFound();
        }

        return Ok(InvoiceDetailMapper.ToDto(foundInvoiceDetails));
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var invoiceDetail = await _invoiceDetailRepository.DeleteAsync(id);

        if (invoiceDetail == null)
        {
            return NotFound();
        }

        var invoiceToUpdate = await _invoiceRepository.GetByIdAsync(invoiceDetail.InvoiceId);

        if (invoiceToUpdate != null)
        {
            calculator = InvoiceCalculator.Substract;
            var updatedInv = calculator(invoiceToUpdate, invoiceDetail);

            await _invoiceRepository.UpdateAsync(invoiceDetail.InvoiceId, updatedInv);

        }

        return Ok(InvoiceDetailMapper.ToDto(invoiceDetail));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddInvoiceDetailRequestDto addInvoiceDetailRequestDto)
    {
        var invoiceId = addInvoiceDetailRequestDto.InvoiceId;
        var invoiceToUpdate = await _invoiceRepository.GetByIdAsync(invoiceId);

        if (invoiceToUpdate == null)
        {
            return StatusCode(424);
        }        
        
        var invoiceDetailToAdd = InvoiceDetailMapper.toDomain(addInvoiceDetailRequestDto);
        invoiceDetailToAdd.Subtotal = addInvoiceDetailRequestDto.Price * addInvoiceDetailRequestDto.Quantity;

        var createdInvoiceDetail = await _invoiceDetailRepository.CreateAsync(invoiceDetailToAdd);

        calculator = InvoiceCalculator.Add;
        var updatedInv = calculator(invoiceToUpdate, invoiceDetailToAdd);

        await _invoiceRepository.UpdateAsync(invoiceId, updatedInv);

        return CreatedAtAction(nameof(GetById), new { id = createdInvoiceDetail.Id }, InvoiceDetailMapper.ToDto(createdInvoiceDetail));
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateInvoiceDetailRequestDto updateInvoiceDetailRequestDto)
    {

        var invoiceDetailToUpdate = InvoiceDetailMapper.toDomain(updateInvoiceDetailRequestDto);

        invoiceDetailToUpdate.Subtotal = updateInvoiceDetailRequestDto.Price * updateInvoiceDetailRequestDto.Quantity;

        invoiceDetailToUpdate = await _invoiceDetailRepository.UpdateAsync(id, invoiceDetailToUpdate);

        if (invoiceDetailToUpdate == null)
        {
            return NotFound();
        }

        var invoiceToUpdate = await _invoiceRepository.GetByIdAsync(invoiceDetailToUpdate.InvoiceId);

        if (invoiceToUpdate != null)
        {
            calculator = InvoiceCalculator.Reassign;
            var updatedInv = calculator(invoiceToUpdate, invoiceDetailToUpdate);
            await _invoiceRepository.UpdateAsync(invoiceDetailToUpdate.InvoiceId, updatedInv);
        }

        return Ok(InvoiceDetailMapper.ToDto(invoiceDetailToUpdate));
    }
}