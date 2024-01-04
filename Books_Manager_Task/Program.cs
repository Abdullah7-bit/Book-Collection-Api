using Books_Manager_Task.Models;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.EntityFrameworkCore;
using NLog;
using NLog.Web;



internal class Program
{
    
    private static void Main(string[] args)
    {
        var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();

        try
        {
            var builder = WebApplication.CreateBuilder(args);

            

            // Add services to the container.

            builder.Services.AddDbContext<BookContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("BookContext")));


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            

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

           app.Run();

        }catch(Exception ex)
        {
            //Nlog catch the setup errors
            logger.Error(ex, "Stopped program because of exception");
            throw;

        }
        finally
        {
            NLog.LogManager.Shutdown();
        }

        
    }
}