import requests
import sys

argc = len(sys.argv)
if argc == 1:
    print("Expected Usage: PurchaseDate, EmailAccount, ProductID, Quantity, StoreID ")

arg_list = [str(x) for x in sys.argv]
# print(arg_list[2])
url = 'http://localhost:3000/purchases_update/'
myobj = {'PurchaseDate': arg_list[1], 'EmailAccount':arg_list[2], 'ProductID':arg_list[3], 'Quantity':arg_list[4], 'StoreID':arg_list[5]}

x = requests.put(url, data=myobj)

print("***************User Update Results******************")
print(url)
print(str(x.text))
# print("****************Current User Table******************")
#
# url = 'http://localhost:3000/customers'
#
# x = requests.get(url)
#
# print(str(x.text))
