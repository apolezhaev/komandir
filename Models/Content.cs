using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Komandir.Models
{
    public class Content
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public string Url { get; set; }
        public string Properties { get; set; }
        public int ContentTypeID { get; set; }
        [JsonIgnore]
        public ContentType ContentType { get; set; }
    }
}
