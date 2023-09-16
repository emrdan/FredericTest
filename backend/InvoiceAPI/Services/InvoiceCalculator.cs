using InvoiceAPI.Models.Domain;

namespace InvoiceAPI.Services
{
    public class InvoiceCalculator
    {
        private static readonly double ITBIS_MULTIPLIER = 0.18;

        public static Invoice Add(Invoice invoice, InvoiceDetail invoiceDetail)
        {
            invoice.Total = invoice.Total + invoiceDetail.Subtotal;
            invoice.TotalItbis = invoice.Total * (decimal)(1 + ITBIS_MULTIPLIER);

            return invoice;

        }
        public static Invoice Substract(Invoice invoice, InvoiceDetail invoiceDetail)
        {
            invoice.Total = invoice.Total - invoiceDetail.Subtotal;
            invoice.TotalItbis = invoice.Total * (decimal)(1 + ITBIS_MULTIPLIER);

            return invoice;
        }

        public static Invoice Reassign(Invoice invoice, InvoiceDetail invoiceDetail)
        {
            invoice.Total = invoiceDetail.Subtotal;
            invoice.TotalItbis = invoice.Total * (decimal)(1 + ITBIS_MULTIPLIER);

            return invoice;
        }
    }
}
