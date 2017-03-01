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
    public abstract class DataGatewayBase<T>
    {
        #region Static Members

        private static string connectionString = @"Data Source=YASANTHAP1\SQLEXPRESS;Initial Catalog=IC_GROUP;Integrated Security=True";

        #endregion

        #region Abstract Members

        protected abstract string CommandText { get; }
        protected abstract Collection<IDataParameter> GetParameters(IDbCommand command);

        #endregion

        #region Virtual Members

        protected virtual System.Data.IDbConnection GetConnection()
        {
            IDbConnection connection = new SqlConnection(connectionString);
            return connection;
        }

        protected virtual CommandType CommandType
        {
            get { return System.Data.CommandType.StoredProcedure; }
        }

        #endregion

        #region Methods

        protected IDataParameter GetDBParameter(IDbCommand command, string parameterName, object parameterValue, ParameterDirection direction)
        {
            IDataParameter param = command.CreateParameter();
            param.ParameterName = parameterName;
            param.Value = parameterValue;
            param.Direction = direction;
            return param;
        }

        #endregion
    }
}