# return masked string
def maskify(cc):
    if len(cc)>4:
        masked = "#" * (len(cc)-4) + cc[-4:]
    else: masked = cc
    return masked
