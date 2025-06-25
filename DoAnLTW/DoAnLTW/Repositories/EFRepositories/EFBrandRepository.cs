﻿using DoAnLTW.Models;
using DoAnLTW.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace DoAnLTW.Repositories.EFRepositories
{
    public class EFBrandRepository : IBrandRepository
    {
        private readonly ApplicationDbContext _context;

        public EFBrandRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Brand>> GetAllAsync()
        {
            return await _context.Brands
                .Include(b => b.Products) // Bao gồm danh sách sản phẩm nếu cần
                .ToListAsync();
        }

        public async Task<Brand> GetByIdAsync(int id)
        {
            return await _context.Brands
                .Include(b => b.Products) // Bao gồm danh sách sản phẩm nếu cần
                .FirstOrDefaultAsync(b => b.Id == id) ?? throw new InvalidOperationException("Brand not found");
        }
        public async Task AddAsync(Brand brand)
        {
            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Brand brand)
        {
            _context.Brands.Update(brand);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var brand = await _context.Brands.FindAsync(id);
            if (brand != null)
            {
                _context.Brands.Remove(brand);
                await _context.SaveChangesAsync();
            }
        }
    }
}