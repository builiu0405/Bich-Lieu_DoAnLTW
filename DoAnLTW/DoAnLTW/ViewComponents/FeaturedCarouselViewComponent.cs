using Microsoft.AspNetCore.Mvc;
using DoAnLTW.Repositories.Interfaces;

namespace DoAnLTW.Components
{
    public class FeaturedCarouselViewComponent : ViewComponent
    {
        private readonly IProductRepository _productRepository;

        public FeaturedCarouselViewComponent(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var featuredProducts = await _productRepository.GetFeaturedProductsAsync(5);
            return View(featuredProducts);
        }
    }
} 