def find_it(seq):
    for z in seq:
        x = seq.count(z)
        if(x%2==1): return z