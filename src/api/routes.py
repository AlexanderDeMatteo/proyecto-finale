"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import json
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, create_refresh_token, get_jwt, set_access_cookies
from datetime import timedelta

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/sign-up', methods=['POST'])
def handle_register():

    data = request.data
    data_decode = json.loads(data)
    newUser = User(**data_decode)
    user = User.query.filter_by(email=newUser.email,password=newUser.password).first()
    if user is None:
        db.session.add(newUser)
        db.session.commit()
        access_token = create_access_token(identity=newUser.id)
        response_body = {
            "message": "Usuario creado con exito",
            "token":access_token
        }
        return jsonify(response_body), 200
    else :
        response_body = {
            "message": "Usuario ya existe"
        }
        return jsonify(response_body), 400

@api.route('/sign-in', methods=['POST'])
def handle_login():
    data = request.data
    data_decode = json.loads(data)
    user = User.query.filter_by(**data_decode).first()
    if user is None:  
        response_body = {
            "message": "Credenciales Inválidas"
        }
        return jsonify(response_body), 400
    else :
        access_token = create_access_token(identity=user.id)
        response_body = {
            "message": "usuario logeado con exito",
            "token":access_token
        }
        return jsonify(response_body), 200

# @api.route("/private",methods=["POST"])
# @jwt_required()
# def handle_private():
#     current_id_user = get_jwt_identity()
#     current_user = User.query.get(current_id_user)
#     print(current_id_user)
#     return jsonify(current_user.serialize()),200
#     print(current_id_user)


@api.route("/user-data", methods=['GET','PUT'])
@jwt_required()
def handle_user_data():
    if request.method == 'GET':
        current_user = get_jwt_identity()
        user = User.query.filter_by(id=current_user).one_or_none()
        if user is None:
            return jsonify({"message":"Usuario no encontrado"}), 404
        return jsonify(user.serialize()), 200
    if request.method == 'PUT':
        current_user = get_jwt_identity()
        data = request.data
        data_decode = json.loads(data)
        updateUser = User.query.get(current_user)
        updateUser.update(**data_decode)
        response_body = {
            "message": "Usuario actualizado con exito",}
        return jsonify(response_body), 200
        

@api.route("/protected")
@jwt_required()
def protected():
    return jsonify(foo="bar")


# @api.route("/refresh", methods=["POST"])
# @jwt_required(refresh=True)
# def refresh():
#     current_user = get_jwt_identity()
#     access_token = create_access_token(identity=current_user)
#     return jsonify(access_token=access_token)




#     @app.route('/personajes', methods=['GET'])
# def listapersonajes():
#     personajes = Personajes.query.all()
#     personajes_serializado = list(
#     map(lambda personaje: personaje.serialize(), personajes))
#     return jsonify(personajes_serializado), 200