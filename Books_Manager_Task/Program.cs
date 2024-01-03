using Books_Manager_Task.Models;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.EntityFrameworkCore;



internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Initializing HTTP Logging
        builder.Services.AddHttpLogging(logging =>
        {
            logging.LoggingFields = HttpLoggingFields.All;
            logging.RequestHeaders.Add("sec-ch-ua");
            logging.ResponseHeaders.Add("MyResponseHeader");
            logging.MediaTypeOptions.AddText("application/javascript");
            logging.RequestBodyLogLimit = 4096;
            logging.ResponseBodyLogLimit = 4096;
            logging.CombineLogs = true;
        });

        // Add services to the container.

        builder.Services.AddDbContext<BookContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("BookContext")));


        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        app.UseHttpLogging();

        app.Logger.LogInformation("Adding Routes");

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.MapGet("/response", () => "Hello World! (logging response)")
            .WithHttpLogging(HttpLoggingFields.ResponsePropertiesAndHeaders);

        app.MapGet("/duration", [HttpLogging(loggingFields: HttpLoggingFields.Duration)]
            () => "Hello World! (logging duration)");

        app.Run();
    }
}