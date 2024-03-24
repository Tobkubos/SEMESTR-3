import random

#zad.1_A - random
for i in range(1, 21):
    
    print(i, ": ", random.random())
    
#zad.1_B - divided by 5 and 7
for i in range(0, 200):
    if i%5 == 0 and i%7 == 0:
        print(i)
        
        
#zad.2 - lambda 
# lambda to krótka funkcja anonimowa.
# Może przyjmować dowolną liczbę argumentów, ale może mieć tylko jedno wyrażenie.
# deklaracja: 
x = lambda a, b : (a + 10)*b
print("LAMBDA : ",x(5,2), "\n")  #a = 5
                                 #b = 2 
                                 #x = 30
print("LAMBDA 2 : ", (lambda a, b : a*b)(2,3))
                           
#zad.3 - filtering
rnd_List = []
even_List = []
odd_List = []
for i in range(0, 100):
    rnd_List.append(int(random.random()*1000))

even_List.extend(filter(lambda x: x % 2 == 0, rnd_List))
odd_List.extend(filter(lambda x: x % 2 == 1, rnd_List))

print(rnd_List, "\n") 
print(even_List, "\n") 
print(odd_List, "\n") 



    