from waitress import serve
    
from backend.wsgi import application
    
if __name__ == '__main__':
    serve(application, listen='localhost:8000')