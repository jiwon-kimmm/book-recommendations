# PagePilot

PagePilot guides your reading journey by providing book recommendations based on readers with similar reading preferences.

## Setup

```bash
# backend
cd backend
# set up virtual environment
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# prepare database, only have to do on first setup
python db.py
# run backend
python app.py
```
```bash
# frontend
cd book-rec-app
npm run dev
```
