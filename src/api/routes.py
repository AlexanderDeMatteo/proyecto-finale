"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
# from turtle import update
from cmath import inf
from distutils.log import error
from http.client import OK
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Session, UserProfileInfo, db, User
from api.utils import generate_sitemap, APIException
import json
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, create_refresh_token, get_jwt, set_access_cookies
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import date

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
            user_id=newUser.id,
            fpv_number=fpv,
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
    user_profile_info = UserProfileInfo.query.filter_by(
        user_id=current_user).one_or_none()
    if request.method == 'GET':
        if user is None:
            return jsonify({"message": "Usuario no encontrado"}), 404
        if user_profile_info is None:
            return jsonify(user.serialize()), 200
        else:
            user_info = user.serialize()
            profile_info = user_profile_info.serialize()
            full_info = {**user_info, **profile_info}
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
                user_id=current_user,
                fpv_number=fpv,
                city=city,
                state=state,
                phone_number=phone_number,

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
            # Se actualiza el usuario si existe
            return jsonify({"message": "actualizalo", "ok": updated}), 200


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
        users_info = UserProfileInfo.query.filter(
            UserProfileInfo.fpv_number != "null")
        if users is None:
            return jsonify({"message": "Usuario no encontrado"}), 404
        else:
            users = list(map(
                lambda user: user.serialize(),
                users
            ))
            users_info = list(map(
                lambda user: user.serialize(),
                users_info
            ))
            full_info = []
            for user in users:
                for info in users_info:
                    if info["user_id"] == user["id"]:
                        info.update(user)
                        full_info.append(info)
            return jsonify(full_info), 200


@api.route("/specialty-area", methods=['GET'])
def handle_specialty_area():
    specialty_areas = ["Psicología Cognitiva", "Psicología Clínica", "Neuro Psicología", "Psicólogia Biológica", "Psicología Comparativa o Etiología", "Psicología Educativa", "Psicología Evolutiva", "Psicología del Deporte", "Psicología Jurídica", "Psicología de la Personalidad", "Psicología de la Salud",
                       "Psicología de Parejas", "Psicología Familiar", "Psicología Empresarial y Organizacional", "Psicología Militar", "Psicología Escolar", "Psicología Gerontológica", "Psicología Experimental", "Psicología Del Desarrollo", "Psicología de Ingeniería", "Psicología del Marketing", "Sexología", "Psicología comunitaria"]
    return jsonify({"ok": True, "result": specialty_areas}), 200


# Get Session by ID of the professor, but returns all sessions of the current day. If there's no sessions, will return the same statement
@api.route("/sessions/today/<int:psychologist_id>", methods=['GET'])
def handle_sessions_today(psychologist_id):
    today = date.today()
    # Get the current date and stringify to compare with the value on the database
    current_date = today.strftime("%d/%m/%Y")
    print(today)
    sessions = Session.query.filter_by(
        psychologist_id=psychologist_id).where(current_date == Session.date).all()
    response = []
    for session in sessions:
        response.append(session.serialize())
        print(response)
    if sessions is None:
        return jsonify({"message": "Not sessions available for this Psychologist"}), 401
    else:
        return jsonify(response), 201


# Obtain sessions by the ID of the professor. Return all sessions for that professor
@api.route("/sessions/<int:psychologist_id>", methods=['GET'])
def handle_get_sessions(psychologist_id):
    sessions = Session.query.filter_by(psychologist_id=psychologist_id).all()
    response = []
    for session in sessions:
        response.append(session.serialize())
        print(response)
    if sessions is None:
        return jsonify({"message": "Not sessions available for this Psychologist"}), 401
    else:
        return jsonify(response), 201


# Handle the creation of the session by querying if the current user is psychologist
@api.route("/session-create", methods=['POST'])
@jwt_required()
def handle_session_create():
    current_psychologist = get_jwt_identity()
    if request.method == 'POST':
        psychologist = UserProfileInfo.query.filter_by(
            user_id=current_psychologist).where(UserProfileInfo.fpv_number != "" or None).one_or_none()  # Confirma si el usuario actual es psicologo o no
        if psychologist is not None:
            room_number = os.urandom(30).hex()
            session_data = request.json
            session_data["psychologist_id"] = psychologist.user_id
            session_data["room_number"] = room_number
            print(session_data)
            session = Session.create(session_data)
            if session is not None:
                return jsonify({"message": "Session created succesfully", }), 201
            return jsonify({"message": "info error"}), 400
        return jsonify({"message": "user not psychologist"}), 405

# Handle the DELETE, UPDATE of a session by getting the ID of the professor and the Session


@api.route("/session-handle/<int:session_id>", methods=['DELETE', 'PUT'])
@jwt_required()
def handle_one_session(session_id):
    current_psychologist = get_jwt_identity()
    psychologist = Session.query.filter_by(psychologist_id=current_psychologist).where(
        Session.id == session_id).one_or_none()  # Verifica si al psicologo actual le pertenece el servicio y si puede borrarlo
    session = Session.query.filter_by(id=session_id).one_or_none()
    if request.method == 'DELETE':
        if psychologist is not None:
            if session is None:
                return jsonify({"message": "Service not found"}), 404
            removed = session.delete()
            if removed == False:
                return jsonify({"status": False, "message": "something happened"}), 500
            else:
                return jsonify({"status": True, "message": "service deleted"}), 204
        else:
            return jsonify({"status": False, "message": "you're not the psychologist of this Session"}), 405
    # if request.method == 'PUT':
        # if session is not None:


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
