"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
# from turtle import update
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import UserProfileInfo, db, User
from api.utils import generate_sitemap, APIException
import json
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, create_refresh_token, get_jwt, set_access_cookies
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import os

api = Blueprint('api', __name__)

@api.route('/sign-up', methods=['POST'])
def handle_register():
    updated_info = {}
    user = request.json
    updated_info = {**user}

    # Add salt to the password
    password = user['password']
    salt = os.urandom(10).hex()
    user['salt'] = salt
    user['password'] = generate_password_hash(salt + password)

    del user["fpv_number"]

    newUser = User.create(user)
    
    if newUser is not None:
        access_token = create_access_token(identity=newUser.id)
        updated_info["user_id"] = newUser.id
        fpv = updated_info["fpv_number"]
        print(updated_info)
        create_profile_info = UserProfileInfo(
            user_id = newUser.id,
            fpv_number = fpv,
            ) 
        try:
            db.session.add(create_profile_info)
            db.session.commit()
            return jsonify({"token": access_token, "results": create_profile_info.serialize()}), 201
        except Exception as error:
            db.session.rollback()
            print(error)
            return jsonify(error.args), 500
    
    


@api.route('/sign-in', methods=['POST'])
def handle_login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email).one_or_none()
    if user is None: 
        return jsonify({"message": "Usuario no encontrado"}), 404
    
    salt = user.salt
    if check_password_hash(user.password, salt + password):
        access_token = create_access_token(identity=user.id) 
        return jsonify({"message": "Usuario logeado con éxito", "token": access_token}), 200
    return jsonify({"message": "Credenciales Inválidas"}), 401

# @api.route("/private",methods=["POST"])
# @jwt_required()
# def handle_private():
#     current_id_user = get_jwt_identity()
#     current_user = User.query.get(current_id_user)
#     print(current_id_user)
#     return jsonify(current_user.serialize()),200
#     print(current_id_user)


@api.route("/user-data", methods=['GET', 'PUT'])
@jwt_required()
def handle_user_data():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).one_or_none()
    user_profile_info = UserProfileInfo.query.filter_by(user_id = current_user).one_or_none()
    if request.method == 'GET':
        if user is None:
            return jsonify({"message": "Usuario no encontrado"}), 404
        if user_profile_info is None:
            return jsonify(user.serialize()), 200
        else: 
            user_info = user.serialize()
            profile_info = user_profile_info.serialize()
            full_info = {**user_info,**profile_info }
            # print(user_profile_info.serialize())
           # print(full_info, "linea 82")
            return jsonify(full_info), 200 
    if request.method == 'PUT':
        data = request.json
        print(data)
        #data_decode = json.loads(data)
        user.update(data)
        email = data["email"]
        fpv = data["fpv_number"]
        city = data["city"]
        state = data["state"]
        phone_number = data["phone_number"]
        if user_profile_info is None: 
            create_profile_info = UserProfileInfo(
                user_id = current_user,
                fpv_number = fpv,
                city = city,
                state = state,
                phone_number = phone_number,
                
            ) 
            try:
                db.session.add(create_profile_info)
                db.session.commit()
                return jsonify(create_profile_info.serialize()), 201
            except Exception as error:
                db.session.rollback()
                print(error)
                return jsonify(error), 500
        else:
            updated = user_profile_info.update(data)
            return jsonify({"message": "actualizalo", "ok": updated}), 200            # Se actualiza el usuario si existe

        


@api.route("/user-profile-picture", methods=['PUT'])
@jwt_required()
def handle_user_picture():
    current_user = get_jwt_identity()
    data = request.data
    data_decode = json.loads(data)
    updateUser = User.query.get(current_user)
    print(data_decode)
    updateUser.profile_picture = data_decode
    db.session.commit()
    response_body = {
        "message": "Usuario actualizo foto con exito", }
    return jsonify(response_body), 200


@api.route("/protected")
@jwt_required()
def protected():
    return jsonify(foo="bar")


@api.route("/user-psicologo-data", methods=['GET'])
@jwt_required()
def handle_user_psicologo():
    if request.method == 'GET':
        users = User.query.filter_by(is_psicologo=True).all()
        lista_psico = []
        for usuario in users:
            lista_psico.append(usuario.serialize())

        if users is None:
            return jsonify({"message": "Usuario no encontrado"}), 404
        else:
            return jsonify(lista_psico), 200


@api.route("/specialty-area", methods=['GET'])
def handle_specialty_area():
    specialty_areas = ["Psicología Cognitiva", "Psicología Clínica", "Neuro Psicología", "Psicólogia Biológica", "Psicología Comparativa o Etiología", "Psicología Educativa", "Psicología Evolutiva", "Psicología del Deporte", "Psicología Jurídica", "Psicología de la Personalidad", "Psicología de la Salud",
                       "Psicología de Parejas", "Psicología Familiar", "Psicología Empresarial y Organizacional", "Psicología Militar", "Psicología Escolar", "Psicología Gerontológica", "Psicología Experimental", "Psicología Del Desarrollo", "Psicología de Ingeniería", "Psicología del Marketing", "Sexología", "Psicología comunitaria"]
    return jsonify({"ok": True, "result": specialty_areas}), 200

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
