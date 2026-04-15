# Button Positions Config

The file `positions.json` stores default button positions for solution-detail diagram pages. These are used when the site runs on a server (where localStorage is empty) so your arranged button layout is preserved.

**Why?** localStorage is origin-specific. Positions saved when opening the file locally (`file://`) don't exist when viewing on a server (`http://yourserver.com`).

**To add your arranged positions:**
1. Open the solution page locally (e.g. `solution-detail.html?scenario=apartments`)
2. Arrange the buttons as you want
3. Open browser console (F12) and run:
   ```js
   localStorage.getItem('apartments-diagram-positions')
   ```
4. Copy the output and add it to `positions.json` under the `apartments` key (parse the JSON and format it)

For other scenarios (e.g. conference-rooms), use `scenario-section-positions-{scenario}` and add as array format.
