using Microsoft.AspNetCore.Identity;

namespace DoAnLTW.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        public string? Address { get; set; }
        public DateTime? DayOfBirth { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
