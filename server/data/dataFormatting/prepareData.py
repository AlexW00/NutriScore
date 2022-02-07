print("test")
import csv
import math
from operator import delitem

## https://docs.python.org/3/library/csv.html Abgerufen am 07.02.22
# with open('server\\data\\dataFormatting\\bm25_cut_10_score_descr.txt_snippets', newline='', encoding='utf8') as csvFile:
#     csvReader = csv.reader(csvFile, delimiter = ' ', quotechar='"')
#     for row in csvReader:
#         print(row)

score_descr = []

##get the credibility-scores from the data
with open('server\\data\\dataFormatting\\bm25_cut_10_score_descr.txt_snippets', newline='', encoding='utf8') as csvFile:
    csvReader = csv.DictReader(csvFile, delimiter = ' ', quotechar='"')
    for row in csvReader:
        score_descr.append(row['score_descr'])

# print(score_descr)


## generate percentage from the values
for i in range(len(score_descr)):
    score_descr[i] = math.exp(float(score_descr[i]))

# print(score_descr)


## 0 = lowest credibility, 1 = highest credibility
## map percentage value to likertscale -> value 0-10 (10 included)
score_descr_mapped10 = []

for i in range(len(score_descr)):
    score_descr_mapped10.append(round(10 * score_descr[i]))

# print(score_descr_mapped10)



##map the original percentage value to a 5 scale value -> to map to CrediScore values
## 5 = A, 0 = E
score_descr_mapped_5 = []
for i in range(len(score_descr)):
    score_descr_mapped_5.append(round(5 * score_descr[i]))

# print(score_descr_mapped_5)

mapping = ['E','D','C','B','A']
for i in range(len(score_descr_mapped_5)):
    score_descr_mapped_5[i] = mapping[score_descr_mapped_5[i]-1]

# print(score_descr_mapped_5)






#https://im-coder.com/wie-fuege-ich-eine-neue-spalte-zu-einer-csv-datei-hinzu.html
# with open('server\\data\\dataFormatting\\bm25_cut_10_score_descr.txt_snippets', 'r', newline='', encoding='utf8') as csvinput:
#     with open('server\\data\\dataFormatting\\bm25_cut_10_score_descr.txt_snippets', newline='', encoding='utf8') as csvoutput:
#         writer = csv.writer(csvoutput, lineterminator='\n')
#         reader = csv.reader(csvinput)

#         all = []
#         row = next(reader)
#         row.append('Berry')
#         all.append(row)

#         for row in reader:
#             row.append(row[0])
#             all.append(row)

#         writer.writerows(all)


fileRows = []
with open('server\\data\\dataFormatting\\bm25_cut_10_score_descr.txt_snippets', newline='', encoding='utf8') as csvFile:
    csvReader = csv.DictReader(csvFile, delimiter = ' ', quotechar='"')

    for row in csvReader:
        fileRows.append(row)




for i in range(len(fileRows)):
    row = fileRows[i]
    row['score_descr_mapped10'] = score_descr_mapped10[i]
    row['score_descr_mapped_5'] = score_descr_mapped_5[i]
        

# print(fileRows)

## NOW: write new File

with open('server\\data\\dataFormatting\\bm25_cut_10_score_descr_EXTENDED.csv', 'w', newline='\n', encoding='utf8') as csvfile:
    fieldnames = ["topic", "docId", "score", "snippets", "score_descr", 'score_descr_mapped10', 'score_descr_mapped_5']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, delimiter = ' ', quotechar='"')

    writer.writeheader()
    for row in fileRows:
        writer.writerow(row)