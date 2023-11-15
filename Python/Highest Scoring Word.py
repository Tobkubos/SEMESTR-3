
def high(x):
    x = x.lower()
    words = x.split()
    suma = []
    
    for j in words:
        z = 0
        for i in range(0, len(j)):
            z += ord(j[i]) - 96
        suma.append(z)
    
    max_index = max(enumerate(suma), key=lambda x: x[1])[0]
    return words[max_index]

def high(x):
    return max(x.split(), key=lambda k: sum(ord(c) - 96 for c in k))