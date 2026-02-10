from flask import Blueprint, request, jsonify
import uuid
import os

ingestion = Blueprint("ingestion", __name__)

UPLOAD_BASE = "/tmp/uploads"


@ingestion.route("/", methods=["POST"])
def ingest_documents():
    job_id = str(uuid.uuid4())

    if "files" not in request.files:
        return jsonify({"error": "No files uploaded"}), 400

    files = request.files.getlist("files")

    job_dir = os.path.join(UPLOAD_BASE, job_id)
    os.makedirs(job_dir, exist_ok=True)

    saved_files = []
    for f in files:
        path = os.path.join(job_dir, f.filename)
        f.save(path)
        saved_files.append(path)

    return jsonify({
        "job_id": job_id,
        "status": "QUEUED"
    }), 202
