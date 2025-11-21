from flask import Blueprint, request, jsonify
from models import db, Member

members_bp = Blueprint("members", __name__)

@members_bp.get("/")
def get_members():
    members = Member.query.all()
    return jsonify([{
        "member_id": m.member_id,
        "name": m.name,
        "email": m.email,
        "phone": m.phone
    } for m in members])

@members_bp.post("/")
def add_member():
    data = request.json
    new_member = Member(
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        age=data["age"],
        gender=data["gender"],
        goal=data["goal"]
    )
    db.session.add(new_member)
    db.session.commit()
    return jsonify({"message": "Member created successfully"})
