"""
Email Notification Dispatcher for Matrix Innovations Backend.

Sends email notifications to administrators when new contact submissions arrive.
Uses standard library smtplib and email.message (no extra dependencies required).
Gracefully falls back if SMTP is unconfigured.
"""

import smtplib
import logging
from email.message import EmailMessage
from typing import Dict, Any

from app.config import get_settings

logger = logging.getLogger("matrix_backend.email")


def send_contact_email_to_admin(message_data: Dict[str, Any]) -> bool:
    """
    Sends an email alert to the admin with the contact submission details.
    Runs in a background task so it never slows down the user's HTTP response.
    """
    settings = get_settings()

    if not settings.SMTP_HOST or not settings.SMTP_USER:
        logger.debug("SMTP host/user not configured; skipping email dispatch to admin.")
        return False

    recipient = settings.ADMIN_NOTIFICATION_EMAIL or "info@matrixinnovations.in"
    name = message_data.get("name", "Website Visitor")
    sender_email = message_data.get("email", "Not provided")
    phone = message_data.get("phone") or "Not provided"
    subject = message_data.get("subject", "General Inquiry")
    user_msg = message_data.get("message", "")

    msg = EmailMessage()
    msg["Subject"] = f"[New Contact Inquiry] {subject} - {name}"
    msg["From"] = settings.SMTP_USER
    msg["To"] = recipient
    msg["Reply-To"] = sender_email

    body_text = f"""
New Contact Form Submission - Matrix Innovations
===================================================

Name: {name}
Email: {sender_email}
Phone: {phone}
Subject: {subject}

Message:
--------
{user_msg}

===================================================
Received from Matrix Innovations Website.
"""
    msg.set_content(body_text)

    body_html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #06B6D4; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">New Contact Inquiry Received</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Matrix Innovations Website</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 100px;">Name:</td>
                <td style="padding: 8px 0;">{name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:{sender_email}">{sender_email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;">{phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
                <td style="padding: 8px 0;">{subject}</td>
              </tr>
            </table>
            <div style="background-color: #f8fafc; border-left: 4px solid #06B6D4; padding: 14px 18px; border-radius: 4px;">
              <p style="margin: 0; font-weight: bold; color: #475569;">Message:</p>
              <p style="margin: 8px 0 0 0; white-space: pre-wrap;">{user_msg}</p>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
            Matrix Innovations Admin Notification System
          </div>
        </div>
      </body>
    </html>
    """
    msg.add_alternative(body_html, subtype="html")

    try:
        if settings.SMTP_PORT == 465:
            with smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
                if settings.SMTP_PASSWORD:
                    server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
        else:
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
                if settings.SMTP_USE_TLS:
                    server.starttls()
                if settings.SMTP_PASSWORD:
                    server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)

        logger.info("Admin email notification sent successfully to %s", recipient)
        return True
    except Exception as exc:
        logger.warning("Failed to send admin email notification via SMTP: %s", exc)
        return False
