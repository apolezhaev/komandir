using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Komandir.Models;
using Komandir.Services;
using System.IO;
using Microsoft.AspNetCore.Http;
using Komandir.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using Hosting = Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

namespace Komandir
{
    public class Startup
    {        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;         
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)   
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<KomandirDbContext>(db => db.UseSqlite(connectionString));

            services.AddControllers();

            services.AddSpaStaticFiles(spa =>
            {
                spa.RootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "build");
            });

            var token = Configuration.GetSection("Token");            
            services.Configure<Token>(token); // due to this we can inject config section as IOptions<Type>          

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(bearer =>
            {
                bearer.RequireHttpsMetadata = false;
                bearer.SaveToken = true;
                bearer.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(token.Get<Token>().Secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero // no tolerance when token expired (5 minutes by default)
                };
            });

            services.AddScoped<IAuthenticationService, JwtAuthenticationService>();           
        }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles(); 

            app.UseRouting();           
            app.UseAuthentication();
            app.UseAuthorization(); 

            app.UseCors(cors => cors
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());           

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();               
            });

            app.UseSpa(spa => 
            {
                spa.Options.SourcePath = "wwwroot";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer("start");
                }
            });  
        }
    }
}
