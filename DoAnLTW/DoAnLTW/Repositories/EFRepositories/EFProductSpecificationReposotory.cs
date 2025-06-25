﻿using DoAnLTW.Models;
using DoAnLTW.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace DoAnLTW.Repositories.EFRepositories
{
    public class EFProductSpecificationReposotory : IProductSpecificationRepository
    {
        private readonly ApplicationDbContext _context;
        public EFProductSpecificationReposotory(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(List<ProductSpecification> productSpecifications)
        {
            await _context.ProductSpecifications.AddRangeAsync(productSpecifications);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var productSpecification = await _context.ProductSpecifications.FindAsync(id);
            if (productSpecification != null)
            {
                _context.ProductSpecifications.Remove(productSpecification);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<ProductSpecification>> GetAllAsync()
        {
            return await _context.ProductSpecifications
                .ToListAsync();
        }
        public async Task<ProductSpecification> GetByIdAsync(int id)
        {
            return await _context.ProductSpecifications
                .FirstOrDefaultAsync(p => p.Id == id) ?? throw new InvalidOperationException("ProductSpecification not found");
        }
        public async Task UpdateAsync(ProductSpecification productSpecification)
        {
            _context.ProductSpecifications.Update(productSpecification);
            await _context.SaveChangesAsync();
        }
    }
}
