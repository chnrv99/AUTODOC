# we are trying to read a docx and get the variables.

import docx

doc = docx.Document("C:/Users/nisha/OneDrive/Desktop/Node_Python-master/new_template.docx")

all_paras = doc.paragraphs
print(len(all_paras))
# for para in all_paras:
    # print(para.text)
    # print("-----------------")


variables = []

for para in all_paras:
    str=''
    for j in range(0,len(para.text)):
        para2=para.text
        
        if para2[j] == "{":
            # print(para2[j+1:j+5])
            # str+=para2[j]
            j+=1

            while para2[j]!='}':
                str+=para2[j]
                j+=1

        # elif para2[j]=="}":
        #     pass
    print(str)
    if str!='':
        variables.append(str)
print(variables)
    