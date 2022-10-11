from email.policy import default
from enum import unique
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    is_psicologo = db.Column(db.Boolean(), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False,
                          nullable=False, default=False)
    is_online = db.Column(db.Boolean(), nullable=False, default=False)
    salt = db.Column(db.String(80), unique=True, nullable=False)
    address = db.relationship("UserAddress", backref="user", uselist=False)
    user_info = db.relationship(
        'UserProfileInfo', backref='user', uselist=False)
    session_ids = db.relationship(
        "Session",
        primaryjoin="and_(User.id==Session.psychologist_id, " "Session.client_id)",
    )
    #psychologist_sessions = db.relationship('Session', backref='psychologist', uselist=False)
    #client_sessions = db.relationship('Session', backref='client', uselist=False)

    # def __init__(self, name, email, password, is_psicologo):
    # self.name = name
    # self.email = email
    #self.password = password
    #self.is_active = True
    #self.is_psicologo = is_psicologo

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "is_psicologo": self.is_psicologo,
        }

    @classmethod
    def create(cls, user):
        try:
            new_user = cls(**user)
            db.session.add(new_user)
            db.session.commit()
            return new_user
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

            # do not serialize the password, its a security breach

    def update(self, ref_user):

        if "name" in ref_user:
            self.name = ref_user["name"]
        if "last_name" in ref_user:
            self.last_name = ref_user["last_name"]
        if "email" in ref_user:
            self.email = ref_user["email"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False


class UserAddress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    psychologist_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), unique=True, nullable=False)

    country = db.Column(db.String(120), unique=False, nullable=True)
    state = db.Column(db.String(120), unique=False, nullable=True)
    city = db.Column(db.String(120), unique=False, nullable=True)
    address = db.Column(db.String(300), nullable=True)
    status = db.Column(db.Boolean(), unique=False,
                       nullable=True, default=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "state": self.state,
            "city": self.city,
            "address": self.address
        }

    def update(self, ref_user):
        if "country" in ref_user:
            self.country = ref_user["country"]
        if "state" in ref_user:
            self.state = ref_user["state"]
        if "city" in ref_user:
            self.city = ref_user["city"]
        if "address" in ref_user:
            self.address = ref_user["address"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False


class UserProfileInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), unique=True, nullable=False)
    profile_picture = db.Column(db.String(500), unique=False, nullable=True)
    dob = db.Column(db.String(20), nullable=True)
    dni = db.Column(db.String(30), nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    phone_number = db.Column(db.String(25), unique=False, nullable=True)
    fpv_number = db.Column(db.String(25), unique=True, nullable=True)
    specialty_area = db.Column(db.String(120), unique=False, nullable=True)
    city = db.Column(db.String(25), unique=False, nullable=True)
    state = db.Column(db.String(25), unique=False, nullable=True)
    twitter = db.Column(db.String(25), unique=True, nullable=True)
    facebook = db.Column(db.String(25), unique=True, nullable=True)
    instagram = db.Column(db.String(25), unique=True, nullable=True)

    def __init__(self, fpv_number, user_id):
        self.fpv_number = fpv_number,
        self.user_id = user_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "profile_picture": self.profile_picture,
            "phone_number": self.phone_number,
            "fpv_number": self.fpv_number,
            "specialty_area": self.specialty_area,
            "city": self.city,
            "state": self.state,
            "twitter": self.twitter,
            "facebook": self.facebook,
            "instagram": self.instagram
        }

    def update_fpv(self, data):
        if "fpv_number" in data:
            self.fpv_number = data["fpv_number"]
        if "user_id" in data:
            self.user_id = data["user_id"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

    def update(self, ref_user):
        if "profile_picture" in ref_user:
            self.profile_picture = ref_user["profile_picture"]
        if "phone_number" in ref_user:
            self.phone_number = ref_user["phone_number"]
        if "fpv_number" in ref_user:
            self.fpv_number = ref_user["fpv_number"]
        if "specialty_area" in ref_user:
            self.specialty_area = ref_user["specialty_area"]
        if "twitter" in ref_user:
            self.twitter = ref_user["twitter"]
        if "facebook" in ref_user:
            self.facebook = ref_user["facebook"]
        if "instagram" in ref_user:
            self.instagram = ref_user["instagram"]
        if "state" in ref_user:
            self.state = ref_user["state"]
        if "city" in ref_user:
            self.city = ref_user["city"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False


class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    psychologist_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    reserved = db.Column(db.Boolean(), nullable=True, default=False)
    name = db.Column(db.String(100), nullable=False, unique=False)
    date = db.Column(db.String(50), nullable=False, unique=False)
    time = db.Column(db.String(20), nullable=False, unique=False)

    def serialize(self):
        return {
            "id": self.id,
            "psychologist_id": self.psychologist_id,
            "client_id": self.client_id,
            "reserved": self.state,
            "name": self.city,
            "date": self.address,
            "time": self.time
        }

    @classmethod
    def create(cls, data_sessions):
        try:
            new_data_session = cls(**data_sessions)
            db.session.add(new_data_session)
            db.session.commit()
            return new_data_session
        except Exception as error:
            db.session.rollback()
            print(error)
            return None


class PsychoConsultation:
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    monto = db.Column(db.String(25), unique=False, nullable=True)
