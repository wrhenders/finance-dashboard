# from random import randrange
from optparse import Values
import os
import requests
from dotenv import load_dotenv
from datetime import datetime, timedelta

import flask as flask

load_dotenv(dotenv_path="./.env.local")
FRED_KEY = os.environ.get("FRED_KEY", "")

last_month = (datetime.today() - timedelta(30)).strftime("%Y-%m-%d")

app = flask.Flask(__name__)

# @app.route("/api/chart_data")
# def getChartData():
#     array = list(map(lambda x: {"x": x, "y": randrange(20)}, range(10)))
#     return jsonify(array)


@app.route("/api/FRED")
def get_FRED_data():

    one_month = "DGS1MO"
    three_month = "DGS3MO"
    six_month = "DGS6MO"
    one_year = "DGS1"
    two_year = "DGS2"
    five_year = "DGS5"
    ten_year = "DGS10"
    twenty_year = "DGS20"
    thirty_year = "DGS30"
    yields = [
        one_month,
        three_month,
        six_month,
        one_year,
        two_year,
        five_year,
        ten_year,
        twenty_year,
        thirty_year,
    ]
    values = {}

    for i in yields:
        payload = {
            "series_id": i,
            "api_key": FRED_KEY,
            "file_type": "json",
            "limit": 30,
            "observation_start": last_month,
        }
        response = requests.get(
            "https://api.stlouisfed.org/fred/series/observations",
            params=payload,
        ).json()["observations"]
        values[i] = response[-1]["value"]
        values[i + "_old"] = response[0]["value"]

    return values

    # for i in yields:
    #     payload = {
    #         "series_id": i,
    #         "api_key": FRED_KEY,
    #         "file_type": "json",
    #         "limit": 5,
    #         "observation_start": last_month,
    #     }
    #     response = requests.get(
    #         "https://api.stlouisfed.org/fred/series/observations",
    #         params=payload,
    #     ).json()
    #     values.append(response)

    # return values
