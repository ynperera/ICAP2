using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Linq;
using System.Text;

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public abstract class ReadMapperBase<T>
    {
        protected abstract T Map(IDataRecord record);

        public Collection<T> MapAll(IDataReader reader)
        {
            Collection<T> collection = new Collection<T>();

            while (reader.Read())
            {
                try
                {
                    collection.Add(Map(reader));
                }
                catch
                {
                    throw;

                    // NOTE:
                    // consider handling exeption here instead of re-throwing
                    // if graceful recovery can be accomplished
                }
            }

            return collection;
        }
    }
}
