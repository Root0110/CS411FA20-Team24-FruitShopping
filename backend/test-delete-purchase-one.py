import requests
import sys

argc = len(sys.argv)
if argc == 1:
    print("Expected Usage: PurchaseDate, EmailAccount, ProductID")

arg_list = [str(x) for x in sys.argv]
# print(arg_list[2])
url = 'http://localhost:3000/purchases_delete/'+arg_list[1]+'/'+arg_list[2]+'/'+arg_list[3]

x = requests.delete(url)

print("***************User Update Results******************")
print(url)
print(str(x.text))
print("****************Current Date User Purchase Left******************")

url = 'http://localhost:3000/purchases_date/'+arg_list[1]+'/'+arg_list[2]

x = requests.get(url)

print(str(x.text))
