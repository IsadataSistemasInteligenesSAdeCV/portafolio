from django.http import StreamingHttpResponse
from django.shortcuts import redirect, render
from django.views.decorators import gzip
import cv2 as cv
import threading
from io import BytesIO 
import qrcode 
import qrcode.image.svg 


class videoCamera(object):
    def __init__(self):
        self.video = cv.VideoCapture(0)
        (self.grabbed, self.frame)=self.video.read()
        threading.Thread(target=self.update, args=()).start()

    def __del__(self):
        self.video.release()
        
    def get_frame(self):
        image = self.frame
        _,jpeg = cv.imencode('.jpg', image)
        return jpeg.tobytes()

    def update(self):
       (self.grabbed, self.frame)=self.video.read()

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield(b'--frame\r\n'
        b'Content-Type: image/jpeg\r\n\r\n'+frame+b'\r\n\r\n')

def home(request):
    return render(request, 'panel/home.html',{})

def farmacia(request):
    return render(request,'farmacia/farmacia.html')

def pasteleria(request):
    return render(request, 'pasteleria/pasteleria.html')

@gzip.gzip_page
def desbloqueo(request):
    """try:
        cam=videoCamera()
        return StreamingHttpResponse(gen(cam), content_type="multipart/x-mixed-replace;boundary=frame")
    except:
        pass"""
    return render(request, 'desbloqueo/desbloqueo.html')

def catalogoPasteleria(request):
    return render(request, 'pasteleria/catalogoPasteleria.html')

def cotizacion(request):
    total =0
    if request.method == "POST":
        try:
            tipo = int(request.POST.get("tipo"))
            kg = int(request.POST.get("kg"))
            if tipo == 1:
                total=150*kg
            elif tipo == 2:
                total=180*kg
            elif tipo == 3:
                total = 200*kg
            else:
                total= 230*kg
            
        except:
            
            total="error"    
    return render(request,'pasteleria/cotizacion.html',{'total':"$"+str(total)+"MX"})

def credenciales(request):
    return render(request,'credenciales/credenciales.html')

def crearCredencial(request):
    data = {}
    if request.method == "POST":
        factory = qrcode.image.svg.SvgImage
        text = str(request.POST.get("nombre"))+":"+str(request.POST.get("matricula"))+":"+str(request.POST.get("drone"))
        img = qrcode.make(text, image_factory=factory, box_size=20)
        
        stream = BytesIO()
        img.save(stream)
        img.save("qr.png")
        data["svg"] = stream.getvalue().decode()
    return render(request,'credenciales/crearCredencial.html',data)

def leerCredencial(request):
    return render(request,'credenciales/leerCredencial.html')