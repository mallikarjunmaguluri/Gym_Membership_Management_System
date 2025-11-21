from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Member(db.Model):
    __tablename__ = "members"
    member_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    phone = db.Column(db.String(20))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    goal = db.Column(db.String(255))
    password = db.Column(db.Text)

class Instructor(db.Model):
    __tablename__ = "instructor"
    instructor_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    phone = db.Column(db.String(20),unique=True)
    experience = db.Column(db.Integer)
    about = db.Column(db.Text)

class Classes(db.Model):
    __tablename__ = "classes"
    classes_id = db.Column(db.Integer, primary_key=True)
    instructor_id = db.Column(db.Integer, db.ForeignKey("instructor.instructor_id"))
    title = db.Column(db.String(100))
    class_start_time = db.Column(db.Time)
    class_end_time = db.Column(db.Time)
    no_of_members_allowed = db.Column(db.Integer)

class ClassEnrollment(db.Model):
    __tablename__ = "class_enrollment"
    class_enrollment_id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey("classes.classes_id"))
    member_id = db.Column(db.Integer, db.ForeignKey("members.member_id"))
    date = db.Column(db.Date)
    status = db.Column(db.String(50))

class MembershipOptions(db.Model):
    __tablename__ = "membershipOptions"
    membershipOption_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    price = db.Column(db.Numeric(10,2))
    validity_in_days = db.Column(db.Integer)

class Membership(db.Model):
    __tablename__ = "memberships"
    membership_id = db.Column(db.Integer, primary_key=True)
    membershipOption_id = db.Column(db.Integer, db.ForeignKey("membershipOptions.membershipOption_id"))
    member_id = db.Column(db.Integer, db.ForeignKey("members.member_id"))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    card_number = db.Column(db.String(50))
    card_name = db.Column(db.String(100))
    expire_date = db.Column(db.Date)
    amount = db.Column(db.Numeric(10,2))
