--find by id
select * from Products where ProductID = targetProductId;

--find by name
select * from Products natural join Stores where ProductName like '%targetkeyword%';

--find by StoreID
select * from Products where StoreID = targetStoreID;

--find by StoreID & ProductID
select * from Products natural join Stores where StoreID = targetStoreID and ProductID = targetProductId;

--find by StoreName & ProductName
select * from Products natural join Stores where StoreName = like '%targetStoreKeyword%'
  and ProductName like '%targetkeyword%';

--search by date and user
select * from Purchases natural join Products natural join Stores
where Date = targeDate and EmailAccount = targetEmail

--create multiple row
INSERT INTO Purchases SET ..........

--create one affectedRows

--update one row

--delete one row
