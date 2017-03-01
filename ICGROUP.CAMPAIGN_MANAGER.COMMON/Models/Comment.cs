using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int ClauseId { get; set; }
        public int UserId { get; set; }
        public string content { get; set; }
    }
}