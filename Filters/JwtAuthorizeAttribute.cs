using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Komandir.Filters
{
    public class JwtAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {           
            var identity = (ClaimsIdentity)context.HttpContext.User.Identity;
            var isAuthenticated = identity.IsAuthenticated;
            var isAdministrator = identity.HasClaim(ClaimTypes.Role, "administrator");

            if (!isAuthenticated || !isAdministrator)
                context.Result = new ForbidResult();
        }
    }
}
