namespace MirrorV2.Services;

public record WeatherForecast
    (
        string Icon,
        string Summary,
        decimal Temperature,
        decimal ApparentTemperature
    );

public record Weather(WeatherForecast Currently);
