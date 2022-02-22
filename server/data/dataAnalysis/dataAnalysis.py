from cmath import nan
import csv

data_header_names = []
fakeData = [] ##everything
ground_truth = set() ##snippets

with open('server\\data\\dataAnalysis\\testData.csv', newline='', encoding='utf8') as csvFile:
    csvReader = csv.DictReader(csvFile, delimiter = ',', quotechar='"')
    data_header_names = csvReader.fieldnames

    for row in csvReader:
        fakeData.append(row)

print("fakeData: ")
print(fakeData[0])



with open('server\\data\\dataFormatting\\bm25_cut_10_score_descr_EXTENDED.csv', newline='', encoding='utf8') as csvFile:
    csvReader = csv.DictReader(csvFile, delimiter = ',', quotechar='"')

    for row in csvReader:
        if row["new_snippet_id"] != 'nan':
            ground_truth.add((row["new_snippet_id"], row["score_descr_mapped10"]))
print()
print("Ground truth: ")
print(ground_truth)
print("\nlength: ")
print(len(ground_truth))

