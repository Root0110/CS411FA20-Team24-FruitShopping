import requests
import sys

argc = len(sys.argv)
if argc == 1:
    print("Expected Usage: EmailAccount, Username, Password ")

arg_list = [str(x) for x in sys.argv]
# print(arg_list[2])
url = 'http://localhost:3000/customers/'+arg_list[1]
# myobj = {'EmailAccount': arg_list[1], 'Username':arg_list[2], 'Password':arg_list[3]}

x = requests.delete(url)

print("***************User Delete Results******************")
print(str(x.text))
print("****************Current User Table******************")

url = 'http://localhost:3000/customers'

x = requests.get(url)

print(str(x.text))
