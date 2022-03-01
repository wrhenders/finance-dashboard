import os
import requests
from dotenv import load_dotenv
from datetime import datetime, timedelta
import json
import flask as Flask

load_dotenv(dotenv_path="./.env.local")
FRED_KEY = os.environ.get("FRED_KEY", "")
FINNHUB_KEY = os.environ.get("FINNHUB_KEY", "")
TD_KEY = os.environ.get("TD_KEY", "")

last_month = (datetime.today() - timedelta(30)).strftime("%Y-%m-%d")
open_timestamp = int(
    round(
        datetime.now().replace(hour=8, minute=30, second=0, microsecond=0).timestamp()
    )
)
close_timestamp = int(
    round(
        datetime.now().replace(hour=15, minute=0, second=0, microsecond=0).timestamp()
    )
)
am_timestamp = int(
    round(datetime.now().replace(hour=0, minute=0, second=1, microsecond=0).timestamp())
)
pm_timestamp = int(
    round(
        datetime.now().replace(hour=23, minute=59, second=59, microsecond=0).timestamp()
    )
)

app = Flask.Flask(__name__)


@app.route("/api/FH/<stock>")
def get_FH_data(stock):
    payload = {
        "token": FINNHUB_KEY,
        "symbol": stock,
        "resolution": 5,
        "from": open_timestamp,
        "to": close_timestamp,
    }
    fh_response = requests.get(
        f"https://finnhub.io/api/v1/stock/candle",
        params=payload,
    ).json()
    td_response = requests.get(
        f"https://api.tdameritrade.com/v1/marketdata/quotes",
        params={"apikey": TD_KEY, "symbol": stock},
    ).json()

    processed_values = {}
    processed_values["timestamp"] = fh_response["t"]
    processed_values["open"] = fh_response["o"]
    processed_values["close"] = fh_response["c"]
    processed_values["high"] = fh_response["h"]
    processed_values["low"] = fh_response["l"]
    processed_values["initial"] = td_response[stock]["openPrice"]
    return processed_values


@app.route("/api/FH/crypto/<symbol>")
def get_FH_crypto_data(symbol):
    payload = {
        "token": FINNHUB_KEY,
        "symbol": f"COINBASE:{symbol}-USD",
        "resolution": 5,
        "from": am_timestamp,
        "to": pm_timestamp,
    }
    fh_response = requests.get(
        f"https://finnhub.io/api/v1/crypto/candle",
        params=payload,
    ).json()
    processed_values = {}
    processed_values["timestamp"] = fh_response["t"]
    processed_values["open"] = fh_response["o"]
    processed_values["close"] = fh_response["c"]
    processed_values["high"] = fh_response["h"]
    processed_values["low"] = fh_response["l"]
    processed_values["initial"] = fh_response["o"][0]
    return processed_values


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
