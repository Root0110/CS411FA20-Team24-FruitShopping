import requests
import sys

argc = len(sys.argv)
if argc == 1:
    print("Expected Usage: userAccount, productID , productDetails ,purchaseDate")

arg_list = [str(x) for x in sys.argv]
print(arg_list[2])
url = 'http://studytonight.web.illinois.edu/review_new'
myobj = {'userAccount': arg_list[1], 'productID':arg_list[2], 'productDetails':arg_list[3], "purchaseDate": arg_list[4]}

x = requests.post(url, data = myobj)

print("***************Store Create Results******************")
print(str(x.text))
# print("****************Current Store Table******************")
#
# url = 'http://localhost:3000/stores'
#
# x = requests.get(url)
#
# print(str(x.text))
