using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using System;
using PFP_API.Services;
using PFP_API.Utilities;

namespace PFP_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private ConnectionService _connectionService = new ConnectionService();

        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            _connectionService.Connect();
            string query = "SELECT first_name, last_name, email FROM user_information";
            MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection);

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<User> user = new List<User>();

            while (rdr.Read())
            {
                user.Add(new User(rdr.GetString(0), rdr.GetString(1), rdr.GetString(2)));
            }

            return user;
        }

        [HttpPost]
        public void Register(User user)
        {
            _connectionService.Connect();

            try
            {
                MySqlTransaction myTrans;
                myTrans = _connectionService.Connection.BeginTransaction();

                user.ID = Guid.NewGuid().ToString();

                string query = "INSERT INTO user_information VALUES(@id, @name_first, @name_last, @email)";
                MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection, myTrans);
                cmd.Parameters.Add("@id", MySqlDbType.VarChar, 36).Value = user.ID;
                cmd.Parameters.Add("@name_first", MySqlDbType.VarChar, 20).Value = user.FirstName;
                cmd.Parameters.Add("@name_last", MySqlDbType.VarChar, 20).Value = user.LastName;
                cmd.Parameters.Add("@email", MySqlDbType.VarChar, 45).Value = user.Email;

                cmd.ExecuteNonQuery();

                myTrans.Commit();
            }
            catch (Exception ex)
            {
                Console.WriteLine("An exception of type " + ex.GetType() + " was encountered while inserting the data.");
                Console.WriteLine("Neither record was written to database.");
                Console.WriteLine(ex.Message);
            }
        }
    }
}
