using Komandir.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Komandir.Services
{
    public interface IAuthenticationService
    {
        bool Login(TokenRequest request, out string token);
    }
}
