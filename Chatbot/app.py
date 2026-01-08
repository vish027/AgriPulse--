from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
import re

# ------------------------------------------------------------
# 🚜 AgriBot – Smart Agricultural Assistant
# ------------------------------------------------------------

app = Flask(__name__)

# ------------------------------------------------------------
# 🔐 Configure Gemini API Key (RECOMMENDED: use .env)
# ------------------------------------------------------------
# If you want quick testing, you can temporarily hardcode,
# but DO NOT push API keys to GitHub.

# Option 1 (Recommended)
# from dotenv import load_dotenv
# load_dotenv()
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Option 2 (Temporary – for local testing only)
genai.configure(api_key="AIzaSyDDpBYzc4l09wK3tRZ1ovRPX1XVSjlyZvs")

# ------------------------------------------------------------
# 🤖 Gemini Model
# ------------------------------------------------------------
model = genai.GenerativeModel("gemini-2.5-flash")

# ------------------------------------------------------------
# 🏠 Home Route
# ------------------------------------------------------------
@app.route("/")
def home():
    return render_template("index.html")

# ------------------------------------------------------------
# 💬 Chat API Route
# ------------------------------------------------------------
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "").strip()

    # Default welcome message
    if not user_input:
        return jsonify({
            "reply": (
                "Hello! I can suggest crop rotations.<br>"
                "• What should I grow after rice?<br>"
                "• Best soil for wheat<br>"
                "• Which crops can I grow in kharif season?"
            )
        })

    try:
        # Instruction for crisp answers
        system_instruction = (
            "You are AgriBot, an agricultural assistant chatbot. "
            "Answer in short, clear bullet points using •. "
            "Each point must be on a new line. "
            "Maximum 5 points. Keep sentences short."
        )

        prompt = f"{system_instruction}\n\nUser: {user_input}\nAgriBot:"

        response = model.generate_content(prompt)

        bot_reply = response.text.strip() if response.text else "⚠️ No response generated."

        # Format for HTML
        formatted_reply = re.sub(r"\n+", "<br>", bot_reply)

        if not formatted_reply.startswith("•"):
            formatted_reply = "• " + formatted_reply

        return jsonify({
            "reply": formatted_reply
        })

    except Exception as e:
        return jsonify({
            "reply": f"⚠️ Error: {str(e)}"
        })

# ------------------------------------------------------------
# 🚀 Run Server
# ------------------------------------------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
