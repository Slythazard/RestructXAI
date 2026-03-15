from paddleocr import PPStructureV3

layout = PPStructureV3()


def parseLayout():

    result = layout.predict(
        '/home/Slythazard/Documents/RestructXAI/services/vision-engine/data/ShreshthKatyayan_1001InternshipCompletionLetter_09-12-2025.pdf')

    for res in result:
        res.save_to_img(
            '/home/Slythazard/Documents/RestructXAI/services/vision-engine/data/output')
        res.save_to_json(
            '/home/Slythazard/Documents/RestructXAI/services/vision-engine/data/output')
