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
    public class PetsController : ControllerBase
    {
        private ConnectionService _connectionService = new ConnectionService();

        [HttpGet]
        public IEnumerable<Pets> GetPets()
        {
            _connectionService.Connect();
            string query = "SELECT name, weight, age, gender FROM pet_information";
            MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection);

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Pets> pets = new List<Pets>();

            while (rdr.Read())
            {
                pets.Add(new Pets(rdr.GetString(0), rdr.GetDecimal(1), rdr.GetInt32(2), rdr.GetString(3)));
            }

            return pets;
        }

        [HttpPost]
        public void Register(Pets pets)
        {
            _connectionService.Connect();

            try
            {
                MySqlTransaction myTrans;
                myTrans = _connectionService.Connection.BeginTransaction();

                pets.ID = Guid.NewGuid().ToString();

                string query = "INSERT INTO pet_information VALUES(@pid, @user_id, @name, @weight, @age, @gender)";
                MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection, myTrans);
                cmd.Parameters.Add("@pid", MySqlDbType.VarChar, 36).Value = pets.ID;
                cmd.Parameters.Add("@user_id", MySqlDbType.VarChar, 36).Value = "701b6696-c1d2-4da7-9433-231eb976e692";
                cmd.Parameters.Add("@name", MySqlDbType.VarChar, 20).Value = pets.Name;
                cmd.Parameters.Add("@weight", MySqlDbType.Float).Value = pets.Weight;
                cmd.Parameters.Add("@age", MySqlDbType.Int32).Value = pets.Age;
                cmd.Parameters.Add("@gender", MySqlDbType.VarChar, 10).Value = pets.Gender;

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
