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
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self,name,email,password):
        self.name=name
        self.email=email
        self.password=password
        self.is_active=True

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
            "status" : self.status




            # do not serialize the password, its a security breach
        }

    def update(self, name,last_name, numero_telefonico, numero_fpv, area_de_especialidad, pais, ciudad):

        self.name=name
        self.last_name=last_name
        self.numero_telefonico=numero_telefonico
        self.numero_fpv=numero_fpv
        self.area_de_especialidad=area_de_especialidad
        self.pais=pais
        self.ciudad=ciudad
        db.session.commit()
        return(True)



