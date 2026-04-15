# API – Button positions

When the site runs on an HTTP server, scenario button positions can be saved permanently so every visitor sees the same layout.

## Endpoint: `positions.php`

- **GET** – Returns all saved positions as JSON: `{ "scenario-id": [ { "left": 5, "top": 8 }, ... ], ... }`
- **POST** – Body: `{ "scenario": "hotels", "positions": [ { "left": 5, "top": 8 }, ... ] }`. Saves that scenario’s positions into `../data/positions.json`.

## Server requirements

1. PHP (e.g. 7.4+) with write access to the project folder.
2. The **`data/`** directory (next to `api/`) must exist and be **writable** by the web server.  
   Example (Linux): `mkdir data && chmod 755 data` and ensure the PHP process can write there (e.g. same user as the server, or `chown www-data:www-data data`).

If `data/` is missing, the script will try to create it. If saving fails, the frontend will show an error and you’ll need to fix permissions.
