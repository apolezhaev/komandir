using Komandir.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Komandir.Data
{
    public class KomandirDbContext : DbContext
    {
        public KomandirDbContext(DbContextOptions<KomandirDbContext> options)
            : base(options) {            
        }
        public DbSet<ContentType> ContentTypes { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<FieldEditor> FieldEditors { get; set; }
        public DbSet<DataType> DataTypes { get; set; }
        public DbSet<Content> Content { get; set; }
    }
}
