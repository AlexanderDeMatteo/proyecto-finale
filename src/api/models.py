from email.policy import default
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_psicologo = db.Column(db.Boolean(), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_online = db.Column(db.Boolean(), nullable=False, default=False)
    address = db.relationship("UserAddress", backref="user", uselist=False)
    user_info = db.relationship(
        'UserProfileInfo', backref='user', uselist=False)

    def __init__(self, name, email, password, numero_fpv, is_psicologo):
        self.name = name
        self.email = email
        self.password = password
        self.numero_fpv = numero_fpv
        self.is_active = True
        self.is_psicologo = is_psicologo

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "numero_telefonico": self.numero_telefonico,
            "numero_fpv": self.numero_fpv,
            "area_de_especialidad": self.area_de_especialidad,
            "pais": self.pais,
            "ciudad": self.ciudad,
            "estado": self.estado,
            "status": self.status,
            "facebook": self.facebook,
            "twitter": self.twitter,
            "instagram": self.instagram,
            "is_psicologo": self.is_psicologo,
            "profile_picture": self.profile_picture,
            "monto": self.monto





            # do not serialize the password, its a security breach
        }

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
    user_id = db.Column(db.Integer, db.ForeignKey(
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    profile_picture = db.Column(db.String(500), unique=False, nullable=True)
    dob = db.Column(db.String(20), nullable=True)
    dni = db.Column(db.String(30), nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    phone_number = db.Column(db.String(25), unique=False, nullable=True)
    fpv_number = db.Column(db.String(25), unique=True, nullable=True)
    specialty_area = db.Column(db.String(120), unique=False, nullable=True)
    twitter = db.Column(db.String(25), unique=True, nullable=True)
    facebook = db.Column(db.String(25), unique=True, nullable=True)
    instagram = db.Column(db.String(25), unique=True, nullable=True)
    academic_info  = db.relationship('PsychAcademicInfo', backref='userprofileinfo', uselist=True)
    experience = db.relationship("PsychExperiences", uselist=False, backref="userprofileinfo")
    psych_strategies  = db.relationship('PsychTherapeuticStrategies', backref='userprofileinfo', uselist=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "status": self.status,
            "profile_picture": self.profile_picture,
            "phone_number": self.phone_number,
            "fpv_number": self.fpv_number,
            "specialty_area": self.specialty_area,
            "twitter": self.twitter,
            "facebook": self.facebook,
            "instagram": self.instagram,
            "academic_info":[academic_info.serialize() for info in self.academic_info],
            "psych_strategies":self.psych_strategies
        }

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
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False


class PsychoConsultation:
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    monto = db.Column(db.String(25), unique=False, nullable=True)


class PsychAcademicInfo:
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(300))
    psych_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    institute = db.Column(db.String(100))
    graduation_date = db.Column(db.String(30))
    certificate_url = db.Column(db.String(300))

    def serialize(self):
        return{
            "id":self.id,
            "psych_id":self.psych_id,
            "institute": self.institute,
            "description": self.description,
            "graduation_date": self.graduation_date,
            "certificate_url": self.certificate_url
        }

    #Method to create academic information
    @classmethod
    def create(cls, academic_info):
        try:
            new_academic_info = cls(**academic_info)
            db.session.add(new_academic_info)
            db.session.commit()
            return new_academic_info
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    #Method to delete academic information
    def delete(self):
        db.session.delete(self)
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False
    
    #Method to update a academic info of an Psychologist
    def update(self, info):
        if "institute" in info:
            self.institute = info["institute"]
        if "description" in info:
            self.description = info["description"]
        if "graduation_date" in info:
            self.graduation_date = info["graduation_date"]
        if "certificate_url" in info:
            self.certificate_url = info["certificate_url"]

        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            print(error)
            return False

class PsychExperiences:
    id = db.Column(db.Integer, primary_key=True)
    psych_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=True)

    def serialize(self):
        return{
            "id":self.id,
            "psych_id":self.psych_id,
            "description": self.description
        }

    #Method to create experience information
    @classmethod
    def create(cls, experience_info):
        try:
            new_experience_info = cls(**experience_info)
            db.session.add(experience_info)
            db.session.commit()
            return new_experience_info
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    #Method to delete experience information
    def delete(self):
        db.session.delete(self)
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False
    
    #Method to update a experience info of an Psychologist
    def update(self, xp):
        if "description" in xp:
            self.description = xp["description"]

        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            print(error)
            return False

class PsychTherapeuticStrategies:
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(500))
    psych_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    url = db.Column(db.String(300))
    __table_args__ = (db.UniqueConstraint(
        'psych_id',
        'url',
        'description',
        name='unique_psych_image_url'
    ),)

    def serialize(self):
        return {
            "id": self.id,
            "psych_id": self.psych_id,
            "url": self.url,
            "description":self.description
        }

    #Method to create strategie information
    @classmethod
    def create(cls, strategie):
        try:
            new_strategie = cls(**strategie)
            db.session.add(strategie)
            db.session.commit()
            return strategie    
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    #Method to delete strategie information
    def delete(self):
        db.session.delete(self)
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False
    
    #Method to update a strategie info of an Psychologist
    def update(self, strategie):
        if "description" in strategie:
            self.description = strategie["description"],
        if "url" in strategie:
            self.url = strategie['url']

        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            print(error)
            return False
