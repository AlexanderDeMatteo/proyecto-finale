from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    profile_id = db.relationship('Profile')

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
            "name": self.name
            # do not serialize the password, its a security breach
        }

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    apellido = db.Column(db.String(120), unique=False, nullable=False)
    mostrar_nombre=db.Column(db.String(120), unique=False, nullable=False)
    area_de_especialidad=db.Column(db.String(120), unique=False, nullable=False)
    pais=db.Column(db.String(120), unique=False, nullable=False)
    ciudad=db.Column(db.String(120), unique=False, nullable=False)
    status= db.Column(db.Boolean(), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

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
            "name": self.name
            # do not serialize the password, its a security breach
        }    

    #    class status(Enum): 