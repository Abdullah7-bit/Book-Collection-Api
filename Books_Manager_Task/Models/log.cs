namespace Books_Manager_Task.Models
{
    public class Log
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Level { get; set; } 
        public string Message { get; set; }
        public string MachineName { get; set; }
        public string Logger { get; set; }
    }
}
