
var app = new Vue({
    el: '#app',
    data: {
    contador: 1,
    audio:true,
    disabledBoton:false,
    Ty:0,
    Tx:0,
    Tr:0,
    resultadoTr:[]   
    },
    created:function() {
        this.audio = document.getElementById("beep");
        window.addEventListener('keyup', this.keyboardEvent);
        
    },
    beforeDestroy:function() {
        window.removeEventListener('keyup', this.keyboardEvent);

    },
    methods:{
        iniciar:function(){
            this.disabledBoton = true;
            this.iniciarJuego();
        },
        keyboardEvent:function(event){
            if(event.keyCode === 32 && this.resultadoTr.length  < 10){
                var ahora = new Date();
                var milisegundos = ahora.getMilliseconds();
                this.Ty = milisegundos;
                this.Tr = Math.abs(this.Ty - this.Tx);
                this.resultadoTr.push(this.Tr);
            }
            
        },
        iniciarJuego:function(){
          
            this.audio.play();
            this.audio.loop = true;
            var ahora = new Date();
            var milisegundos = ahora.getMilliseconds();
            this.Tx = milisegundos;
            
        }, 
        crearCsv:function(){
            var datos = Array.from(this.resultadoTr);
            var csv = '';
            datos.forEach(function(row) {
                csv += row + ',';
                csv += "\n";
            });
     
        console.log(csv);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'tiempos-audio-tr.csv';
        hiddenElement.click();
        }
    },
    watch:{
        resultadoTr: function (val) {
            if(this.resultadoTr.length == 10){
                this.audio.loop = false;
                this.audio.pause();
                return;
            }
        }
    }
});
