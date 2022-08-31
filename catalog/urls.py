from django.urls import  path
from . import views

urlpatterns = [
    path('',views.home, name='home'),
    path('repositorio/farmacia',views.farmacia,name="farmacia"),
    path('repositorio/pasteleria',views.pasteleria,name="pasteleria"),
    path('repositorio/pasteleria/catalogoPasteleria',views.catalogoPasteleria,name="catalogoPasteleria"),
    path('repositorio/pasteleria/cotizacion',views.cotizacion,name="cotizacion"),
    path('repositorio/desbloqueo',views.desbloqueo,name="desbloqueo"),
    path('repositorio/credenciales',views.credenciales,name="credenciales"),
    path('repositorio/credenciales/crear',views.crearCredencial,name="crearCredencial"),
    path('repositorio/credenciales/leerCrendencial',views.leerCredencial,name="leerCredencial"),
]