#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using ICGROUP.CAMPAIGN_MANAGER.BUSINESS;
using ICGROUP.CAMPAIGN_MANAGER.COMMON;
using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using ICGROUP.CAMPAIGN_MANAGER.SERVICES.Models;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.SERVICES.Controllers
{
    public class UserController : ApiController
    {
        public UserDataManager userDataManager = new UserDataManager();

        User[] users = new User[] 
        { 
            new User { UserId = (new Random()).Next(0,10000).ToString(), FirstName = "Tomato Soup", LastName = "test", Email = "Groceries", Status = COMMON.UserStatus.Active, CreatedDate = DateTime.Now}, 
            new User { UserId = (new Random()).Next(0,10000).ToString(), FirstName = "Yo-yo", LastName = "test1", Email = "3.75M", Status = COMMON.UserStatus.Active, CreatedDate = DateTime.Now}, 
            new User { UserId = (new Random()).Next(0,10000).ToString(), FirstName = "Hammer", LastName = "test2", Email = "16.99M", Status = COMMON.UserStatus.Active, CreatedDate = DateTime.Now },
            new User { UserId =(new Random()).Next(0,10000).ToString(), FirstName = "Hammer1", LastName = "test33", Email = "16.99aaM", Status = UserStatus.Active, CreatedDate = DateTime.Now },
            new User { UserId = (new Random()).Next(0,10000).ToString(), FirstName = "Tomato Soupasda", LastName = "test4", Email = "Groceries", Status = COMMON.UserStatus.Active, CreatedDate = DateTime.Now}, 
            new User { UserId = (new Random()).Next(0,10000).ToString(), FirstName = "Yo-yoaadfa", LastName = "test5", Email = "3.75M", Status = COMMON.UserStatus.Active, CreatedDate = DateTime.Now}, 
            new User { UserId =(new Random()).Next(0,10000).ToString(), FirstName = "Hammeraaa", LastName = "test6", Email = "16.99M", Status = COMMON.UserStatus.Active, CreatedDate = DateTime.Now },
            new User { UserId =(new Random()).Next(0,10000).ToString(), FirstName = "Hammer1we", LastName = "JPdasfasf", Email = "16.99aaM", Status = UserStatus.Active, CreatedDate = DateTime.Now },
            new User { UserId =(new Random()).Next(0,10000).ToString(), FirstName = "Hammer1fefae", LastName = "JP", Email = "16.99aaM", Status = UserStatus.Active, CreatedDate = DateTime.Now },
            new User { UserId = (new Random()).Next(0,10000).ToString(), FirstName = "Tomato Soupasda", LastName = "AFdasa", Email = "Groceries", Status = COMMON.UserStatus.Active, CreatedDate = DateTime.Now}, 
            new User { UserId = (new Random()).Next(0,10000).ToString(), FirstName = "Yo-yoaadfawe", LastName = "AUfasdfa", Email = "3.75M", Status = COMMON.UserStatus.Active, CreatedDate = DateTime.Now}, 
            new User { UserId =(new Random()).Next(0,10000).ToString(), FirstName = "Hammeraaa", LastName = "INfdafa", Email = "16.99M", Status = COMMON.UserStatus.Active, CreatedDate = DateTime.Now },
            new User { UserId ="100", FirstName = "Hammer1aaa", LastName = "JPdasfasfew", Email = "16.99aaM", Status = UserStatus.Active, CreatedDate = DateTime.Now }
        };
        
        [HttpPost]
        public HttpResponseMessage Add([FromBody]User userModel)
        {
            ResponseData response = userDataManager.Add(userModel);

            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    UserId = response.Id,
                    Status = response.StatusCode,
                    StatusMessage = response.StatusMessage
                })
            };            
        }

        [HttpPost]
        public HttpResponseMessage Edit([FromBody]User userModel)
        {
            ResponseData response = userDataManager.Add(userModel);

            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    UserId = response.Id,
                    Status = response.StatusCode,
                    StatusMessage = response.StatusMessage
                })
            };
        }

        [HttpPost]
        public HttpResponseMessage Delete([FromBody]string userId)
        {
            ResponseData response = userDataManager.Delete(userId);

            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    UserId = response.Id,
                    StatusCode = response.StatusCode,
                    StatusMessage = response.StatusMessage,
                })
            };
        }

        [HttpPost]
        public HttpResponseMessage SetStatus([FromBody]User user)
        {
            ResponseData response = userDataManager.SetUserStatus(user);

            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    UserId = response.Id,
                    Status = response.StatusCode,
                    StatusMessage = response.StatusMessage

                })
            };   
        }

        [HttpPost]
        //public HttpResponseMessage Search([FromBody]SearchBase searchBase)
        public HttpResponseMessage Search([FromBody]UserSearch searchBase)
        {
            ReaderResponseData response = userDataManager.Search(searchBase);

            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    StatusCode = response.StatusCode,
                    StatusMessage = response.StatusMessage ,
                    PageSize = response.PageSize != -1 ? response.PageSize : searchBase.PageSize,
                    PageIndex = response.PageIndex != -1 ? response.PageIndex : searchBase.PageIndex,
                    SortKey = response.SortKey,
                    SearchKey = response.SearchKey,
                    SortDirection = response.SortDirection,
                    Data = response.Data,
                    TotalRecords = 30
                })
            };
        }

        [HttpPost]
        public HttpResponseMessage GetUser([FromBody]string userId)
        {
            UserList response = userDataManager.Search(userId);
            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    StatusCode = response.StatusCode,
                    StatusMessage = response.StatusMessage,
                    Data = response.Users
                })
            };
        }

        [HttpPost]
        public HttpResponseMessage AuthenticateUser([FromBody]User user) 
        {
            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                    {                        
                        PageSize = 10,
                        PageIndex = 0,
                        Data = users
                    })
            };
        }

        [HttpPost]
        public HttpResponseMessage PasswordResetRequestByUser([FromBody]string email)
        {
            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    PageSize = 10,
                    PageIndex = 0,
                    Data = users
                })
            };
        }

        [HttpPost]
        public HttpResponseMessage PasswordResetRequestByAdmin([FromBody]string userId)
        {
            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    PageSize = 10,
                    PageIndex = 0,
                    Data = users
                })
            };
        }

        [HttpPost]
        public HttpResponseMessage ResetPassword([FromBody]User user)
        {
            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    PageSize = 10,
                    PageIndex = 0,
                    Data = users
                })
            };
        }
    }
}