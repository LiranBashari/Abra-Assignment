using Microsoft.AspNetCore.Mvc;
using abra_server.Models;
using abra_server.Services;
namespace abra_server.Controllers
{
    [Controller]
    [Route("api/")]
    public class Controller : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly MongoDBService _mongoDBService;
        private readonly ILogger<Controller> _logger = LoggerFactory.Create(builder => builder.AddConsole()).CreateLogger<Controller>();

        public Controller(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpGet("pets")]
        public async Task<List<Pet>> Get() 
        {
            return await _mongoDBService.GetAsync();
        }


        [HttpPost("pet")]
        public async Task<IActionResult> Post([FromBody] Pet pet)
        {
            _logger.LogInformation("Creating a new pet");
            await _mongoDBService.CreateAsync(pet);
            return Ok(pet);
        }


    }
}