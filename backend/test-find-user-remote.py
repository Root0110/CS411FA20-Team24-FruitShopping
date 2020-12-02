import requests
import sys

argc = len(sys.argv)
if argc == 1:
    print("Expected Usage: targetEmailAccount")

base_url = "http://studytonight.web.illinois.edu"

arg_list = [str(x) for x in sys.argv]
# print(arg_list[2])
url = base_url+'/customers_email/'+arg_list[1]
# myobj = {'targetEmailAccount': arg_list[1]}

x = requests.get(url)

print("***************User Find Results******************")
print(str(x.text))
# print(str(x.headers))
print("****************Current User Table******************")

url = base_url+'/customers_all'

x = requests.get(url)

print(str(x.text))
