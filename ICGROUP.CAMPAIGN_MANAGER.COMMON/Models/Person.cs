using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON.Models
{
    public class Person
    {
        #region Constructors

        public Person() { }

        #endregion

        #region Member Variables

        private int m_id;
        private string m_firstName;
        private string m_lastName;
        private string m_email;

        #endregion

        #region Properties

        public int Id
        {
            get { return m_id; }
            set { m_id = value; }
        }

        public string FirstName
        {
            get { return m_firstName; }
            set { m_firstName = value; }
        }

        public string LastName
        {
            get { return m_lastName; }
            set { m_lastName = value; }
        }

        public string Email
        {
            get { return m_email; }
            set { m_email = value; }
        }

        #endregion
    }
}
