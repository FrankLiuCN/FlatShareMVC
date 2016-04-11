
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 04/10/2016 20:30:59
-- Generated from EDMX file: C:\Frank\SourceCode\FlatShareMVC\FlatShareMVC\Models\FlatShareDBModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [FlatShare];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Outlay]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Outlay];
GO
IF OBJECT_ID(N'[dbo].[OutlayLine]', 'U') IS NOT NULL
    DROP TABLE [dbo].[OutlayLine];
GO
IF OBJECT_ID(N'[dbo].[PayItem]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PayItem];
GO
IF OBJECT_ID(N'[dbo].[UserAccount]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserAccount];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Outlay'
CREATE TABLE [dbo].[Outlay] (
    [oId] int IDENTITY(1,1) NOT NULL,
    [oTotalMoney] decimal(18,2)  NOT NULL,
    [opiId] int  NOT NULL,
    [oDate] datetime  NOT NULL,
    [oRemark] nvarchar(250)  NULL,
    [oDeleted] bit  NULL,
    [oUpdatedBy] int  NOT NULL,
    [oUpdatedDate] datetime  NOT NULL
);
GO

-- Creating table 'OutlayLine'
CREATE TABLE [dbo].[OutlayLine] (
    [olId] int IDENTITY(1,1) NOT NULL,
    [oluaId] int  NULL,
    [olPayMoney] decimal(18,2)  NULL,
    [olRemark] nvarchar(250)  NULL,
    [olDelete] bit  NULL,
    [olUpdatedBy] int  NULL,
    [olUpdatedDate] datetime  NULL
);
GO

-- Creating table 'PayItem'
CREATE TABLE [dbo].[PayItem] (
    [piId] int IDENTITY(1,1) NOT NULL,
    [piName] nvarchar(100)  NOT NULL,
    [piRemark] nvarchar(250)  NULL,
    [piDeleted] bit  NULL,
    [piUpdatedBy] int  NULL,
    [piUpdatedDate] datetime  NULL
);
GO

-- Creating table 'UserAccount'
CREATE TABLE [dbo].[UserAccount] (
    [uaId] int IDENTITY(1,1) NOT NULL,
    [uaUserName] nvarchar(10)  NOT NULL,
    [uaLoginName] nvarchar(20)  NOT NULL,
    [uaPassword] nvarchar(20)  NOT NULL,
    [uaTelephone] nvarchar(20)  NULL,
    [uaRemark] nvarchar(250)  NULL,
    [uaDeleted] bit  NULL,
    [uaUpdatedBy] int  NOT NULL,
    [uaUpdatedDate] datetime  NOT NULL,
    [uaEnable] bit  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [oId] in table 'Outlay'
ALTER TABLE [dbo].[Outlay]
ADD CONSTRAINT [PK_Outlay]
    PRIMARY KEY CLUSTERED ([oId] ASC);
GO

-- Creating primary key on [olId] in table 'OutlayLine'
ALTER TABLE [dbo].[OutlayLine]
ADD CONSTRAINT [PK_OutlayLine]
    PRIMARY KEY CLUSTERED ([olId] ASC);
GO

-- Creating primary key on [piId] in table 'PayItem'
ALTER TABLE [dbo].[PayItem]
ADD CONSTRAINT [PK_PayItem]
    PRIMARY KEY CLUSTERED ([piId] ASC);
GO

-- Creating primary key on [uaId] in table 'UserAccount'
ALTER TABLE [dbo].[UserAccount]
ADD CONSTRAINT [PK_UserAccount]
    PRIMARY KEY CLUSTERED ([uaId] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------