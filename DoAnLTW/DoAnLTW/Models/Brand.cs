using DoAnLTW.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DoAnLTW.Models
{
    public class Brand
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        public string? LogoUrl { get; set; }
        public string? Description { get; set; }
        // Quan hệ
        public List<Product>? Products { get; set; }
    }
}