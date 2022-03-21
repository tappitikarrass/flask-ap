from flask import (Blueprint, jsonify)
from flask_jwt_extended import jwt_required
from mal import Anime

from models.schemas import AnimeSchema

bp_anime = Blueprint(name="bp_anime", import_name=__name__)

class AnimeObj():
    def __init__(self, mal_id, title, score, genres, duration, rating, image_url):
        self.mal_id = mal_id
        self.title = title
        self.score = score
        self.genres = genres
        self.duration = duration
        self.rating = rating
        self.image_url = image_url

@bp_anime.route("/anime/<int:mal_id>", methods=["GET"])
@jwt_required()
def anime_by_id(mal_id):
    anime = Anime(mal_id)
    anime_obj = AnimeObj(mal_id=anime.mal_id,
                         title=anime.title,
                         score=anime.score,
                         genres=anime.genres,
                         duration=anime.duration,
                         rating=anime.rating,
                         image_url=anime.image_url)
    return jsonify(AnimeSchema().dump(anime_obj)), 200
