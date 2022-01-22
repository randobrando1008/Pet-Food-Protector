using MySql.Data.MySqlClient;
using System;

namespace PFP_API.Services
{
    public class ConnectionService : IDisposable
    {
        public MySqlConnection Connection = new MySqlConnection("server=173.90.136.43;user=brandon;database=tms;port=3306;password=P@ssw0rd");

        public void Connect()
        {
            if(Connection.State != System.Data.ConnectionState.Open)
            {
                Connection.Open();
            }
        }

        public void Dispose()
        {
            Dispose();
            Connection.Close();
        }
    }
}
