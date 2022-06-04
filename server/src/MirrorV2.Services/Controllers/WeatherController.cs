using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace MirrorV2.Services.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly HttpClient httpClient;
    private readonly ILogger<WeatherController> _logger;

    public WeatherController(HttpClient httpClient, ILogger<WeatherController> logger)
    {
        this.httpClient = httpClient;
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<WeatherForecast?> GetAsync(CancellationToken cancellationToken)
    {
        var apiKey = Environment.GetEnvironmentVariable("WEATHER_API_KEY");
        var location = Environment.GetEnvironmentVariable("WEATHER_LOCATION");
        var apiUrl = $"https://api.darksky.net/forecast/{apiKey}/{location}?units=si&exclude=minutely,hourly,alerts,flags";

        var response = await httpClient.GetAsync(apiUrl, cancellationToken).ConfigureAwait(false);
        var weather = await response.Content.ReadFromJsonAsync<Weather>(new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }, cancellationToken);
        return weather?.Currently;
    }
}
