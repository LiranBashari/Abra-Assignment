using MongoDB.Driver;
using MongoDB.Bson;
using abra_server.Models;
using Microsoft.Extensions.Options;
using abra_server.Controllers;

namespace abra_server.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Pet> _collection;
        private readonly ILogger<Controller> _logger = LoggerFactory.Create(builder => builder.AddConsole()).CreateLogger<Controller>();


        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _collection = database.GetCollection<Pet>(mongoDBSettings.Value.CollectionName);
        }

        public async Task<List<Pet>> GetAsync()
        {
            try {
                return await _collection.Find(new BsonDocument()).ToListAsync();
            } catch (Exception ex){
                _logger.LogError(ex, "Failed to get pets");
                throw;
            }
        }

        public async Task CreateAsync(Pet pet)
        {
            try {
                await _collection.InsertOneAsync(pet);
            } catch (Exception ex){
                _logger.LogError(ex, "Failed to add pet");
                throw;
            }
            return;
        }
    }
}