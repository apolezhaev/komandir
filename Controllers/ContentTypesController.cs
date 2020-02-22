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
    public class ContentTypesController : ControllerBase
    {
        private readonly KomandirDbContext _context;

        public ContentTypesController(KomandirDbContext context)
        {
            _context = context;
        }

        // GET: api/ContentTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContentType>>> GetContentTypes()
        {
            return await _context.ContentTypes.ToListAsync();
        }

        // GET: api/ContentTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContentType>> GetContentType(int id)
        {
            var contentType = await _context.ContentTypes.FindAsync(id);

            if (contentType == null)
            {
                return NotFound();
            }

            return contentType;
        }

        // PUT: api/ContentTypes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContentType(int id, ContentType contentType)
        {
            if (id != contentType.ContentTypeID)
            {
                return BadRequest();
            }

            _context.Entry(contentType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_context.ContentTypes.Any(e => e.ContentTypeID == id))
                    throw;

                return NotFound();
            }

            return NoContent();
        }

        // POST: api/ContentTypes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ContentType>> PostContentType(ContentType contentType)
        {
            _context.ContentTypes.Add(contentType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContentType", new { id = contentType.ContentTypeID }, contentType);
        }

        // DELETE: api/ContentTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ContentType>> DeleteContentType(int id)
        {
            var contentType = await _context.ContentTypes.FindAsync(id);
            if (contentType == null)
            {
                return NotFound();
            }

            _context.ContentTypes.Remove(contentType);
            await _context.SaveChangesAsync();

            return contentType;
        }
    }
}
