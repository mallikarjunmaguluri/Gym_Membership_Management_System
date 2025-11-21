from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Member, Instructor, Membership, MembershipOptions     
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database config
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# IMPORTANT: initialize db with app
db.init_app(app)

@app.route("/")
def index():
    return "Backend running!"


# Hardcoded admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin"

@app.post("/admin/login")
def admin_login():
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "No data received"})

    username = data.get("username")
    password = data.get("password")

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        return jsonify({"success": True, "message": "Login success"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})


@app.route("/register-member", methods=["POST"])
def register_member():
    data = request.get_json()

    email = data["email"]
    phone = data["phone"]

    # Check duplicate email
    if Member.query.filter_by(email=email).first():
        return jsonify({"status": "duplicate_email"})

    # Check duplicate phone
    if Member.query.filter_by(phone=phone).first():
        return jsonify({"status": "duplicate_phone"})

    # Insert into DB
    new_member = Member(
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        age=data["age"],
        goal=data["goal"],
        password=data["password"],
        gender=data["gender"]
    )

    db.session.add(new_member)
    db.session.commit()

    return jsonify({"status": "success"})


@app.route('/member-login', methods=['POST'])
def member_login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    member = Member.query.filter_by(email=email, password=password).first()

    if member:
        return jsonify({"success": True, "message": "Login success"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
