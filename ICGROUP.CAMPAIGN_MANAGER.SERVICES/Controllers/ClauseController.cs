#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

using ICGROUP.CAMPAIGN_MANAGER.BUSINESS;
using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.SERVICES.Controllers
{
    public class ClauseController : ApiController
    {
        public ClausesDataManager clausesDataManager;

        public ClauseController()
        {
            clausesDataManager = new ClausesDataManager();
        }

        [HttpPost]
        public string Add([FromBody]Clause clauseModel)
        {
            string abc = clausesDataManager.Add(clauseModel);
            return abc;
        }

        [HttpPost]
        public string Edit([FromBody]Clause clauseModel)
        {
            string abc = clausesDataManager.Edit(clauseModel);
            return abc;
        }

        [HttpPost]
        public string Delete([FromBody]Clause clauseModel)
        {
            string abc = clausesDataManager.Delete(clauseModel);
            return abc;
        }

        [HttpPost]
        public string Approve([FromBody]Clause clauseModel)
        {
            string abc = clausesDataManager.Approve(clauseModel);
            return abc;
        }

        [HttpPost]
        public string Search([FromBody]Clause clauseModel)
        {
            string abc = null;
            return abc;
        }       

        [HttpPost]
        public string AddComment([FromBody]Comment clauseModel)
        {
            string abc = null;
            return abc;
        }
      
        [HttpPost]
        public string GetComments([FromBody]Clause clauseModel)
        {
            string abc = null;
            return abc;
        }
    }
}