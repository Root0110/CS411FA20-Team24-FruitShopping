import requests
import sys

argc = len(sys.argv)
if argc == 1:
    print("Expected Usage: targetEmailAccount, targetDate, targetProductID ")

arg_list = [unicode(str(x), "utf-8") for x in sys.argv]
# print(arg_list[2])
url = 'http://localhost:3000/review_delete/'+arg_list[1]+'/'+arg_list[2]+'/'+arg_list[3]
# myobj = {'EmailAccount': arg_list[1], 'Username':arg_list[2], 'Password':arg_list[3]}

print(url)
x = requests.delete(url)

print("***************User Delete Results******************")
print(str(x.text))
