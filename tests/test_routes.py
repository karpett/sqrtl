from app import app


def test_public_pages_render():
    client = app.test_client()
    for path in ["/", "/gallery", "/collections", "/things/calendar", "/things/split", "/about"]:
        response = client.get(path)
        assert response.status_code == 200, path


def test_shared_redirects_to_calendar():
    response = app.test_client().get("/shared")
    assert response.status_code == 302
    assert response.headers["Location"].endswith("/things/calendar")


def test_health_check():
    response = app.test_client().get("/health")
    assert response.get_json() == {"status": "ok"}
