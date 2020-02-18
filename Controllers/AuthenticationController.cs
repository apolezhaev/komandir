using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Komandir.Models;
using Komandir.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Komandir.Controllers
{   
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _auth;
        public AuthenticationController(IAuthenticationService auth)
        {
            _auth = auth;
        }

        [AllowAnonymous]
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]TokenRequest request)
        {
            if (!ModelState.IsValid)           
                return BadRequest(ModelState);  
           
            if (_auth.Login(request, out string token))
                return Ok(token);

            return BadRequest("Invalid Request");            
        }
    }


    
}