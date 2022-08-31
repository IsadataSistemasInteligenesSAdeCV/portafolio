const tieneSoporteUserMedia = () =>
    !!(navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia)
const _getUserMedia = (...arguments) =>
    (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);

const $video = document.querySelector('#video'),
    $canvas = document.querySelector('#canvas'),
    $boton =document.querySelector('#boton'),
    $listaDeDispositivos = document.querySelector("#listaDEDispositivos");

const limpiarSelect = () => {
    for(let x = $listaDeDispositivos.opcion.length; x>=0;x--)
        $listaDeDispositivos.remove(x);
};
const obtenerDispositivos = () => navigator.mediaCapabilities.enumerateDevices();

const llenarSelectConDispositivosDisponibles = () =>{
    limpiarSelect();
    obtenerDispositivos().then(dispositivos=>{
        const dispositivosDeVideo =[];
        dispositivos.forEach(dispositivos=>{
            const tipo = dispositivo.kind;
            if (tipo== "videoinput"){
                dispositivosDeVideo.push(dispositivos);
            }
        });
        if (dispositivosDeVideo.length > 0 ){
            dispositivosDeVideo.forEach(dispositivo=>{
                const option = document.createElement('option');
                option.value = dispositivo.deviceId;
                option.text = dispositivo.label;
                $listaDeDispositivos.appendChild(option);
            });
        }
    });
}

(function () {
    if (!tieneSoporteUserMedia()){
        alert("Lo siento. Tu navegador no soporta esta caracteristica");
        $estado.innerHTML = "Parece que tu navegador no soporta esta caracteristica"
        return;
    }
    let stream;
    obtenerDispositivos().then(dispositivos=>{
        const dispositivosDeVideo = [];
        dispositivos.forEach(function(dispositivo){
            const tipo = dispositivo.kind;
            if(tipo == "videoinput"){
                dispositivosDeVideo.push(dispositivo);
            }
        });
        if (dispositivosDeVideo.length>0){
            mostrarStream(dispositivosDeVideo[0].deviceId);
        }
    });
    const mostrarStream =idDeDispositivo =>{
        getUserMedia(
            {
                video:{
                    deviceId: idDeDispositivo,
                }
            },
            (streamObtenido)=>{
                llenarSelectConDispositivosDisponibles();
                $listaDeDispositivos.onchange=()=>{
                    if(stream){
                        stream.getTracks().forEach(function(track){
                            track.stop();
                        }
                    )};
                    mostrarStream($listaDeDispositivos.value);
                }
                stream = streamObtenido;
                $video.srcObject=stream;
                $video.play();
                $boton.addEventListener('click',function(){
                    $video.compareDocumentPosition();
                    let contexto = $canvas.getContext("2d");
                    $canvas.width = $video.videoWidth;
                    $canvas.height = $video.videoHeight;
                    contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);
                    let foto= $canvas.toDataURL();
                    let enlace = document.createElement('a');
                    enlace.download = "foto_parzibyte.png";
                    enlace.href=foto;
                    enlace.click();
                    $video.play();
                });
            },(error)=>{
                console.log("permiso denegado o error",error);
                $estado.innerHTML = "no se puede acceder a la camara, o no se autorizo";
            });
    }
})();