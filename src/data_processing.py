# Needs uvicorn and fastapi are installs needed pymongo
class Processing:

#Generate tuple associating each observation with score:
	def cleanup(data):
		Totals = {}
		frequency = {}
		Max = 0
		Max_food = ""
		score = 1 #placeholder
		#Michael 3 days food
		#Foodid->observation
		#score = intensity

	#
		for observation in data:
	#line below assumes I figured out how to tie observation to scores
    		if score<7:
				for food in observation:
					if food in Totals:
						Totals[food]+=score
						frequency[food]+=1
					else:
						Totals[food]=score
						frequency[food]=1
		for elem in Totals:
			if (Totals[elem]/frequency[elem])> Max:
				Max_food = elem
				Max = Totals[elem]/frequency[elem]
		return(Max_food)

algostart = Processing()
algostart.cleanup(data=[])
#

