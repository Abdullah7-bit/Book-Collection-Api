namespace Books_Manager_Task.Models
{
    public class Book
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Author { get; set; } = string.Empty;

        public string Publisher { get; set; } = string.Empty;

        public DateOnly PublishedDate { get; set; }

        public string Edition { get; set; } = string.Empty;

        public string ISBN { get; set; } = string.Empty;

       



    }
}
