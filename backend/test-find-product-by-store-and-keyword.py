import requests
import sys

argc = len(sys.argv)
if argc == 1:
    print("Expected Usage: targetStore targetKeyword")

arg_list = [str(x) for x in sys.argv]

url = 'http://localhost:3000/products_store_keyword/'+arg_list[1]+'/'+arg_list[2]

x = requests.get(url)

print("***************User Create Results******************")
print(url)
print(str(x.text))
print("****************Current User Table******************")

url = 'http://localhost:3000/products'

x = requests.get(url)
print(url)
print(str(x.text))

# url = 'http://localhost:3000/customers/zzhu31@illinois.edu'
# myobj = {'email': 'random@illinois.edu', 'name':'random', 'active':0}
# x = requests.put(url, data=myobj)
#
# print("update results:",x.text)
# print(type(x.text))
