using System.Linq;
using System.Security.Cryptography;

namespace PFP_API.Utilities
{
    public static class PasswordHashing
    {
        //Generate 128-bit salted, 256-bit password hash
        public static string Hash(string password)
        {
            using (Rfc2898DeriveBytes algorithm = new Rfc2898DeriveBytes(password, 16, 1000, HashAlgorithmName.SHA256))
            {
                string key = System.Convert.ToBase64String(algorithm.GetBytes(32));
                string salt = System.Convert.ToBase64String(algorithm.Salt);

                return $"{salt}.{key}";
            }
        }

        //Check if current password is correct
        public static bool Compare(string password, string hashedPassword)
        {
            string[] hashArray = hashedPassword.Split('.', 2);

            byte[] salt = System.Convert.FromBase64String(hashArray[0]);
            byte[] key = System.Convert.FromBase64String(hashArray[1]);

            using (Rfc2898DeriveBytes algorithm = new Rfc2898DeriveBytes(password, salt, 1000, HashAlgorithmName.SHA256))
            {
                byte[] generatedKey = algorithm.GetBytes(32);

                return generatedKey.SequenceEqual(key);
            }
        }
    }
}
