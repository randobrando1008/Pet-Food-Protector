using MySql.Data.MySqlClient;
using System;

namespace PFP_API.Services
{
    public class ConnectionService : IDisposable
    {
        public MySqlConnection Connection = new MySqlConnection("server=localhost;user=root;database=pfp;port=3306;password=bggbgg1017");

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
