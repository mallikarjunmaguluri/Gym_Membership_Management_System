from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Member, Instructor, Membership, MembershipOptions,Classes  
import os
from datetime import date, timedelta
from datetime import datetime, timedelta

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


# @app.route('/member-login', methods=['POST'])
# def member_login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     member = Member.query.filter_by(email=email, password=password).first()

#     if member:
#         return jsonify({"success": True, "message": "Login success"}), 200
#     else:
#         return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route('/member-login', methods=['POST'])
def member_login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    member = Member.query.filter_by(email=email, password=password).first()

    if member:
        # Include member_id in the response
        return jsonify({
            "success": True,
            "message": "Login success",
            "id": member.member_id   # ✅ send member ID
        }), 200
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


@app.route("/classes", methods=["GET"])
def get_classes():
    classes_list = Classes.query.all()
    result = [{
        "classes_id": cls.classes_id,
        "instructor_id": cls.instructor_id,
        "title": cls.title,
        "class_start_time": str(cls.class_start_time),
        "class_end_time": str(cls.class_end_time),
        "no_of_members_allowed": cls.no_of_members_allowed
    } for cls in classes_list]
    return jsonify(result)


@app.route("/add-class", methods=["POST"])
def add_class():
    data = request.get_json()

    # Optional: validate instructor exists
    instructor = Instructor.query.filter_by(instructor_id=data["instructor_id"]).first()
    if not instructor:
        return jsonify({"status": "invalid_instructor"})

    new_class = Classes(
        instructor_id=data["instructor_id"],
        title=data["title"],
        class_start_time=data["class_start_time"],
        class_end_time=data["class_end_time"],
        no_of_members_allowed=data["no_of_members_allowed"]
    )

    db.session.add(new_class)
    db.session.commit()

    return jsonify({"status": "success"})



@app.route("/members/<int:member_id>", methods=["GET"])
def get_member(member_id):
    member = Member.query.filter_by(member_id=member_id).first()
    if member:
        return jsonify({
            "member_id": member.member_id,
            "name": member.name,
            "email": member.email,
            "phone": member.phone,
            "age": member.age,
            "gender": member.gender,
            "goal": member.goal,
        }), 200
    else:
        return jsonify({"error": "Member not found"}), 404
    
    
@app.route("/members/<int:member_id>", methods=["PUT"])
def update_member(member_id):
    data = request.get_json()
    member = Member.query.get(member_id)
    if not member:
        return jsonify({"status": "error", "message": "Member not found"}), 404

    # Update fields if provided
    member.name = data.get("name", member.name)
    member.phone = data.get("phone", member.phone)
    member.age = data.get("age", member.age)
    member.goal = data.get("goal", member.goal)
    member.email = data.get("email", member.email)

    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Profile updated successfully",
        "member": {
            "member_id": member.member_id,
            "name": member.name,
            "email": member.email,
            "phone": member.phone,
            "age": member.age,
            "goal": member.goal,
        }
    })


class Membership(db.Model):
    __tablename__ = 'memberships_enrolled'
    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, nullable=False)
    membershipOption_id = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    card_number = db.Column(db.String(20), nullable=False)
    card_name = db.Column(db.String(100), nullable=False)
    expire_date = db.Column(db.String(7), nullable=False)
    status = db.Column(db.String(20), default='Pending')

# ----------------- Route -----------------
@app.route('/enroll-membership', methods=['POST'])
def enroll_membership():
    data = request.json
    try:
        member_id = data.get('member_id')
        membershipOption_id = data.get('membershipOption_id')
        price = Decimal(str(data.get('price', 0)))
        validity_in_days = int(data.get('validity_in_days', 0))
        card_number = data.get('card_number')
        card_name = data.get('card_name')
        expire_date = data.get('expire_date')
        status = data.get('status', 'Pending')

        # Validate required fields
        if not all([member_id, membershipOption_id, card_number, card_name, expire_date]):
            return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

        # Calculate start_date and end_date
        start_date = datetime.now().date()
        end_date = start_date + timedelta(days=validity_in_days)

        # Insert into DB
        new_enrollment = Membership(
            member_id=member_id,
            membershipOption_id=membershipOption_id,
            price=price,
            start_date=start_date,
            end_date=end_date,
            card_number=card_number,
            card_name=card_name,
            expire_date=expire_date,
            status=status
        )
        db.session.add(new_enrollment)
        db.session.commit()

        return jsonify({'status': 'success', 'message': 'Membership enrolled successfully!'})

    except Exception as e:
        print("Error enrolling membership:")
        return jsonify({'status': 'error', 'message': 'Server error'}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
