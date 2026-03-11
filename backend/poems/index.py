import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = "t_p79443517_creative_poetry_plat"

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """API для управления стихотворениями: получение, создание, обновление, удаление."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    poem_id = params.get("id")

    # GET — список или одно стихотворение
    if method == "GET":
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        if poem_id:
            cur.execute(f"SELECT * FROM {SCHEMA}.poems WHERE id = %s", (poem_id,))
            row = cur.fetchone()
            conn.close()
            if not row:
                return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}
            return {"statusCode": 200, "headers": cors, "body": json.dumps(dict(row), default=str)}
        else:
            cur.execute(f"SELECT * FROM {SCHEMA}.poems ORDER BY created_at DESC")
            rows = cur.fetchall()
            conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps([dict(r) for r in rows], default=str)}

    # POST — создать
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        title = body.get("title", "").strip()
        text = body.get("text", "").strip()
        if not title or not text:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "title и text обязательны"})}
        excerpt = body.get("excerpt", text[:80] + "...").strip()
        category = body.get("category", "Лирика").strip()
        year = body.get("year", "2024").strip()
        has_audio = bool(body.get("has_audio", False))
        has_video = bool(body.get("has_video", False))
        audio_url = body.get("audio_url", "")
        video_url = body.get("video_url", "")
        image_url = body.get("image_url", "")
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            f"""INSERT INTO {SCHEMA}.poems (title, text, excerpt, category, year, has_audio, has_video, audio_url, video_url, image_url)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *""",
            (title, text, excerpt, category, year, has_audio, has_video, audio_url, video_url, image_url),
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()
        return {"statusCode": 201, "headers": cors, "body": json.dumps(dict(row), default=str)}

    # PUT — обновить
    if method == "PUT":
        if not poem_id:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "id обязателен"})}
        body = json.loads(event.get("body") or "{}")
        fields = []
        values = []
        for key in ["title", "text", "excerpt", "category", "year", "has_audio", "has_video", "audio_url", "video_url", "image_url"]:
            if key in body:
                fields.append(f"{key} = %s")
                values.append(body[key])
        if not fields:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Нет полей для обновления"})}
        values.append(poem_id)
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            f"UPDATE {SCHEMA}.poems SET {', '.join(fields)}, updated_at = NOW() WHERE id = %s RETURNING *",
            values,
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()
        if not row:
            return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}
        return {"statusCode": 200, "headers": cors, "body": json.dumps(dict(row), default=str)}

    # DELETE — удалить
    if method == "DELETE":
        if not poem_id:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "id обязателен"})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {SCHEMA}.poems WHERE id = %s", (poem_id,))
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}
