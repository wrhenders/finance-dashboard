import os
from flask_cors import CORS
import requests
from dotenv import load_dotenv
from get_time import get_timestamp
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request, send_from_directory
import yfinance as yf

load_dotenv(dotenv_path="./.env.local")
FRED_KEY = os.environ.get("FRED_KEY", "")
FINNHUB_KEY = os.environ.get("FINNHUB_KEY", "")
TD_KEY = os.environ.get("TD_KEY", "")
DATABASE_KEY = os.environ.get("DATABASE_KEY", "")
DATABASE_URL = os.environ.get('DATABASE_URL').replace("://", "ql://", 1)

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)

ENV = "prod"

if ENV == "dev":
    app.debug = True
    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = f"postgresql://postgres:{DATABASE_KEY}@localhost/tickers"
else:
    app.debug = False
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class TickerList(db.Model):
    __tablename__ = "stocklist"
    id = db.Column(db.Integer, primary_key=True)
    stock = db.Column(db.String(4))
    crypto = db.Column(db.String(4))

    def __init__(self, stock, crypto):
        self.stock = stock
        self.crypto = crypto

    def serialize(self):
        return {"stock": self.stock, "crypto": self.crypto}

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/api/submit", methods=["POST"])
def submit():
    if request.method == "POST":
        req = request.json
        ticker = req["symbol"]
        crypto = req["crypto"]
        if crypto:
            if (
                db.session.query(TickerList).filter(TickerList.crypto == ticker).count()
                == 0
            ):
                data = TickerList("NULL", ticker)
                db.session.add(data)
                db.session.commit()
        else:
            if (
                db.session.query(TickerList).filter(TickerList.stock == ticker).count()
                == 0
            ):
                data = TickerList(ticker, "NULL")
                db.session.add(data)
                db.session.commit()
        return request.json


@app.route("/api/delete", methods=["POST"])
def delete():
    if request.method == "POST":
        req = request.json
        ticker = req["symbol"]
        crypto = req["crypto"]
        if crypto:
            TickerList.query.filter(TickerList.crypto == ticker).delete()
        else:
            TickerList.query.filter(TickerList.stock == ticker).delete()
        db.session.commit()
        return request.json


@app.route("/api/get-list/")
def get_list():
    try:
        list = TickerList.query.all()
        stocks = []
        crypto = []
        for e in list:
            if e.stock != "NULL":
                stocks.append(e.stock)
            if e.crypto != "NULL":
                crypto.append(e.crypto)
        return {"stocks": stocks, "crypto": crypto}
    except Exception as e:
        return str(e)


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


@app.route("/api/info/<stock>")
def get_info(stock):
    ticker = yf.Ticker(stock)
    return {"name": ticker.info["longName"]}


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
    return jsonify(fh_response[:10])


@app.route("/api/candle/<stock>")
def get_candle_data(stock):
    open_timestamp = get_timestamp("open")
    close_timestamp = get_timestamp("close")
    yesterdays_open = get_timestamp("yesterday_open")
    yesterdays_close = get_timestamp("yesterday_close")
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

    if "error" in fh_response.keys() or "s" in fh_response.keys():
        payload = {
            "token": FINNHUB_KEY,
            "symbol": stock,
            "resolution": 5,
            "from": yesterdays_open,
            "to": yesterdays_close,
        }
        fh_response = requests.get(
            f"https://finnhub.io/api/v1/stock/candle",
            params=payload,
        ).json()

    td_response = requests.get(
        f"https://api.tdameritrade.com/v1/marketdata/{stock}/quotes",
        params={"apikey": TD_KEY},
    ).json()

    processed_values = {}
    processed_values["timestamp"] = fh_response["t"]
    processed_values["open"] = fh_response["o"]
    processed_values["close"] = fh_response["c"]
    processed_values["high"] = fh_response["h"]
    processed_values["low"] = fh_response["l"]
    processed_values["initial"] = td_response[stock]["closePrice"]
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
