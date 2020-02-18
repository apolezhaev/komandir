using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Komandir.Models
{
    public class ContentTypeAttributeEditor
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]        
        public int ContentTypeAttributeEditorID { get; set; }
        [Required]
        public string Name { get; set; }
        public string Component { get; set; }       
        
    }
}
