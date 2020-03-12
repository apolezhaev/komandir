using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Komandir.Models
{
    public class Field
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public bool Required { get; set; }
        public string Regex { get; set; }
        public int DataTypeID { get; set; }
        [JsonIgnore]
        public DataType DataType { get; set; }
        public int ContentTypeID { get; set; }
        [JsonIgnore]
        public ContentType ContentType { get; set; }

    }
}
