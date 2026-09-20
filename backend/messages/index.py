import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr

import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = "t_p79443517_creative_poetry_plat"
OWNER_EMAIL = "hristianskiestihotvoreniya@yandex.ru"


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def esc(value: str) -> str:
    return str(value).replace("'", "''")


def send_mail(name: str, email: str, message: str) -> bool:
    password = os.environ.get("YANDEX_MAIL_PASSWORD")
    if not password:
        return False

    body = (
        "Новое сообщение с сайта «Христианские стихотворения»\n\n"
        f"Имя: {name or 'не указано'}\n"
        f"Обратная почта: {email or 'не указана'}\n\n"
        "Сообщение:\n"
        f"{message}\n"
    )

    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = Header("Сообщение с сайта — " + (name or "без имени"), "utf-8")
    msg["From"] = formataddr((str(Header("Сайт стихотворений", "utf-8")), OWNER_EMAIL))
    msg["To"] = OWNER_EMAIL
    if email and "@" in email:
        msg["Reply-To"] = email

    server = smtplib.SMTP_SSL("smtp.yandex.ru", 465, timeout=12)
    server.login(OWNER_EMAIL, password)
    server.sendmail(OWNER_EMAIL, [OWNER_EMAIL], msg.as_string())
    server.quit()
    return True


def handler(event: dict, context) -> dict:
    """Приём сообщений с формы обратной связи: сохранение в базу и отправка письма владельцу сайта."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            f"SELECT id, name, email, message, is_read, "
            f"to_char(created_at, 'DD.MM.YYYY HH24:MI') AS created_at "
            f"FROM {SCHEMA}.messages ORDER BY created_at DESC LIMIT 200"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return {
            "statusCode": 200,
            "headers": {**cors, "Content-Type": "application/json"},
            "body": json.dumps([dict(r) for r in rows], ensure_ascii=False),
        }

    if method == "DELETE":
        params = event.get("queryStringParameters") or {}
        msg_id = str(params.get("id", "")).strip()
        if not msg_id.isdigit():
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "bad id"})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {SCHEMA}.messages WHERE id = {int(msg_id)}")
        conn.commit()
        cur.close()
        conn.close()
        return {
            "statusCode": 200,
            "headers": {**cors, "Content-Type": "application/json"},
            "body": json.dumps({"ok": True}),
        }

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = str(body.get("name", "")).strip()[:200]
        email = str(body.get("email", "")).strip()[:200]
        message = str(body.get("message", "")).strip()[:5000]

        if not message:
            return {
                "statusCode": 400,
                "headers": {**cors, "Content-Type": "application/json"},
                "body": json.dumps({"error": "Напишите сообщение"}, ensure_ascii=False),
            }

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.messages (name, email, message) "
            f"VALUES ('{esc(name)}', '{esc(email)}', '{esc(message)}')"
        )
        conn.commit()
        cur.close()
        conn.close()

        mailed = False
        try:
            mailed = send_mail(name, email, message)
        except Exception:
            mailed = False

        return {
            "statusCode": 200,
            "headers": {**cors, "Content-Type": "application/json"},
            "body": json.dumps({"ok": True, "mailed": mailed}, ensure_ascii=False),
        }

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "method not allowed"})}
