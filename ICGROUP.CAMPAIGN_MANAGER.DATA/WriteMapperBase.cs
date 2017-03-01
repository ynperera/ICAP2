#region Using Directives

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public abstract class WriteMapperBase<T>
    {
        public abstract T Map(IDbCommand command);        
    }
}
