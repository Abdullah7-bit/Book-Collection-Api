create database BookContext



create table Books(
Id int NOT NULL,
Title varchar,
Author varchar,
Publisher varchar,
PublishedDate date,
Edition varchar,
ISBN varchar,
PRIMARY KEY (Id)
);

INSERT INTO Books (Id, Title, Author, Publisher, PublishedDate, Edition, ISBN)
VALUES
(1, 'The Catcher in the Rye', 'J.D. Salinger', 'Little, Brown and Company', '1951-07-16', 'First Edition', '9780316769480'),
(2, 'To Kill a Mockingbird', 'Harper Lee', 'J.B. Lippincott & Co.', '1960-07-11', 'Original Edition', '9780061120084'),
(3, '1984', 'George Orwell', 'Secker & Warburg', '1949-06-08', 'First Edition', '9780451524935'),
(4, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Charles Scribners Sons', '1925-04-10', 'First Edition', '9780743273565'),
(5, 'Pride & Prejudice', 'Jane Austen', 'T. Egerton, Whitehall', '1813-01-28', 'First Edition', '9780141439518'),
(6, 'Harry Potter & the Philosophers Stone', 'J.K. Rowling', 'Bloomsbury Publishing', '1997-06-26', 'First Edition', '9780747532743'),
(7, 'The Hobbit', 'J.R.R. Tolkien', 'George Allen & Unwin', '1937-09-21', 'First Edition', '9780261102217');



create table logs(
Id int primary key identity(1,1),
Date DATETIME,
Level nvarchar(max),
Message nvarchar(max),
Machinename nvarchar(max),
Logger nvarchar(max),
UserId int
);
