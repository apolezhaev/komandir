using Komandir.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Komandir.Services
{
    public class JwtAuthenticationService : IAuthenticationService
    {        
        private readonly Token _token;

        public JwtAuthenticationService(IOptions<Token> token)
        {
            _token = token.Value;
        }        

        public bool Login(TokenRequest request, out string token)
        {
            //TODO: authenticate user            

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_token.Secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(               
                claims : new[] {
                    new Claim(ClaimTypes.Name, request.Username),
                    new Claim(ClaimTypes.Role, "administrator")
                }, 
                expires: DateTime.Now.AddMinutes(_token.Expires),
                signingCredentials: credentials
            );

            token = new JwtSecurityTokenHandler().WriteToken(jwt);
            return true;
        }              
    }
}
