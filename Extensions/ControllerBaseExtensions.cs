using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Komandir.Extensions
{
    public static class ControllerBaseExtensions
    {
        public static ActionResult Json(this ControllerBase controller, object value)
        {
            return controller.Content(JsonConvert.SerializeObject(value, new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver { NamingStrategy = new CamelCaseNamingStrategy() }
            }));
        }
    }
}
