using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Komandir.Data;
using Komandir.Models;
using Komandir.Extensions;
using Newtonsoft.Json;

namespace Komandir.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly KomandirDbContext _context;

        public ContentController(KomandirDbContext context)
        {
            _context = context;
        }

        // GET: api/Content
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Content>>> GetContent()
        {
            return await _context.Content.ToListAsync();
        }

        // GET: api/Content/ContentType/5
        [HttpGet("ContentType/{id}")]
        public async Task<ActionResult<IEnumerable<Content>>> GetContentByContentType(int id)
        {
            return await _context.Content
                .Where(x => x.ContentTypeID == id)
                .ToListAsync();
        }

        // GET: api/Content/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetContent(int id)
        {
            var content = await _context.Content.FindAsync(id);
            if (content == null)            
                return NotFound();         

            var contentTypeID = content.ContentTypeID;
            var contentType = await _context.ContentTypes
                .Include(x => x.Fields)                
                .FirstOrDefaultAsync(x => x.ID == contentTypeID);
           
            var values = (content.Properties != null 
                ? JsonConvert.DeserializeObject<List<FieldValue>>(content.Properties) 
                : new List<FieldValue>()).ToDictionary(x => x.Field, y => y);

            var result = new
            {
                content.ID,
                content.Url,
                content.ContentTypeID,
                properties = contentType.Fields.Select(x => new
                {
                    x.ID,
                    x.Name,
                    x.DisplayName,
                    x.Description,
                    x.Regex,
                    x.Required,
                    x.DataTypeID,
                    Value = values.ContainsKey(x.ID) ? values[x.ID].Value : null
                }).ToArray()
            };          
           
            return this.Json(result);
        }

        // PUT: api/Content/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContent(int id, Content content)
        {
            if (id != content.ID)
            {
                return BadRequest();
            }

            _context.Entry(content).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentExists(id))
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

        // POST: api/Content
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Content>> PostContent(Content content)
        {
            _context.Content.Add(content);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContent", new { id = content.ID }, content);
        }

        // DELETE: api/Content/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Content>> DeleteContent(int id)
        {
            var content = await _context.Content.FindAsync(id);
            if (content == null)
            {
                return NotFound();
            }

            _context.Content.Remove(content);
            await _context.SaveChangesAsync();

            return content;
        }

        private bool ContentExists(int id)
        {
            return _context.Content.Any(e => e.ID == id);
        }
    }
}
