import math
def get_middle(s):
    if len(s)%2 == 0:
        result = s[len(s)//2-1] + s[(len(s)//2)]
    if len(s)%2 == 1:
        result = s[len(s)//2]           
    return result 