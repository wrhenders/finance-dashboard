from datetime import datetime, timedelta
import pytz

def get_timestamp(type):
    return {
        "five_days_ago": (datetime.now(pytz.timezone('US/Central')) - timedelta(days=5)).strftime("%Y-%m-%d"),
        "today": datetime.now(pytz.timezone('US/Central')).strftime("%Y-%m-%d"),
        "last_month": (datetime.now(pytz.timezone('US/Central')) - timedelta(days=30)).strftime("%Y-%m-%d"),
        "open": int(
            round(
                datetime.now(pytz.timezone('US/Central'))
                .replace(hour=8, minute=30, second=0, microsecond=0)
                .timestamp()
            )
        ),
        "close": int(
            round(
                datetime.now(pytz.timezone('US/Central'))
                .replace(hour=15, minute=0, second=0, microsecond=0)
                .timestamp()
            )
        ),
        "am": int(
            round(
                datetime.now(pytz.timezone('US/Central'))
                .replace(hour=0, minute=0, second=1, microsecond=0)
                .timestamp()
            )
        ),
        "pm": int(
            round(
                datetime.now(pytz.timezone('US/Central'))
                .replace(hour=23, minute=59, second=59, microsecond=0)
                .timestamp()
            )
        ),
        "yesterday_close": int(
            round(
                (datetime.now(pytz.timezone('US/Central')) - timedelta(days=1))
                .replace(hour=15, minute=0, second=0, microsecond=0)
                .timestamp()
            )
        ),
        "yesterday_open": int(
            round(
                (datetime.now(pytz.timezone('US/Central')) - timedelta(days=1))
                .replace(hour=8, minute=30, second=0, microsecond=0)
                .timestamp()
            )
        ),
    }.get(type, "Not Found")
