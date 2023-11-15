import math
def cakes(recipe, available):

    result = []
    for y in recipe.keys():
        if y in available.keys() and available[y] >= recipe[y]:
            result.append(math.floor(available[y]/recipe[y]))
        else:
            return 0
    return(min(result))
            