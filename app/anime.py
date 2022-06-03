from flask import (Blueprint, jsonify)
from flask_jwt_extended import jwt_required
from mal import client
from mal.enums import Field
from datetime import timedelta

from models.schemas import AnimeSchema

bp_anime = Blueprint(name="bp_anime", import_name=__name__)

class AnimeObj():
    def __init__(self, mal_id, title, media_type, num_episodes, score, genres, duration, synopsis, rating, image_url):
        self.mal_id = mal_id
        self.title = title
        self.media_type = media_type
        self.num_episodes = num_episodes
        self.score = score
        self.genres = genres
        self.duration = duration
        self.synopsis = synopsis
        self.rating = rating
        self.image_url = image_url

@bp_anime.route("/anime/<int:mal_id>", methods=["GET"])
# @jwt_required()
def anime_by_id(mal_id):
    cli = client.Client("dd3d06bb7ea0c6b43eb65b7e1dd7a286");
    cli.anime_fields = Field.all_anime();

    anime = cli.get_anime(mal_id)
    
    anime_obj = AnimeObj(mal_id=mal_id,
                         title=anime.title,
                         media_type=str.upper(str(anime.media_type)),
                         num_episodes=anime.num_episodes,
                         score=anime.mean,
                         genres=anime.genres,
                         duration=timedelta(seconds=anime.average_episode_duration),
                         synopsis=anime.synopsis,
                         rating=str.upper(anime.rating),
                         image_url=anime.main_picture_url)
    return jsonify(AnimeSchema().dump(anime_obj)), 200

# @bp_anime.route("/hello", methods=["GET"])
# def hello():
#     return jsonify("hello"), 200
