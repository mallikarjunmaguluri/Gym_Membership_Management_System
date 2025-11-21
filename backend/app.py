from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Member, Instructor, Membership, MembershipOptions   
import os
from datetime import date, timedelta
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
    



@app.route("/memberships/options/add", methods=["POST"])
def add_membership_option():
    data = request.get_json()

    try:
        new_option = MembershipOptions(
            title=data.get("title"),
            price=data.get("price"),
            validity_in_days=data.get("validity_in_days")
        )

        db.session.add(new_option)
        db.session.commit()

        return jsonify({"message": "Membership option added successfullyr"}), 201

    except Exception as e:
        db.session.rollback()
        print("DB Error:", e)
        return jsonify({"error": "Failed to add membership option"}), 500


@app.route("/memberships/options", methods=["GET"])
def get_membership_options():
    options = MembershipOptions.query.all()
    result = [{
        "membershipOption_id": opt.membershipOption_id,
        "title": opt.title,
        "price": float(opt.price),
        "validity_in_days": opt.validity_in_days
    } for opt in options]

    return jsonify(result)



@app.route("/add-instructor", methods=["POST"])
def add_instructor():
    data = request.get_json()
    
    email = data["email"]
    phone = data["phone"]

    # Check duplicate email
    if Instructor.query.filter_by(email=email).first():
        return jsonify({"status": "duplicate_email"})

    # Check duplicate phone
    if Instructor.query.filter_by(phone=phone).first():
        return jsonify({"status": "duplicate_phone"})

    # Insert into DB
    new_instructor = Instructor(
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        experience=data["experience"],
        about=data["about"]
    )

    db.session.add(new_instructor)
    db.session.commit()

    return jsonify({"status": "success"})

@app.route("/instructors", methods=["GET"])
def get_instructors():
    instructors = Instructor.query.all()
    result = [{
        "instructor_id": inst.instructor_id,
        "name": inst.name,
        "email": inst.email,
        "phone": inst.phone,
        "experience": inst.experience,
        "about": inst.about
    } for inst in instructors]

    for inst in instructors:
        print(inst.instructor_id, inst.name)
        print("hii")

    return jsonify(result)






if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
