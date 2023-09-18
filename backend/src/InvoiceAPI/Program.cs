using InvoiceAPI.Data;
using InvoiceAPI.Models.Domain;
using InvoiceAPI.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<InvoicesDbContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("InvoiceDbConnectionString"))
);

builder.Services.AddScoped<ICustomerTypeRepository, SQLCustomerTypeRepository>();
builder.Services.AddScoped<ICustomerRepository, SQLCustomerRepository>();
builder.Services.AddScoped<IInvoiceRepository, SQLInvoiceRepository>();
builder.Services.AddScoped<IInvoiceDetailRepository, SQLInvoiceDetailRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
