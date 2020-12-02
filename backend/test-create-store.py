import requests
import sys

argc = len(sys.argv)
if argc == 1:
    print("Expected Usage: StoreID, StoreName , StoreLocation ")

arg_list = [str(x) for x in sys.argv]
print(arg_list[2])
url = 'http://localhost:3000/stores'
myobj = {'StoreID': arg_list[1], 'StoreName':arg_list[2], 'StoreLocation':arg_list[3]}

x = requests.post(url, data = myobj)

print("***************Store Create Results******************")
print(str(x.text))
print("****************Current Store Table******************")

url = 'http://localhost:3000/stores'

x = requests.get(url)

print(str(x.text))
