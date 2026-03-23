import tempfile
from ..schemas import Node, Edge, Document, Page
import os


def process_pdf(file_bytes: bytes):
    with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name

    return tmp_path


def flatten(file):
    root, extension = os.path.splitext(file[0]["input_path"])
    doc = Document(
        doc_id=f"{file[0]["input_path"]}",
        metadata={"source": f"{extension}"},
        pages=[]
    )
    pass
