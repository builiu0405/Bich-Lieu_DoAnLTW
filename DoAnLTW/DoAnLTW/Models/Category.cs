﻿using DoAnLTW.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DoAnLTW.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required, StringLength(100)]
        public string Name { get; set; }
        // Quan hệ
        public ICollection<Product>? Products { get; set; }
    }
}