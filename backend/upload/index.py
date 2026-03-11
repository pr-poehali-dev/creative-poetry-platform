import json
import os
import base64
import boto3
import uuid
import mimetypes

def handler(event: dict, context) -> dict:
    """Загрузка медиафайла (аудио, видео, картинка) в S3 и возврат CDN-ссылки."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    file_data = body.get("file")       # base64-строка
    file_name = body.get("name", "file")
    file_type = body.get("type", "")   # MIME-тип

    if not file_data:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "file обязателен"})}

    # Декодируем base64
    if "," in file_data:
        file_data = file_data.split(",", 1)[1]
    raw = base64.b64decode(file_data)

    # Определяем расширение
    ext = ""
    if file_type:
        ext = mimetypes.guess_extension(file_type) or ""
        if ext == ".jpe":
            ext = ".jpg"
    if not ext and "." in file_name:
        ext = "." + file_name.rsplit(".", 1)[-1].lower()

    # Папка по типу
    if file_type.startswith("image/"):
        folder = "poems/images"
    elif file_type.startswith("audio/"):
        folder = "poems/audio"
    elif file_type.startswith("video/"):
        folder = "poems/video"
    else:
        folder = "poems/other"

    key = f"{folder}/{uuid.uuid4().hex}{ext}"

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
    s3.put_object(Bucket="files", Key=key, Body=raw, ContentType=file_type or "application/octet-stream")

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"url": cdn_url, "key": key}),
    }
