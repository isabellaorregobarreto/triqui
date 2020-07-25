<template>
  <div id="app" class="">
    <audio v-if="gano == 'X' || (gano == 'O' && twoplayers)" autoplay src="/win.mp3"></audio>
    <audio v-if="gano == '-' || (gano == 'O' && !twoplayers)" autoplay src="/sad.mp3"></audio>
    <audio ref="click" src="/click.mp3"></audio>
    <div class="min-h-screen flex flex-col items-center justify-center text-6xl text-blue-700 cursor-pointer bg-cover bg-bottom" style="background-image: url('/fondo.jpg');">
      <div v-if="!jugar" class="text-pink-600 mb-20 font-serif -mt-20">Triqui!!</div>
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__zoomInDown"
        leave-active-class="animate__animated animate__zoomOutDown"
        >
        <div v-if="gano != ''" class="absolute text-blue-500 h-full flex flex-col items-center justify-center w-full font-serif text-7xl">
          <div class="px-32 py-16 bg-contain bg-no-repeat bg-center flex flex-col items-center text-center leading-none" style="background-image: url('/mensaje.png');">
            <div v-if="gano == 'X' || (gano == 'O' && twoplayers)"><img src="./assets/star.png" class="h-24 -mb-4"></div>
            <div v-if="gano == '-' || (gano == 'O' && !twoplayers)"><img src="./assets/sad.png" class="h-24 -mb-4"></div>
            <div v-if="gano == 'X' || (gano == 'O' && twoplayers)" class="text-blue-400">Ganó</div>
            <div v-if="gano == 'O' && !twoplayers" class="text-blue-400">Perdiste</div>
            <div v-if="gano == 'X'" class="text-4xl mb-4">{{ jugador1 }}!!!</div>
            <div v-else-if="gano == 'O' && twoplayers" class="text-4xl mb-4">{{ jugador2 }}!!!</div>
            <div v-else-if="gano == '-'">Empate</div>
            <a @click="reiniciar()" class="w-64 flex items-center font-sans text-4xl bg-blue-400 text-white px-2 py-1 rounded-full border-4 border-blue-500 hover:opacity-50">
              <img src="./assets/reload.png" class="h-16">
              Reiniciar
            </a>
          </div>
        </div>
      </transition>
      <div v-if="jugar">
        <div class="fixed top-0 right-0 mr-10 mt-10 flex justify-end">
          <a @click="reiniciar()"><img src="./assets/cerrar.png" class="h-12"></a>  
        </div>
        <div class="flex justify-center">
          <div class="w-48 h-48 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(1, valores[1])">
            <img v-if="valores[1] == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="valores[1] == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 border-pink-400 border-dashed border-l-4 border-r-4 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(2,valores[2])">
            <img v-if="valores[2] == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="valores[2] == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 flex items-center justify-center hover:bg-pink-200" @click="ponerTurno(3,valores[3])">
            <img v-if="valores[3] == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="valores[3] == 'O'" src="./assets/o.svg" class="h-20">          
          </div>
        </div>
        <div class="flex justify-center">
          <div class="w-48 h-48 border-pink-400 border-dashed border-t-4 border-b-4 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(4, valores[4])">
            <img v-if="valores[4] == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="valores[4] == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 border-blue-400 border-dashed border-4 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(5,valores[5])">
            <img v-if="valores[5] == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="valores[5] == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 border-pink-400 border-dashed border-t-4 border-b-4 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(6,valores[6])">
            <img v-if="valores[6] == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="valores[6] == 'O'" src="./assets/o.svg" class="h-20">
          </div>
        </div>
        <div class="flex justify-center">
          <div class="w-48 h-48 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(7,valores[7])">
            <img v-if="valores[7] == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="valores[7] == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 border-pink-400 border-dashed border-l-4 border-r-4 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(8,valores[8])">
            <img v-if="valores[8]== 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="valores[8] == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(9,valores[9])">
            <img v-if="valores[9] == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="valores[9] == 'O'" src="./assets/o.svg" class="h-20">
          </div>
        </div>  
      </div>
      <div v-else class="flex flex-col items-center justify-center h-full">
        <div class="flex items-center justify-center text-base text-pink-500">
          <span class="px-2">1 Jugador</span>
          <span @click="twoplayers = !twoplayers" role="checkbox" tabindex="0" aria-checked="false" class=" relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline" :class="twoplayers?'bg-blue-400':'bg-blue-400'">
            <span aria-hidden="true" :class="twoplayers?'translate-x-5':'translate-x-0'" class="inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"></span>
          </span>
          <span class="px-2">2 Jugadores</span>
        </div>
        <div class="mb-0-4">
          <input class="text-3xl rounded-full px-4 py-2 text-black" type="text" v-model="jugador1" placeholder="Nombre del jugador 1" autocomplete="off">
        </div>
        <div v-if="twoplayers" class="my-10">
          <input class="text-3xl rounded-full px-4 py-2 text-black" type="text" v-model="jugador2" placeholder="Nombre del jugador 2" autocomplete="off">
        </div>
        <div v-else class="my-10 flex items-center justify-evenly text-xl h-24">
          <span class="mr-4">Nivel </span>
          <a @click="nivel=1" :class="nivel == 1?'bg-blue-500':'bg-blue-400'" class="mx-2 rounded-full text-white cursor-pointer p-2 h-8 w-8 flex items-center justify-center">1</a>
          <a @click="nivel=2" :class="nivel == 2?'bg-blue-500':'bg-blue-400'" class="mx-2 rounded-full text-white cursor-pointer p-2 h-8 w-8 flex items-center justify-center">2</a>
          <a @click="nivel=3" :class="nivel == 3?'bg-blue-500':'bg-blue-400'" class="mx-2 rounded-full text-white cursor-pointer p-2 h-8 w-8 flex items-center justify-center">3</a>
          <a @click="nivel=4" :class="nivel == 4?'bg-blue-500':'bg-blue-400'" class="mx-2 rounded-full text-white cursor-pointer p-2 h-8 w-8 flex items-center justify-center">4</a>
        </div>
        <a v-if="(twoplayers == false && jugador1) || (twoplayers == true && jugador1 && jugador2) " @click="jugar=true" class="my-10 bg-blue-400 text-white text-4xl px-4 py-2 rounded-full border-4 border-blue-500 hover:opacity-50">Jugar</a>
        <a v-else class="cursor-not-allowed my-10 bg-gray-400 text-white text-4xl px-4 py-2 rounded-full border-4 border-gray-500 hover:opacity-50">Jugar</a>
      </div>
      <div class="text-xl mt-10">El jugador {{ jugador1 ? jugador1 : 1}} empieza co la X</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
      valores:{
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: ''
      },
      turno: 'X',
      gano:'',
      jugar: false,
      jugador1:'',
      jugador2:'',
      twoplayers:true,
      nivel:1,
      click_sonido:''

    }),
  mounted(){
   this.click_sonido = this.$refs.click
  },
  methods:{
    ponerTurno(numero, valor){
      if (!this.gano) {
        if(valor == ''){

          this.valores[numero] = this.turno

          if(this.turno == 'X') this.turno = 'O'
          else this.turno = 'X'

          this.click_sonido.play()
        }
        this.revisarSiGano()
        if(this.gano== '' && this.turno == 'O' && this.twoplayers == false){
          setTimeout(function(){
           this.jugarComputador(this.nivel) 
          }.bind(this),2000)
        }
      }
  

    },
    revisarSiGano(){
      if(this.valores[1] != ''){
        if(this.valores[1] == this.valores[2] && this.valores[1] == this.valores[3]) this.gano = this.valores[1]
        else if (this.valores[1] == this.valores[4] && this.valores[1] == this.valores[7]) this.gano = this.valores[1]
        else if (this.valores[1] == this.valores[5] && this.valores[1] == this.valores[9]) this.gano = this.valores[1]
      }
      if(this.gano == '' && this.valores[2] != ''){
        if(this.valores[2] == this.valores[5] && this.valores[2] == this.valores[8]) this.gano = this.valores[2]
      }
      if(this.gano == '' && this.valores[3] != ''){
        if(this.valores[3] == this.valores[6] && this.valores[3] == this.valores[9]) this.gano = this.valores[3]
        else if (this.valores[3] == this.valores[5] && this.valores[3] == this.valores[7]) this.gano = this.valores[3]
      }
      if(this.gano == '' && this.valores[4] != ''){
          if(this.valores[4] == this.valores[5] && this.valores[4] == this.valores[6]) this.gano = this.valores[4]
      } 
      if(this.gano == '' && this.valores[7] != ''){
          if(this.valores[7] == this.valores[8] && this.valores[7] == this.valores[9]) this.gano = this.valores[7]
      }

      if(this.gano == '' && this.valores[1] != '' && this.valores[2] != '' && this.valores[3] != '' && this.valores[4] != '' && this.valores[5] != '' && this.valores[6] != '' && this.valores[7] != '' && this.valores[8] != '' && this.valores[9] != '')this.gano = '-'
    },
    reiniciar(){
      this.jugar = false
      this.gano = ''
      for (var contador = 1; contador <= 9; contador++) {
        this.valores[contador] = ''
      }

      this.turno='X'
    },
    jugarComputador(nive){
      if(nive == 1){
        for (var contador = 1; contador <= 9; contador++) {
          if (this.valores[contador] == '') {
            this.valores[contador] = 'O'
            this.click_sonido.play()
            this.turno = 'X'
            this.revisarSiGano()
            break;
          }
        }  
      } else if(nive == 2){
        let posicion = 0
        if(this.valores[5] == '') posicion = 5
        else if(this.valores[1] == '')posicion = 1
        else if(this.valores[3] == '')posicion = 3
        else if(this.valores[7] == '')posicion = 7
        else if(this.valores[9] == '')posicion = 9
        else if(this.valores[2] == '')posicion = 2
        else if(this.valores[4] == '')posicion = 4
        else if(this.valores[6] == '')posicion = 6
        else if(this.valores[8] == '')posicion = 8
        this.valores[posicion] = 'O'
        this.click_sonido.play()
        this.turno = 'X'
        this.revisarSiGano()
      } else if (nive == 3) {
        let resultado = this.revisarLineaX(1,2,3)
        if(resultado == 0) resultado = this.revisarLineaX(4,5,6)
        if(resultado == 0) resultado = this.revisarLineaX(7,8,9)
        if(resultado == 0) resultado = this.revisarLineaX(1,4,7)
        if(resultado == 0) resultado = this.revisarLineaX(2,5,8)
        if(resultado == 0) resultado = this.revisarLineaX(3,6,9)
        if(resultado == 0) resultado = this.revisarLineaX(1,5,9)
        if(resultado == 0) resultado = this.revisarLineaX(3,5,7)
        if(resultado > 0) {
          this.valores[resultado] = 'O'
          this.click_sonido.play()
          this.turno = 'X'
          this.revisarSiGano()
        } else {
          this.jugarComputador(2)  
        }
        
      } else {
        let resultado = this.revisarLineaO(1,2,3)
        if(resultado == 0) resultado = this.revisarLineaO(4,5,6)
        if(resultado == 0) resultado = this.revisarLineaO(7,8,9)
        if(resultado == 0) resultado = this.revisarLineaO(1,4,7)
        if(resultado == 0) resultado = this.revisarLineaO(2,5,8)
        if(resultado == 0) resultado = this.revisarLineaO(3,6,9)
        if(resultado == 0) resultado = this.revisarLineaO(1,5,9)
        if(resultado == 0) resultado = this.revisarLineaO(3,5,7)
        if(resultado > 0) {
          this.valores[resultado] = 'O'
          this.click_sonido.play()
          this.turno = 'X'
          this.revisarSiGano()
        } else {
          resultado = this.revisarLineaX(1,2,3)
          if(resultado == 0) resultado = this.revisarLineaX(4,5,6)
          if(resultado == 0) resultado = this.revisarLineaX(7,8,9)
          if(resultado == 0) resultado = this.revisarLineaX(1,4,7)
          if(resultado == 0) resultado = this.revisarLineaX(2,5,8)
          if(resultado == 0) resultado = this.revisarLineaX(3,6,9)
          if(resultado == 0) resultado = this.revisarLineaX(1,5,9)
          if(resultado == 0) resultado = this.revisarLineaX(3,5,7)
          if(resultado > 0) {
            this.valores[resultado] = 'O'
            this.click_sonido.play()
            this.turno = 'X'
            this.revisarSiGano()
          } else {
            resultado = this.revisarLineaDisponible(4,5,6)
            if(resultado == 0) resultado = this.revisarLineaDisponible(1,5,9)
            if(resultado == 0) resultado = this.revisarLineaDisponible(3,5,7)
            if(resultado == 0) resultado = this.revisarLineaDisponible(1,2,3)
            
            if(resultado == 0) resultado = this.revisarLineaDisponible(7,8,9)
            if(resultado == 0) resultado = this.revisarLineaDisponible(1,4,7)
            if(resultado == 0) resultado = this.revisarLineaDisponible(2,5,8)
            if(resultado == 0) resultado = this.revisarLineaDisponible(3,6,9)
            if(resultado > 0) {
              this.valores[resultado] = 'O'
              this.click_sonido.play()
              this.turno = 'X'
              this.revisarSiGano()
            } else {
              this.jugarComputador(2)
            }
          } 
        }
        
      }
    },
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    revisarLineaX(pos1,pos2,pos3){
      if (this.valores[pos1] == 'O' || this.valores[pos2] == 'O' || this.valores[pos3] == 'O') return 0
      if(this.valores[pos1] == '' && this.valores[pos2] == '') return 0
      if(this.valores[pos1] == '' && this.valores[pos3] == '') return 0
      if(this.valores[pos2] == '' && this.valores[pos3] == '') return 0 
      if(this.valores[pos1] == this.valores[pos2]) return pos3
      if(this.valores[pos1] == this.valores[pos3]) return pos2
      if(this.valores[pos2] == this.valores[pos3]) return pos1

    },
  revisarLineaO(pos1,pos2,pos3){
      if (this.valores[pos1] == 'X' || this.valores[pos2] == 'X' || this.valores[pos3] == 'X') return 0
      if(this.valores[pos1] == '' && this.valores[pos2] == '') return 0
      if(this.valores[pos1] == '' && this.valores[pos3] == '') return 0
      if(this.valores[pos2] == '' && this.valores[pos3] == '') return 0 
      if(this.valores[pos1] == this.valores[pos2]) return pos3
      if(this.valores[pos1] == this.valores[pos3]) return pos2
      if(this.valores[pos2] == this.valores[pos3]) return pos1

    },
  revisarLineaDisponible(pos1,pos2,pos3){
      if (this.valores[pos1] == 'O' && this.valores[pos2] == '' && this.valores[pos3] == '') return (pos2 == 5?pos2:pos3)
      if (this.valores[pos1] == '' && this.valores[pos2] == 'O' && this.valores[pos3] == '') return pos1
      if (this.valores[pos1] == '' && this.valores[pos2] == '' && this.valores[pos3] == 'O') return (pos2 == 5?pos2:pos1)
      return 0
    }
  }
}
</script>
