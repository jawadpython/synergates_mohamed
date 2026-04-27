#!/usr/bin/env python3
"""
Serves the static website and handles GET/POST for button positions (api/positions.php).
Run from the project root:  python server.py
Then open:  http://localhost:8000/
"""

import json
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
POSITIONS_FILE = os.path.join(DATA_DIR, 'positions.json')
API_PATHS = ('/api/positions.php', '/api/positions')


def read_positions():
    if not os.path.isfile(POSITIONS_FILE):
        return {}
    try:
        with open(POSITIONS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return {}


def write_positions(data):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(POSITIONS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.split('?')[0] in API_PATHS:
            self.send_positions(read_positions())
            return
        super().do_GET()

    def do_POST(self):
        if self.path.split('?')[0] in API_PATHS:
            self.save_positions()
            return
        self.send_error(405, 'Method Not Allowed')

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

    def send_positions(self, data):
        self.send_json(data)

    def save_positions(self):
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length <= 0:
            self.send_json({'ok': False, 'error': 'Invalid body'}, 400)
            return
        try:
            body = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(body)
        except (json.JSONDecodeError, ValueError) as e:
            self.send_json({'ok': False, 'error': 'Invalid JSON'}, 400)
            return
        scenario = data.get('scenario') or ''
        scenario = ''.join(c for c in scenario.lower() if c.isalnum() or c == '-')
        positions = data.get('positions')
        if not scenario or not isinstance(positions, list):
            self.send_json({'ok': False, 'error': 'Need "scenario" and "positions" array'}, 400)
            return
        out = []
        for p in positions:
            left = float(p.get('left', 0)) if isinstance(p, dict) else 0
            top = float(p.get('top', 0)) if isinstance(p, dict) else 0
            out.append({'left': left, 'top': top})
        all_data = read_positions()
        all_data[scenario] = out
        try:
            write_positions(all_data)
        except OSError as e:
            self.send_json({'ok': False, 'error': 'Could not write file. Ensure data/ is writable.'}, 500)
            return
        self.send_json({'ok': True})


if __name__ == '__main__':
    port = 8000
    server = HTTPServer(('', port), Handler)
    print('Serving at http://localhost:{}/  (positions API: GET/POST {} )'.format(port, API_PATHS[0]))
    server.serve_forever()
