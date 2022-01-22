using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using PFP_API.Models;
using PFP_API.Services;

namespace PFP_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private ConnectionService _ConnectionService = new ConnectionService();

        [HttpPost]
        public LoginResponse Login(LoginInformation request)
        {
            _ConnectionService.Connect();

            string query = "SELECT * FROM login_information WHERE username = @user LIMIT 1";
            MySqlCommand cmd = new MySqlCommand(query, _ConnectionService.Connection);
            cmd.Parameters.Add("@user", MySqlDbType.VarChar, 45).Value = request.Username;

            cmd.ExecuteNonQuery();

            using MySqlDataReader rdr = cmd.ExecuteReader();
            LoginInformation dbLoginInfo = null;

            if (rdr.Read())
            {
                string isManager = rdr.GetString(3);
                dbLoginInfo = new LoginInformation(rdr.GetString(0), rdr.GetString(1), rdr.GetString(2), isManager == "1" ? true : false);
            }

            if (dbLoginInfo == null)
            {
                Console.WriteLine("User not found");
                return new LoginResponse("Invalid Username or Password.", "", "", false, "");
            }

            if (PasswordHashing.Compare(request.Password, dbLoginInfo.Password))
            {
                string token = TokenHelper.generateJwtToken(dbLoginInfo.EmployeeID);
                return new LoginResponse("Success!", dbLoginInfo.Username, dbLoginInfo.EmployeeID, dbLoginInfo.IsManager, token);
            }

            return new LoginResponse("Invalid Username or Password.", "", "", false, "");
        }
    }
}
