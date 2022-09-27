from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    is_psicologo = db.Column(db.Boolean(), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=False)
    is_online = db.Column(db.Boolean(), nullable=False, default=False)
    salt = db.Column(db.String(80), unique=True, nullable=False)
    address = db.relationship("UserAddress", backref="user", uselist=False)
    user_info = db.relationship('UserProfileInfo', backref='user', uselist=False)

    def __init__(self,name,email,password,numero_fpv, is_psicologo ):
        self.name=name
        self.email=email
        self.password=password
        self.numero_fpv=numero_fpv
        self.is_active=True
        self.is_psicologo=is_psicologo

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name" : self.last_name,
            "numero_telefonico" : self.numero_telefonico,
            "numero_fpv" : self.numero_fpv,
            "area_de_especialidad" : self.area_de_especialidad,
            "pais" : self.pais,
            "ciudad" : self.ciudad,
            "estado" : self.estado,
            "status" : self.status,
            "facebook": self.facebook,
            "twitter": self.twitter,
            "instagram": self.instagram,
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    country = db.Column(db.String(120), unique=False, nullable=True)
    state = db.Column(db.String(120), unique=False, nullable=True)
    city = db.Column(db.String(120), unique=False, nullable=True)
    address = db.Column(db.String(300), nullable=True)
    status = db.Column(db.Boolean(), unique=False, nullable=True, default=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "state": self.state,
            "city": self.city,
            "address": self.address
        }

    def update(self, name,last_name, numero_telefonico, area_de_especialidad, pais, estado, ciudad, instagram, twitter, facebook, monto):

        self.name=name
        self.last_name=last_name
        self.numero_telefonico=numero_telefonico
        self.area_de_especialidad=area_de_especialidad
        self.pais=pais
        self.estado=estado
        self.ciudad=ciudad
        self.instagram=instagram
        self.facebook=facebook
        self.twitter=twitter
        self.monto=monto
        db.session.commit()
        return(True)


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
    city = db.Column(db.String(25), unique=False, nullable=True)
    state = db.Column(db.String(25), unique=False, nullable=True)
    twitter = db.Column(db.String(25), unique=True, nullable=True)
    facebook = db.Column(db.String(25), unique=True, nullable=True)
    instagram = db.Column(db.String(25), unique=True, nullable=True)

