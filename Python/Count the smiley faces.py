
def count_smileys(arr):
    result = 0
    for x in arr:
        if (';' in x or ':' in x) and (')' in x or 'D' in x) and ('~' in x or '-' in x) and len(x)==3: result+=1
        if (';' in x or ':' in x) and (')' in x or 'D' in x) and len(x)==2: result+=1
    return result 

from re import findall
def count_smileys(arr):
    return len(list(findall(r"[:;][-~]?[)D]", " ".join(arr))))