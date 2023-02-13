from typing import Set


mod = 2**25  # highest 2^k less than 19^6
a = 95929  # prime multiplier mod 4 == 1
c = 17  # prime adder mod 2 == 1
char_set = "43GHJKLMNPQRSTVWXYZ"


def getCode(prev):
    nxt = (a * prev + c) % mod
    temp = nxt
    output = ""
    for i in range(6):
        index = temp % 19
        output += char_set[index]
        temp = temp // 19

    return nxt, output


test_set = set()
prev = 1
iterations = mod
for i in range(iterations):
    prev, out = getCode(prev)
    # print(out)
    test_set.add(out)

print(f"Duplicates after {iterations} iterations: {iterations - len(test_set)}")
