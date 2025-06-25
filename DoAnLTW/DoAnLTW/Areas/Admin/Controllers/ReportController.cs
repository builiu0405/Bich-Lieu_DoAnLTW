using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DoAnLTW.Models;

[Area("Admin")]
public class ReportController : Controller
{
    private readonly ApplicationDbContext _context;

    public ReportController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Action Index kết hợp cả hai báo cáo
    public async Task<IActionResult> Index()
    {
        // 1. Tổng doanh thu từng khách hàng
        var revenueByCustomer = await _context.Orders
            .GroupBy(o => o.UserId)
            .Select(g => new
            {
                UserId = g.Key,
                TotalRevenue = g.Sum(x => x.TotalPrice),
                OrderCount = g.Count()
            })
            .ToListAsync();

        var users = await _context.Users.ToListAsync();
        var revenueByCustomerResult = revenueByCustomer.Select(q => new
        {
            UserName = users.FirstOrDefault(u => u.Id == q.UserId)?.UserName ?? "Unknown",
            FullName = users.FirstOrDefault(u => u.Id == q.UserId)?.FullName ?? "",
            TotalRevenue = q.TotalRevenue,
            OrderCount = q.OrderCount
        }).ToList();

        // 2. Tổng doanh thu trong ngày (so sánh theo khoảng)
        var today = DateTime.Today;
        var tomorrow = today.AddDays(1);
        var revenueToday = await _context.Orders
            .Where(o => o.OrderDate >= today && o.OrderDate < tomorrow)
            .SumAsync(o => o.TotalPrice);

        // Truyền cả hai kết quả sang view
        ViewBag.RevenueToday = revenueToday;
        return View(revenueByCustomerResult);
    }
}
