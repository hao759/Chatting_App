using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helper;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : BaseController
    {
        private readonly IMessageRepository messageRepository;
        public IUserRepositoty UserRepositoty { get; }
        private readonly IMapper mapper;
        public DataContext DataContext { get; }

        public MessagesController(IUserRepositoty userRepositoty, IMessageRepository messageRepository, IMapper mapper, DataContext dataContext)
        {
            this.DataContext = dataContext;
            this.mapper = mapper;
            this.UserRepositoty = userRepositoty;
            this.messageRepository = messageRepository;
        }
        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUserName();

            if (username == createMessageDto.RecipientUsername.ToLower())
                return BadRequest("You cannot send messages to yourself");

            var sender = await UserRepositoty.GetUserByUsernameAsync(username);
            var recipient = await UserRepositoty.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

            if (recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.Name,
                RecipientUsername = recipient.Name,
                Content = createMessageDto.Content
            };
            messageRepository.AddMessage(message);

            if (await UserRepositoty.SaveAllAsync())
                return Ok(mapper.Map<MessageDto>(message));
            return BadRequest("Failed to send message");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUserName();
            var messages = await messageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage,
                messages.PageSize, messages.TotalCount, messages.TotalPages));
            return messages;
        }
        [HttpGet("thread/{username}")]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessageThread(string username)
        {
            var currentUserName = User.GetUserName();
            return Ok(await messageRepository.GetMessageThread(currentUserName, username));
        }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult> DeleteMessage(int id)
        // {
        //     var username = User.GetUsername();

        //     var message = await _uow.MessageRepository.GetMessage(id);

        //     if (message.SenderUsername != username && message.RecipientUsername != username)
        //         return Unauthorized();

        //     if (message.SenderUsername == username) message.SenderDeleted = true;

        //     if (message.RecipientUsername == username) message.RecipientDeleted = true;

        //     if (message.SenderDeleted && message.RecipientDeleted)
        //     {
        //         _uow.MessageRepository.DeleteMessage(message);
        //     }

        //     if (await _uow.Complete()) return Ok();

        //     return BadRequest("Problem deleting the message");
        // }

    }
}