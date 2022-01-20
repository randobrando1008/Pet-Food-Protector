using System;

namespace TMS_API
{
    public class User
    {
        internal User(string id, string name)
        {
            ID = id;
            Name = name;
        }

        public string ID { get; set; }

        public string Name { get; set; }
    }
}
