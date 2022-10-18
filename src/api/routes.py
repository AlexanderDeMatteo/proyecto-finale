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
    user = User.query.filter_by(
        email=newUser.email, password=newUser.password).first()
    if user is None:
        db.session.add(newUser)
        db.session.commit()
        access_token = create_access_token(identity=newUser.id)
        response_body = {
            "message": "Usuario creado con exito",
            "token": access_token
        }
        return jsonify(response_body), 200
    else:
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
    else:
        access_token = create_access_token(identity=user.id)
        response_body = {
            "message": "usuario logeado con exito",
            "token": access_token
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


@api.route("/user-data", methods=['GET', 'PUT'])
@jwt_required()
def handle_user_data():
    if request.method == 'GET':
        current_user = get_jwt_identity()
        user = User.query.filter_by(id=current_user).one_or_none()
        if user is None:
            return jsonify({"message": "Usuario no encontrado"}), 404
        return jsonify(user.serialize()), 200
    if request.method == 'PUT':
        current_user = get_jwt_identity()
        data = request.data
        data_decode = json.loads(data)
        updateUser = User.query.get(current_user)
        updateUser.update(**data_decode)
        response_body = {
            "message": "Usuario actualizado con exito", }
        return jsonify(response_body), 200


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


#Endpoint to delete, update and get a academic info by id
# Preguntar en reunion, como se hará para actualizar la información academica del psicologo
@app.route('/psych-academic-info/<int:id>', methods=['DELETE', 'PUT', 'GET'])
def handle_one_academic_info(id):
    academic_info = PsychAcademicInfo.query.filter_by(id=id).one_or_none()
    if request.method == 'DELETE':
        if academic_info is None:
            return jsonify({"message": "Academic information not found"}), 404
        deleted = academic_info.delete()
        if deleted == False:
            return jsonify({"message":"Something happen try again!"}), 500
        return jsonify({"message":"Academic information deleted."}), 204
    elif request.method == 'GET':
        if academic_info is None:
            return jsonify({"message": "Academic information not found"}), 404
        return jsonify(academic_info.serialize()), 200
    elif request.method == 'PUT':
        if academic_info is not None:
             updated = academic_info.update(request.json)
             if updated:
                 return jsonify({"message":"Academic information updated"}), 200
             else:
                 return jsonify({"message":"Something went wrong!"}), 500
        return jsonify({"message":"This academic information does not exist"}), 404


#Endpoint to delete, update and get a experience by id
@app.route('/psych-experiences/<int:id>', methods=['DELETE', 'PUT', 'GET'])
def handle_one_experience(id):
    psych_xp = PsychExperiences.query.filter_by(id=id).one_or_none()
    if request.method == 'DELETE':
        if psych_xp is None:
            return jsonify({"message": "Experience not found"}), 404
        deleted = psych_xp.delete()
        if deleted == False:
            return jsonify({"message":"Something happen try again!"}), 500
        return jsonify({"message":"Experience deleted"}), 204
    elif request.method == 'GET':
        if psych_xp is None:
            return jsonify({"message": "Experience not found"}), 404
        return jsonify(psych_xp.serialize()), 200
    elif request.method == 'PUT':
        if psych_xp is not None:
             updated = psych_xp.update(request.json)
             if updated:
                 return jsonify({"message":"Experience updated"}), 200
             else:
                 return jsonify({"message":"Something went wrong!"}), 500
        return jsonify({"message":"Experience does not exist!"}), 404

#Endpoint to delete, update and get a strategie by id
@app.route('/psych-strategies/<int:id>', methods=['DELETE', 'PUT', 'GET'])
def handle_one_experience(id):
    psych_strategie = PsychTherapeuticStrategies.query.filter_by(id=id).one_or_none()
    if request.method == 'DELETE':
        if psych_strategie is None:
            return jsonify({"message": "Strategie not found"}), 404
        deleted = psych_strategie.delete()
        if deleted == False:
            return jsonify({"message":"Something happen try again!"}), 500
        return jsonify({"message":"Strategie deleted"}), 204
    elif request.method == 'GET':
        if psych_strategie is None:
            return jsonify({"message": "Strategie not found"}), 404
        return jsonify(psych_strategie.serialize()), 200
    elif request.method == 'PUT':
        if psych_strategie is not None:
             updated = psych_strategie.update(request.json)
             if updated:
                 return jsonify({"message":"Strategie updated"}), 200
             else:
                 return jsonify({"message":"Something went wrong!"}), 500
        return jsonify({"message":"Strategie does not exist!"}), 404


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
