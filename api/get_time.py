from datetime import datetime, timedelta


def get_timestamp(type):
    return {
        "five_days_ago": (datetime.today() - timedelta(5)).strftime("%Y-%m-%d"),
        "today": datetime.today().strftime("%Y-%m-%d"),
        "last_month": (datetime.today() - timedelta(30)).strftime("%Y-%m-%d"),
        "open": int(
            round(
                datetime.now()
                .replace(hour=8, minute=30, second=0, microsecond=0)
                .timestamp()
            )
        ),
        "close": int(
            round(
                datetime.now()
                .replace(hour=15, minute=0, second=0, microsecond=0)
                .timestamp()
            )
        ),
        "am": int(
            round(
                datetime.now()
                .replace(hour=0, minute=0, second=1, microsecond=0)
                .timestamp()
            )
        ),
        "pm": int(
            round(
                datetime.now()
                .replace(hour=23, minute=59, second=59, microsecond=0)
                .timestamp()
            )
        ),
        "yesterday_close": int(
            round(
                (datetime.today() - timedelta(1))
                .replace(hour=15, minute=0, second=0, microsecond=0)
                .timestamp()
            )
        ),
        "yesterday_open": int(
            round(
                (datetime.today() - timedelta(1))
                .replace(hour=8, minute=30, second=0, microsecond=0)
                .timestamp()
            )
        ),
    }.get(type, "Not Found")
