using Microsoft.AspNetCore.Mvc;
using DoAnLTW.Repositories.Interfaces;

namespace DoAnLTW.Components
{
    public class SidebarViewComponent : ViewComponent
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IBrandRepository _brandRepository;

        public SidebarViewComponent(
            ICategoryRepository categoryRepository,
            IBrandRepository brandRepository)
        {
            _categoryRepository = categoryRepository;
            _brandRepository = brandRepository;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();
            var brands = await _brandRepository.GetAllAsync();

            ViewBag.Categories = categories;
            ViewBag.Brands = brands;

            return View();
        }
    }
} 