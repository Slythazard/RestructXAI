from paddleocr import PaddleOCR

ocr = PaddleOCR()


def main():
    result = ocr.predict(
        "/home/Slythazard/Documents/RestructXAI/services/vision-engine/data/ShreshthKatyayan_1001InternshipCompletionLetter_09-12-2025.pdf")

    for res in result:
        res.print()
        res.save_to_img("output")
        res.save_to_json("output")
