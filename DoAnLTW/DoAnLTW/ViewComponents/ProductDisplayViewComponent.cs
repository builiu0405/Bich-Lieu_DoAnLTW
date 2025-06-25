using Microsoft.AspNetCore.Mvc;
using DoAnLTW.Repositories.Interfaces;

namespace DoAnLTW.Components
{
    public class ProductDisplayViewComponent : ViewComponent
    {
        private readonly IProductRepository _productRepository;

        public ProductDisplayViewComponent(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IViewComponentResult> InvokeAsync(string type, int count = 8)
        {
            IEnumerable<DoAnLTW.Models.Product> products;

            switch (type.ToLower())
            {
                case "bestsellers":
                    products = await _productRepository.GetBestSellersAsync(count);
                    break;
                case "latest":
                    products = await _productRepository.GetLatestProductsAsync(count);
                    break;
                case "featured":
                    products = await _productRepository.GetFeaturedProductsAsync(count);
                    break;
                default:
                    products = await _productRepository.GetAllAsync();
                    break;
            }

            return View(products);
        }
    }
} 