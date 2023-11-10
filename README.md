To simulate prod:

- Start backend using `python server.py`
- Start frontend using `npm run build` and `serve -s build`

"http://kubernetes.docker.internal:8000" in frontend\src\index.js may need to be replaced depending on machine