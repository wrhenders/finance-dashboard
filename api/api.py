import os
import requests
from dotenv import load_dotenv
from get_time import get_timestamp
import flask as Flask
from flask import jsonify

load_dotenv(dotenv_path="./.env.local")
FRED_KEY = os.environ.get("FRED_KEY", "")
FINNHUB_KEY = os.environ.get("FINNHUB_KEY", "")
TD_KEY = os.environ.get("TD_KEY", "")
POLY_KEY = os.environ.get("POLY_KEY", "")

app = Flask.Flask(__name__)


@app.route("/api/current/<stock>")
def get_current_data(stock):
    td_response = requests.get(
        f"https://api.tdameritrade.com/v1/marketdata/{stock}/quotes",
        params={"apikey": TD_KEY},
    ).json()
    return {
        "prevClose": td_response[stock]["closePrice"],
        "current": td_response[stock]["lastPrice"],
    }


@app.route("/api/news/<stock>")
def get_news_data(stock):
    today = get_timestamp("today")
    five_days_ago = get_timestamp("five_days_ago")
    payload = {
        "token": FINNHUB_KEY,
        "symbol": stock,
        "from": five_days_ago,
        "to": today,
    }
    fh_response = requests.get(
        f"https://finnhub.io/api/v1/company-news",
        params=payload,
    ).json()
    # processed_news = {}
    # for index, item in fh_response:
    #     processed_news[index]["headline"] = item["headline"]
    return jsonify(fh_response[:10])


@app.route("/api/candle/<stock>")
def get_candle_data(stock):
    open_timestamp = get_timestamp("open")
    close_timestamp = get_timestamp("close")
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
    poly_response = requests.get(
        f"https://api.polygon.io/v2/aggs/ticker/{stock}/prev",
        params={"apiKey": POLY_KEY},
    ).json()

    processed_values = {}
    processed_values["timestamp"] = fh_response["t"]
    processed_values["open"] = fh_response["o"]
    processed_values["close"] = fh_response["c"]
    processed_values["high"] = fh_response["h"]
    processed_values["low"] = fh_response["l"]
    processed_values["initial"] = poly_response["results"][0]["c"]
    return processed_values


@app.route("/api/candle/crypto/<symbol>")
def get_candle_crypto_data(symbol):
    am_timestamp = get_timestamp("am")
    pm_timestamp = get_timestamp("pm")
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
    last_month = get_timestamp("last_month")

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
