﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Komandir.Models
{
    public class ContentType
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ContentTypeID { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<ContentTypeAttribute> ContentTypeAttributes { get; set; }
    }
}
