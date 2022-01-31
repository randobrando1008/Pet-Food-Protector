using System;

namespace PFP_API
{
    public class Pets
    {
        public Pets() { }
        public Pets(string name, decimal weight, int age, string gender)
        {
            Name = name;
            Weight = weight;
            Age = age;
            Gender = gender;
        }
        public string ID { get; set; }
        public string UserID { get; set; }
        public string Name { get; set; }
        public decimal Weight { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
    }
}
