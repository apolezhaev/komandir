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
    public class ContentTypeAttributesController : ControllerBase
    {
        private readonly KomandirDbContext _context;

        public ContentTypeAttributesController(KomandirDbContext context)
        {
            _context = context;
        }

        // GET: api/ContentTypeAttributes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContentTypeAttribute>>> GetContentTypeAttributes()
        {
            return await _context.ContentTypeAttributes.ToListAsync();
        }

        // GET: api/ContentTypeAttributes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContentTypeAttribute>> GetContentTypeAttribute(int id)
        {
            var contentTypeAttribute = await _context.ContentTypeAttributes.FindAsync(id);

            if (contentTypeAttribute == null)
            {
                return NotFound();
            }

            return contentTypeAttribute;
        }

        // PUT: api/ContentTypeAttributes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContentTypeAttribute(int id, ContentTypeAttribute contentTypeAttribute)
        {
            if (id != contentTypeAttribute.ContentTypeAttributeID)
            {
                return BadRequest();
            }

            _context.Entry(contentTypeAttribute).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentTypeAttributeExists(id))
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

        // POST: api/ContentTypeAttributes
        [HttpPost]
        public async Task<ActionResult<ContentTypeAttribute>> PostContentTypeAttribute(ContentTypeAttribute contentTypeAttribute)
        {
            _context.ContentTypeAttributes.Add(contentTypeAttribute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContentTypeAttribute", new { id = contentTypeAttribute.ContentTypeAttributeID }, contentTypeAttribute);
        }

        // DELETE: api/ContentTypeAttributes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ContentTypeAttribute>> DeleteContentTypeAttribute(int id)
        {
            var contentTypeAttribute = await _context.ContentTypeAttributes.FindAsync(id);
            if (contentTypeAttribute == null)
            {
                return NotFound();
            }

            _context.ContentTypeAttributes.Remove(contentTypeAttribute);
            await _context.SaveChangesAsync();

            return contentTypeAttribute;
        }

        private bool ContentTypeAttributeExists(int id)
        {
            return _context.ContentTypeAttributes.Any(e => e.ContentTypeAttributeID == id);
        }
    }
}
