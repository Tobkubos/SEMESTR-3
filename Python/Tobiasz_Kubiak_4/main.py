#1.Napisz funkcję zamieniającą liczbę całkowitą na liczbę zapisaną za pomocą cyfr rzymskich
import roman

def task1():
    number = int(input("Give number: "))
    if number <= 3999:
        print(roman.toRoman(number))
    else:
        print("too big number")

task1()

#2.Napisz funkcję, która dla podanych liczb da odpowiedź o ich monotoniczności (rosnące, malejące, inne)
def task2():
    numbers = [12,11,10,9,8,7]
    high = 0
    low = 0

    for x in range(0, len(numbers)-1):
        if numbers[x] > numbers[x+1]:
            low += 1
        elif numbers[x] < numbers[x+1]:
            high += 1

    if high == len(numbers)-1: print("rosnaca")
    elif low == len(numbers)-1: print("malejaca")
    else: print("other")

task2()

#3.Wylicz XOR w postaci binarnej dla podanych w systemie dziesiętnym liczb
number1 = 3
number2 = 4
xor = number1 ^ number2
print(bin(xor))


#4.Dla podanej listy zawierającej liczby stwórz funkcję podającą posortowaną według sumy cyfr ich listę
listOfNumbers = [123, 45, 999, 67, 890]

def suma(liczba):
    return sum(int(cyfra) for cyfra in str(liczba))

def sortBySum(lista):
    return sorted(lista, key=suma)

sortedList = sortBySum(listOfNumbers)

print('Lista przed posortowaniem:', listOfNumbers)
print('Posortowana lista według sumy cyfr:', sortedList)
