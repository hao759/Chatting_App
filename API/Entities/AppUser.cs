using System.ComponentModel.DataAnnotations;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        [DataType(DataType.DateTime)]
        public DateOnly DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Gender { get; set; }
        public string Introduction { get; set; } = "Introduction";
        public string LookingFor { get; set; } = "LookingFor";
        public string Interests { get; set; } = "Interests";
        public string City { get; set; }
        public string Country { get; set; }
        public List<Photo>? Photos { get; set; } = new();
        // public int GetAge()
        // {
        //     return DateOfBirth.CaculateAge();
        // }
        // public List<UserLike> LikedByUsers { get; set; }
        // public List<UserLike> LikedUsers { get; set; }
        // public List<Message> MessagesSent { get; set; }
        // public List<Message> MessagesReceived { get; set; }
        // public ICollection<AppUserRole> UserRoles { get; set; }
    }


}
