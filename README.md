To simulate prod:

- Build pip dependencies using `pip install -r requirements.txt`
- Start backend using `python backend/server.py`

"http://kubernetes.docker.internal:8000" in frontend\src\index.js may need to be replaced depending on where backend is hosted

- Build frontend dependencies using `npm install`
- Start frontend using `npm run build` and `serve -s build`