import sys
import time

Time = time.time()

file = open(sys.argv[1] + ".yaml", "a")

file.write(sys.argv[2])
file.close()

print("Done in: " + str(time.time() - Time))
