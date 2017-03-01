#region Using Directives

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Linq;
using System.Text;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public abstract class ObjectWriterBase<T> : DataGatewayBase<T>
    {       
        protected abstract WriteMapperBase<T> GetMapper();

        public T Execute()
        {
            using (IDbConnection connection = GetConnection())
            {
                IDbCommand command = connection.CreateCommand();
                command.Connection = connection;
                command.CommandText = this.CommandText;
                command.CommandType = this.CommandType;

                foreach (IDataParameter param in this.GetParameters(command))
                    command.Parameters.Add(param);

                try
                {
                    connection.Open();
                    int rowsEffected = command.ExecuteNonQuery();

                    try
                    {
                        WriteMapperBase<T> mapper = GetMapper();
                        T result = mapper.Map(command);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        throw;
                    }
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }
}
