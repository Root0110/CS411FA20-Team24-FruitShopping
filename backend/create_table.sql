//tutorial
CREATE TABLE IF NOT EXISTS `users` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

//design

CREATE TABLE Users
(EmailAccount CHAR(255) NOT NULL,
Username CHAR(50) UNIQUE,
Password CHAR(50),
PRIMARY KEY(EmailAccount)) DEFAULT CHARSET=utf8;

//Create Stores table:
CREATE TABLE  Stores
(StoreID CHAR(50) NOT NULL,
StoreName CHAR(50),
StoreLocation CHAR(50),
PRIMARY KEY(StoreID))DEFAULT CHARSET=utf8;

//Create Products table:
CREATE TABLE  Products
(ProductID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 ProductName CHAR(50),
 StoreID VARCHAR(255),
 Unit Char(10),
 UnitPrice REAL,
 Availability BOOL,
 FOREIGN KEY (StoreID) REFERENCES Stores(StoreID) ON UPDATE CASCADE)DEFAULT CHARSET=utf8;


//Create Purchase table:
CREATE TABLE Purchases
(PurchaseDate Date NOT NULL,
 EmailAccount VARCHAR(255) NOT NULL,
 ProductID INT NOT NULL,
 StoreID VARCHAR(255),
 Quantity FLOAT,
 PRIMARY KEY (PurchaseDate,EmailAccount,ProductID),
 FOREIGN KEY (EmailAccount) REFERENCES Users(EmailAccount) ON UPDATE CASCADE,
 FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON UPDATE CASCADE,
 FOREIGN KEY (StoreID) REFERENCES Stores(StoreID) ON UPDATE CASCADE
)DEFAULT CHARSET=utf8;

//Create SoldIN table:
CREATE TABLE SoldIN
(ProductID CHAR(50),
 StoreID CHAR(50),
PRIMARY KEY(ProductID, StoreID),
FOREIGN KEY (ProductID) REFERENCES Products,
ON UPDATE CASCADE,
FOREIGN KEY (StoreID) REFERENCES Stores,
ON UPDATE CASCADE);
