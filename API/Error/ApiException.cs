using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Error
{
    public class ApiException
    {
        public ApiException(int statusCode, string details, string Message)
        {
            this.StatusCode = statusCode;
            this.Details = details;
            this.Message = Message;
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}