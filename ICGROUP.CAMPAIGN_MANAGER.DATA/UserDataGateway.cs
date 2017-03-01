#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using ICGROUP.CAMPAIGN_MANAGER.COMMON;
using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using System.Collections.ObjectModel;
using System.Dynamic;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public class UserDataGateway
    {
        #region Constructors

        public UserDataGateway() 
        {
        }

        #endregion

        public ResponseData AddUser(User userObj)
        {
            try
            {
                UserWriter<ResponseData> userWriter = new UserWriter<ResponseData>();
                userWriter.UserObj = userObj;
                return userWriter.Execute();
            }
            catch (Exception ex) 
            {
                ResponseData response = new ResponseData();
                response.StatusCode = RequestStatus.Failure;
                response.StatusMessage = "Failure";
                //[TODO] Need to log the error
                return response;
            }
        }

        public ResponseData EditUser(User userObj)
        {
            try
            {
                UserWriter<ResponseData> userEditer = new UserWriter<ResponseData>();
                userEditer.UserObj = userObj;
                return userEditer.Execute();
            }
            catch (Exception ex)
            {
                ResponseData response = new ResponseData();
                response.StatusCode = RequestStatus.Failure;
                response.StatusMessage = "Failure";
                //[TODO] Need to log the error
                return response;
            }
        }

        public ResponseData DeleteUser(string userId)
        {
            try
            {
                UserRemover userDeleter = new UserRemover();
                userDeleter.UserId = userId;
                return userDeleter.Execute();
            }
            catch (Exception ex)
            {
                ResponseData response = new ResponseData();
                response.StatusCode = RequestStatus.Failure;
                response.StatusMessage = "Failure";
                //[TODO] Need to log the error
                return response;
            }
        }

        public List<User> SearchUsers()
        {
            return new List<User>();
        }

        public ReaderResponseData SearchUsers(SearchBase searchMeta)
        {
            ReaderResponseData  response = new ReaderResponseData();//= new Dyna;
            
            try
            {
                UserReader reader = new UserReader();
                reader.SearchObj = searchMeta;
                Collection<User> userCollection = reader.Execute();
                response.PageIndex = searchMeta.PageIndex;
                response.PageSize = searchMeta.PageSize;
                response.SearchKey = searchMeta.SearchKey;
                response.SortDirection = searchMeta.SortDirection;
                response.SortKey = searchMeta.SortKey;
                response.StatusCode = RequestStatus.Success;
                
                if (userCollection.Count > 0)
                {
                    response.Data = userCollection;                    
                    response.StatusMessage = "Success";
                }
                else
                {                   
                    response.StatusMessage = "No Records Found";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = RequestStatus.Failure;
                response.StatusMessage = "Failed";
            }
            return response;
        }

        public UserList SearchUser(string userId)
        {
            UserList response = new UserList();
            try
            {                
                UserReader reader = new UserReader();
                Collection<User> userCollection = reader.Execute();
                if (userCollection.Count > 0)
                {
                    response.Users = userCollection;
                    response.StatusCode = RequestStatus.Success;
                    response.StatusMessage = "Success";
                }
                else
                {
                    response.StatusCode = RequestStatus.Success;
                    response.StatusMessage = "No Records Found";
                }               
            }
            catch (Exception ex) 
            {

            }
            return response;
        }

        public ResponseData SetUserStatus(User user)
        {
            ResponseData response = new ResponseData();
            try
            {
                UserStatusUpdater reader = new UserStatusUpdater();
                response = reader.Execute();
                return response;
            }
            catch (Exception ex)
            {

            }
            return response;
        }
    }
}
