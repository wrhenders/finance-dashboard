import os
import requests
from dotenv import load_dotenv
from datetime import datetime, timedelta

import flask as flask

load_dotenv(dotenv_path="./.env.local")
FRED_KEY = os.environ.get("FRED_KEY", "")
FINNHUB_KEY = os.environ.get("FINNHUB_KEY", "")

last_month = (datetime.today() - timedelta(30)).strftime("%Y-%m-%d")
morn_timestamp = int(
    round(datetime.now().replace(hour=8, minute=0, second=0, microsecond=0).timestamp())
)
close_timestamp = int(
    round(
        datetime.now().replace(hour=15, minute=0, second=0, microsecond=0).timestamp()
    )
)

app = flask.Flask(__name__)


@app.route("/api/FH/<stock>")
def get_TD_data(stock):
    payload = {
        "token": FINNHUB_KEY,
        "symbol": stock,
        "resolution": 5,
        "from": morn_timestamp,
        "to": close_timestamp,
    }
    response = requests.get(
        f"https://finnhub.io/api/v1/stock/candle",
        params=payload,
    ).json()
    return response


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
