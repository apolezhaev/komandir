using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Komandir.Models
{
    public class ContentTypeAttribute
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ContentTypeAttributeID { get; set; }
        [Required]
        public string Name { get; set; }        
        public int DataTypeID { get; set; }
        public DataType DataType { get; set; }
        public int ContentTypeID { get; set; }
        [JsonIgnore]
        public ContentType ContentType { get; set; }

    }
}
