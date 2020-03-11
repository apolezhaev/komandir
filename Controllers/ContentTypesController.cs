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
        private readonly KomandirDbContext _db;

        public ContentTypesController(KomandirDbContext context)
        {
            _db = context;
        }

        // GET: api/ContentTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContentType>>> GetContentTypes()
        {
            return await _db.ContentTypes.ToListAsync();
        }

        // GET: api/ContentTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContentType>> GetContentType(int id)
        {
            var contentType = await _db.ContentTypes
                .Include(x => x.ContentTypeAttributes)
                .FirstOrDefaultAsync(x => x.ContentTypeID == id);

            if (contentType == null)
            {
                return NotFound();
            }

            return contentType;
        }

        // PUT: api/ContentTypes/5       
        [HttpPut("{id}")]
        public async Task<ActionResult<ContentType>> PutContentType(int id, ContentType contentType)
        {
            if (id != contentType.ContentTypeID)
            {
                return BadRequest();
            }

            _db.Entry(contentType).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_db.ContentTypes.Any(e => e.ContentTypeID == id))
                    throw;

                return NotFound();
            }
            
            return contentType;
        }

        // POST: api/ContentTypes     
        [HttpPost]
        public async Task<ActionResult<ContentType>> PostContentType(ContentType contentType)
        {
            _db.ContentTypes.Add(contentType);
            await _db.SaveChangesAsync();

            return CreatedAtAction("GetContentType", new { id = contentType.ContentTypeID }, contentType);
        }

        // DELETE: api/ContentTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ContentType>> DeleteContentType(int id)
        {
            var contentType = await _db.ContentTypes.FindAsync(id);
            if (contentType == null)
            {
                return NotFound();
            }

            _db.ContentTypes.Remove(contentType);
            await _db.SaveChangesAsync();

            return contentType;
        }
    }
}
