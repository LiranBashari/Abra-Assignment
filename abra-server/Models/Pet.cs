using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace abra_server.Models
{
    public class Pet
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        public string Name { get; set; } = null!;

        public string Color { get; set; } = null!;

        public string Age { get; set; } = null!;

        public string Type { get; set; } = null!;

        public DateTime CreatedAt = DateTime.UtcNow;
        
    }
}