using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Komandir.Models
{
    [JsonObject("Token")]
    public class Token
    {
        [JsonProperty("Secret")]
        public string Secret { get; set; }
        [JsonProperty("Expires")]
        public int Expires { get; set; }
    }
}
