import pandas as pd
import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.preprocessing import MinMaxScaler

filename = 'imie_liczba.csv'
IRISdata = 'IRISdata.csv'

def Histogram(filename):

    data = pd.read_csv(filename, names=['Imie','Plec','Liczba'])
    data_grouped = data.groupby('Imie')['Liczba'].sum().reset_index()

    plt.bar(data_grouped['Imie'], data_grouped['Liczba'])
    plt.xlabel('Imie')
    plt.ylabel('Liczba osob')
    plt.xticks(rotation=70, ha='right')
    plt.tight_layout()

    plt.show()

Histogram(filename)

# HISTOGRAM - 
# Histogram danych to rodzaj wykresu, który przedstawia rozkład częstości 
# występowania danych w określonych przedziałach. 
# Jest to przydatne narzędzie do wizualizacji rozkładu danych numerycznych i 
# umożliwia szybkie zrozumienie charakterystyki zbioru danych.

def IRIS():
    #a & b
    dataframe = pd.read_csv(IRISdata)
    print(dataframe)
    
    #c
    print("available columns", dataframe.columns)
    selected_column = input("Select column: ")
    
    if selected_column in dataframe.columns:
        selected_column_data = dataframe[selected_column]
        print("data from ", selected_column)
        print(selected_column_data)
    
    #d 
    selected_data = dataframe[dataframe['petal_length'] > 2]
    print(selected_data)
    
    #e
    maxValue = dataframe.max()
    print("max value: \n",maxValue)
    
    #f 
    new_min = float(input("give new min: "))
    new_max = float(input("give new max: "))

    scaler = MinMaxScaler(feature_range=(new_min, new_max))

    dataframe[selected_column] = scaler.fit_transform(dataframe[[selected_column]])

    print("Scaled data:")
    print(dataframe[selected_column])

    
IRIS()


