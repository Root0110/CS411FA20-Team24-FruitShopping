import requests
import sys

argc = len(sys.argv)
if argc == 1:
    print("Expected Usage: targetEmailAccount")

arg_list = [str(x) for x in sys.argv]
# print(arg_list[2])
url = 'http://localhost:3000/customers/'+arg_list[1]
# myobj = {'targetEmailAccount': arg_list[1]}

x = requests.get(url)
#x = requests.get('http://localhost:3000/customers/qingwen@illinois.edu')

print("***************User Find Results******************")
print(str(x.text))
print("****************Current User Table******************")

url = 'http://localhost:3000/customers'

x = requests.get(url)

print(str(x.text))
