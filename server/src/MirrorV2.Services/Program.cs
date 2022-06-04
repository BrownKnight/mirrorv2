var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpClient().AddSwaggerGen();


var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection()
    .UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader())
    .UseDefaultFiles()
    .UseStaticFiles();


app.MapControllers();


app.Run();
