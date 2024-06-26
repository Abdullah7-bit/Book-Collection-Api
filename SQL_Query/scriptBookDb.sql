USE [master]
GO
/****** Object:  Database [BookContext]    Script Date: 30-May-24 11:26:16 AM ******/
CREATE DATABASE [BookContext]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BookContext', FILENAME = N'C:\Users\MYSQ\BookContext.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BookContext_log', FILENAME = N'C:\Users\MYSQ\BookContext_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [BookContext] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BookContext].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BookContext] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BookContext] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BookContext] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BookContext] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BookContext] SET ARITHABORT OFF 
GO
ALTER DATABASE [BookContext] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [BookContext] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BookContext] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BookContext] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BookContext] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BookContext] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BookContext] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BookContext] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BookContext] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BookContext] SET  ENABLE_BROKER 
GO
ALTER DATABASE [BookContext] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BookContext] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BookContext] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BookContext] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BookContext] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BookContext] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BookContext] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BookContext] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [BookContext] SET  MULTI_USER 
GO
ALTER DATABASE [BookContext] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BookContext] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BookContext] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BookContext] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BookContext] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BookContext] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [BookContext] SET QUERY_STORE = OFF
GO
USE [BookContext]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 30-May-24 11:26:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Books]    Script Date: 30-May-24 11:26:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[Author] [nvarchar](max) NOT NULL,
	[Publisher] [nvarchar](max) NOT NULL,
	[PublishedDate] [date] NOT NULL,
	[Edition] [nvarchar](max) NOT NULL,
	[ISBN] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Books] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Logs]    Script Date: 30-May-24 11:26:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Logs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Date] [datetime2](7) NOT NULL,
	[Level] [nvarchar](max) NOT NULL,
	[Message] [nvarchar](max) NOT NULL,
	[MachineName] [nvarchar](max) NOT NULL,
	[Logger] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Logs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 30-May-24 11:26:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[Salt] [nvarchar](max) NULL,
	[FirstName] [nvarchar](max) NOT NULL,
	[LastName] [nvarchar](max) NOT NULL,
	[Roles] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[CreatedAt] [datetime2](7) NULL,
	[UpdatedAt] [datetime2](7) NULL,
	[LastLogin] [datetime2](7) NULL,
	[Token] [nvarchar](max) NULL,
	[RefreshToken] [nvarchar](max) NULL,
	[TokenExpiration] [datetime2](7) NULL,
	[TokenCreatedAt] [nvarchar](max) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[GetBooks]    Script Date: 30-May-24 11:26:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetBooks]
AS
BEGIN
    SELECT * FROM Books;
END
GO
/****** Object:  StoredProcedure [dbo].[GetBooksByAuthor]    Script Date: 30-May-24 11:26:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetBooksByAuthor]
    @BookId int
AS
BEGIN
    SELECT * FROM Books WHERE Id = @BookId;
END
GO
/****** Object:  StoredProcedure [dbo].[GetBooksById]    Script Date: 30-May-24 11:26:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetBooksById]
    @BookId int
AS
BEGIN
    SELECT * FROM Books WHERE Id = @BookId;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteBooks]    Script Date: 30-May-24 11:26:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteBooks]
	@id int
AS
	DELETE From Books WHERE Id = @id;
RETURN 0
GO
USE [master]
GO
ALTER DATABASE [BookContext] SET  READ_WRITE 
GO
