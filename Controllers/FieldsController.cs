using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Komandir.Data;
using Komandir.Models;

namespace Komandir.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldsController : ControllerBase
    {
        private readonly KomandirDbContext _context;

        public FieldsController(KomandirDbContext context)
        {
            _context = context;
        }

        // GET: api/Fields
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Field>>> GetFields()
        {
            return await _context.Fields.ToListAsync();
        }

        // GET: api/Fields/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Field>> GetField(int id)
        {
            var Field = await _context.Fields.FindAsync(id);

            if (Field == null)
            {
                return NotFound();
            }

            return Field;
        }

        // PUT: api/Fields/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutField(int id, Field field)
        {
            if (id != field.ID)
            {
                return BadRequest();
            }

            _context.Entry(field).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FieldExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Fields
        [HttpPost]
        public async Task<ActionResult<Field>> PostField(Field field)
        {
            _context.Fields.Add(field);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetField", new { id = field.ID }, field);
        }

        // DELETE: api/Fields/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Field>> DeleteField(int id)
        {
            var Field = await _context.Fields.FindAsync(id);
            if (Field == null)
            {
                return NotFound();
            }

            _context.Fields.Remove(Field);
            await _context.SaveChangesAsync();

            return Field;
        }

        private bool FieldExists(int id)
        {
            return _context.Fields.Any(e => e.ID == id);
        }
    }
}
