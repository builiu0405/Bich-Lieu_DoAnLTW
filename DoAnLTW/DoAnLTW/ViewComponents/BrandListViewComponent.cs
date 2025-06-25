using Microsoft.AspNetCore.Mvc;
using DoAnLTW.Repositories.Interfaces;

namespace DoAnLTW.Components
{
    public class BrandListViewComponent : ViewComponent
    {
        private readonly IBrandRepository _brandRepository;

        public BrandListViewComponent(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var brands = await _brandRepository.GetAllAsync();
            return View(brands);
        }
    }
} 