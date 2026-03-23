from paddleocr import PPStructureV3
import os

_layout = None


def get_layout():
    global _layout
    if _layout is None:
        _layout = PPStructureV3(
            enable_hpi=True, device=os.getenv("PADDLE_DEVICE", "cpu"))

    return _layout
