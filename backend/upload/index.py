import json
import os
import base64
import boto3
import uuid
import mimetypes
import io


def make_thumb(raw: bytes) -> bytes:
    from PIL import Image

    im = Image.open(io.BytesIO(raw)).convert("RGB")
    w, h = im.size
    side = min(w, h)
    im = im.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
    im = im.resize((320, 320), Image.LANCZOS)
    out = io.BytesIO()
    im.save(out, "WEBP", quality=82, method=6)
    return out.getvalue()


def handler(event: dict, context) -> dict:
    """Загрузка медиафайла (аудио, видео, картинка) в S3 и возврат CDN-ссылки. Для картинок дополнительно создаётся лёгкое превью."""
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

    base = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket"
    cdn_url = f"{base}/{key}"

    thumb_url = ""
    if file_type.startswith("image/"):
        try:
            thumb = make_thumb(raw)
            thumb_key = f"poems/thumbs/{key.rsplit('/', 1)[-1].rsplit('.', 1)[0]}.webp"
            s3.put_object(Bucket="files", Key=thumb_key, Body=thumb, ContentType="image/webp")
            thumb_url = f"{base}/{thumb_key}"
        except Exception:
            thumb_url = ""

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"url": cdn_url, "key": key, "thumb_url": thumb_url}),
    }