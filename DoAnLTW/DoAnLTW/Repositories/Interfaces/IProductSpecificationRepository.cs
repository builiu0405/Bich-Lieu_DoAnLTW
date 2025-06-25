using DoAnLTW.Models;

namespace DoAnLTW.Repositories.Interfaces
{
    public interface IProductSpecificationRepository
    {
        Task<List<ProductSpecification>> GetAllAsync();
        Task<ProductSpecification> GetByIdAsync(int id);
        Task AddAsync(List<ProductSpecification> productSpecification);
        Task UpdateAsync(ProductSpecification productSpecification);
        Task DeleteAsync(int id);
    }
}
