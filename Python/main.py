import numpy

# zadanie 1
def dictionaryGenerator():
    dictionary = {}
    for i in range(16):
        dictionary[i] = i**2
    return dictionary


my_dictionary = dictionaryGenerator()
print(my_dictionary)


#macierze
m = 3
n = 3
zeros_array = numpy.zeros((m,n)) #macierz zerowa

# dodaj do każdej komórki liczbę 100
addToCell = lambda i: i+10
MatrixResult = numpy.vectorize(addToCell)


# dodawanie do danej komórki
zeros_array[1,1] +=20
zeros_array[2,2] +=8

print(MatrixResult(zeros_array)) # wyswietl macierz po dodaniu 20 do [1,1]

# diagonalna
diag_array = numpy.diag(MatrixResult(zeros_array))
print(diag_array)


array = [28,52,33,29,31]
print(min(array))
print(numpy.mean(array))

maxHalf = max(array)/2

# sprawdz czy wszystkie liczby są większe od połowy wartości największej z nich
print(all(i > maxHalf for i in array))



