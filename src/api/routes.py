"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
# from turtle import update
from cmath import inf
from distutils.log import error
from http.client import OK
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Schedule, Session, UserProfileInfo, db, User
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

#Route to update profile picture and load it directly from cloudinary.
@api.route("/update_profile_picture", methods=['PUT'])
@jwt_required()
def handle_user_picture():
    current_user = get_jwt_identity()
    user = UserProfileInfo.query.filter_by(id=current_user).one_or_none()
    data = request.json
    if data is not None:
        updated = user.update_profile_picture(data)
        print(updated)
        if updated is False:
            return jsonify({"message": "error"}), 404
        else:
            return jsonify({"message": "profile picture updated"}), 200
    else:
        return jsonify({"message": "image didnt load"}), 500


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


# Endpoint to delete, update and get a academic info by id
# Preguntar en reunion, como se hará para actualizar la información academica del psicologo
@api.route('/psych-academic-info/<int:id>', methods=['DELETE', 'PUT', 'GET'])
def handle_one_academic_info(id):
    academic_info = PsychAcademicInfo.query.filter_by(id=id).one_or_none()
    if request.method == 'DELETE':
        if academic_info is None:
            return jsonify({"message": "Academic information not found"}), 404
        deleted = academic_info.delete()
        if deleted == False:
            return jsonify({"message": "Something happen try again!"}), 500
        return jsonify({"message": "Academic information deleted."}), 204
    elif request.method == 'GET':
        if academic_info is None:
            return jsonify({"message": "Academic information not found"}), 404
        return jsonify(academic_info.serialize()), 200
    elif request.method == 'PUT':
        if academic_info is not None:
            updated = academic_info.update(request.json)
            if updated:
                return jsonify({"message": "Academic information updated"}), 200
            else:
                return jsonify({"message": "Something went wrong!"}), 500
        return jsonify({"message": "This academic information does not exist"}), 404


# Endpoint to delete, update and get a experience by id
@api.route('/psych-experiences/<int:id>', methods=['DELETE', 'PUT', 'GET'])
def handle_one_experience(id):
    psych_xp = PsychExperiences.query.filter_by(id=id).one_or_none()
    if request.method == 'DELETE':
        if psych_xp is None:
            return jsonify({"message": "Experience not found"}), 404
        deleted = psych_xp.delete()
        if deleted == False:
            return jsonify({"message": "Something happen try again!"}), 500
        return jsonify({"message": "Experience deleted"}), 204
    elif request.method == 'GET':
        if psych_xp is None:
            return jsonify({"message": "Experience not found"}), 404
        return jsonify(psych_xp.serialize()), 200
    elif request.method == 'PUT':
        if psych_xp is not None:
            updated = psych_xp.update(request.json)
            if updated:
                return jsonify({"message": "Experience updated"}), 200
            else:
                return jsonify({"message": "Something went wrong!"}), 500
        return jsonify({"message": "Experience does not exist!"}), 404

# Endpoint to delete, update and get a strategie by id


@api.route('/psych-strategies/<int:id>', methods=['DELETE', 'PUT', 'GET'])
def handle_one_strategie(id):
    psych_strategie = PsychTherapeuticStrategies.query.filter_by(
        id=id).one_or_none()
    if request.method == 'DELETE':
        if psych_strategie is None:
            return jsonify({"message": "Strategie not found"}), 404
        deleted = psych_strategie.delete()
        if deleted == False:
            return jsonify({"message": "Something happen try again!"}), 500
        return jsonify({"message": "Strategie deleted"}), 204
    elif request.method == 'GET':
        if psych_strategie is None:
            return jsonify({"message": "Strategie not found"}), 404
        return jsonify(psych_strategie.serialize()), 200
    elif request.method == 'PUT':
        if psych_strategie is not None:
            updated = psych_strategie.update(request.json)
            if updated:
                return jsonify({"message": "Strategie updated"}), 200
            else:
                return jsonify({"message": "Something went wrong!"}), 500
        return jsonify({"message": "Strategie does not exist!"}), 404
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
        psychologist = User.query.filter_by(id=current_psychologist).where(
            User.is_psicologo == True).one_or_none()  # Confirma si el usuario actual es psicologo o no
        if psychologist is not None:
            room_number = os.urandom(20).hex()
            session_data = request.json
            session_data["psychologist_id"] = psychologist.id
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
    if request.method == 'PUT':
        if session is not None:
            updated = session.update_session(request.json)
            if updated:
                return jsonify({"message": "service updated"}), 200
            return jsonify({"message": "error"}), 500


# Handle the reservation of the service by a client
@api.route("/session-reserved/<int:session_id>", methods=['PUT'])
@jwt_required()
def handle_reserved_session(session_id):
    current_user = get_jwt_identity()
    # Confirma el id del usuario actual
    user = User.query.filter_by(id=current_user).one_or_none()
    data = request.json
    session = Session.query.filter_by(id=session_id).one_or_none()
    if session is not None:
        # añade el id del usuario actual al response
        data["client_id"] = user.id
        # actualiza la session y le coloca el id del usuario. tambien cambia el estado de reservacion a true
        reserved = session.reserve_session(data)
        if reserved is True:
            return jsonify({"message": "session is reserved"}), 200
        else:
            return jsonify({"message": "error"}), 500
    else:
        return ({"message": "session not found"})


@api.route("/session-unbook/<int:session_id>", methods=['PUT'])
@jwt_required()
def handle_unbook_session(session_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).one_or_none()
    session = Session.query.filter_by(id=session_id).one_or_none()
    data = request.json
    print(data)
    if session is not None:
        data["client_id"] = None
        print(data)
        unbooked = session.reserve_session(data)
        print(unbooked)
        if unbooked is True:
            return jsonify({"message": "Session unbooked"}), 204
        else:
            return jsonify({"message": "error"}), 500

# Handle the creation of schedules for the sessions of each professor


@api.route("/schedule", methods=['GET', 'POST'])
@jwt_required()
def handle_schedule():
    current_psychologist = get_jwt_identity()
    psychologist = User.query.filter_by(id=current_psychologist).where(
        User.is_psicologo == True).one_or_none()
    if request.method == 'POST':
        schedule_data = request.json
        schedule_data["psychologist_id"] = psychologist.id
        schedule = Schedule.create_schedule(schedule_data)
        if schedule is not None:
            return jsonify({"message": "schedule created succesfully"}), 201
        return jsonify({"message": "info error"}), 400
    elif request.method == 'GET':
        schedules_current_id = Schedule.query.filter_by(
            psychologist_id=psychologist.id).all()
        print(schedules_current_id)
        response = []
        if schedules_current_id is not None:
            for schedule_single in schedules_current_id:
                response.append(schedule_single.serialize())
            return jsonify(response), 200
        else:
            return jsonify({"message": "no schedules"})


@api.route("/schedule-handle/<int:schedule_id>", methods=['DELETE', 'PUT'])
@jwt_required()
def handle_modification_schedule(schedule_id):
    current_psychologist = get_jwt_identity()
    psychologist = User.query.filter_by(id=current_psychologist).where(
        User.is_psicologo == True).one_or_none()
    if request.method == 'DELETE':
        schedule_to_delete = Schedule.query.filter_by(
            id=schedule_id).one_or_none()
        if schedule_to_delete.psychologist_id != psychologist.id:
            return jsonify({"message": "not the owner of the schedule"}), 402
        else:
            if schedule_to_delete is None:
                return jsonify({"message": "schedule not found"}), 404
            removed = schedule_to_delete.delete_schedule()
            if removed == False:
                return jsonify({"status": False, "message": "something happened"}), 500
            else:
                return jsonify({"status": True, "message": "service deleted"}), 204
    elif request.method == 'PUT':
        schedule_to_modify = Schedule.query.filter_by(
            id=schedule_id).one_or_none()
        if schedule_to_modify.psychologist_id != psychologist.id:
            return jsonify({"message": "not the owner of the schedule"}), 402
        data = request.json
        if schedule_to_modify is not None:
            modified = schedule_to_modify.update_schedule(data)
            if modified == True:
                return jsonify({"message": "schedule modified"}), 200
            return jsonify({"message": "error"})

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
