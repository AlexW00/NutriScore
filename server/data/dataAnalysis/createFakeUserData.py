from cmath import log
import csv
import csv
import random
import uuid

header_names = []

with open('server\\data\\dataFormatting\\Study-Result-CSV-Header.txt', newline='', encoding='utf8') as csvFile:
    csvReader = csv.DictReader(csvFile, delimiter = ',', quotechar='"')
    header_names = csvReader.fieldnames


def createRandom(bound):
    return random.randint(0, bound)



def createRow():
    newUUID = str(uuid.uuid4())#random uuid
    row_vals = dict()
    row_vals[header_names[0]] = newUUID
    for i in range(len(header_names)):
        if i > 0:
            if i == 1:
                row_vals[header_names[1]] = createRandom(1)
            if i > 1:
                row_vals[header_names[i]] = createRandom(10)
    textAnswers = ["postTsk_DEMOGRAPHIC_JOB","postTsk_CREDISCORE_CATEGORIES_NOT_ENOUGH_BECAUSE", "postTsk_CREDISCORE_CATEGORY_NOT_GOOD", "postTsk_CREDISCORE_COLOR_NOT_HELPFUL"]
    row_vals["postTsk_DEMOGRAPHIC_GENDER"] = createRandom(2)
    row_vals["postTsk_DEMOGRAPHIC_AGE"] = createRandom(99)
    for textName in textAnswers:
        row_vals[textName] = "debug_text"
    yesNoAnswers = ["postTsk_CREDISCORE_IS_CATEGORIES_ENOUGH","postTsk_CREDISCORE_IS_CATEGORY_GOOD","postTsk_CREDISCORE_IS_COLOR_HELPFUL"]
    for yesNo in yesNoAnswers:
        row_vals[yesNo] = createRandom(1)
    return row_vals
            



with open('server\\data\\dataAnalysis\\testData.csv', 'w', newline='\n', encoding='utf8') as testCSV:
    writer = csv.DictWriter(testCSV, fieldnames=header_names, delimiter = ',', quotechar='"')
    writer.writeheader()

    for i in range(55):
        writer.writerow(createRow())