from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    numero_telefonico = db.Column(db.String(25), unique=False, nullable=True)
    numero_fpv = db.Column(db.String(25), unique=True, nullable=True)
    area_de_especialidad = db.Column(db.String(120), unique=False, nullable=True)
    pais = db.Column(db.String(120), unique=False, nullable=True)
    ciudad = db.Column(db.String(120), unique=False, nullable=True)
    status = db.Column(db.Boolean(), unique=False, nullable=True)
    twitter = db.Column(db.String(25), unique=True, nullable=True)
    facebook = db.Column(db.String(25), unique=True, nullable=True)
    instagram = db.Column(db.String(25), unique=True, nullable=True)
    is_psicologo = db.Column(db.Boolean(), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

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
            "status" : self.status,
            "facebook": self.facebook,
            "twitter": self.twitter,
            "instagram": self.instagram,
            "is_psicologo": self.is_psicologo




            # do not serialize the password, its a security breach
        }

    def update(self, name,last_name, numero_telefonico, area_de_especialidad, pais, ciudad, instagram, twitter, facebook):

        self.name=name
        self.last_name=last_name
        self.numero_telefonico=numero_telefonico
        self.area_de_especialidad=area_de_especialidad
        self.pais=pais
        self.ciudad=ciudad
        self.instagram=instagram
        self.facebook=facebook
        self.twitter=twitter
        db.session.commit()
        return(True)



