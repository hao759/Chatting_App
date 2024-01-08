using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helper;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository : IMessageRepository
    {
        public DataContext _context;
        private readonly IMapper mapper;
        public MessageRepository(DataContext dataContext, IMapper mapper)
        {
            this.mapper = mapper;
            this._context = dataContext;

        }
        public void AddMessage(Message message)
        {
            _context.Message.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Message.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Message.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = _context.Message
            .OrderBy(x => x.MessageSent)
            .AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.Name == messageParams.Username &&
                 u.RecipientDeleted == false),
                "Outbox" => query.Where(u => u.Sender.Name == messageParams.Username &&
                    u.SenderDeleted == false),
                _ => query.Where(u => u.Recipient.Name == messageParams.Username
                    && u.RecipientDeleted == false && u.DateRead == null)
            };

            var messages = query.ProjectTo<MessageDto>(mapper.ConfigurationProvider);

            return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientUserName)
        {
            var query = await _context.Message
           .Include(s => s.Sender).ThenInclude(s => s.Photos)
           .Include(s => s.Recipient).ThenInclude(s => s.Photos)
           .Where(s => s.RecipientUsername == currentUserName && s.RecipientDeleted == false
           && s.SenderUsername == recipientUserName
           || s.RecipientUsername == recipientUserName && s.SenderDeleted == false
           && s.SenderUsername == currentUserName).OrderBy(m => m.MessageSent)
           .ToListAsync();

            var unreadMessages = query.Where(m => m.DateRead == null
                && m.RecipientUsername == currentUserName).ToList();

            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;
                }
                await _context.SaveChangesAsync();
            }

            return mapper.Map<IEnumerable<MessageDto>>(query);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}