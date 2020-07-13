<template>
  <div id="app" class="">
    <audio v-if="gano == 'X' || gano == 'O'" autoplay src="/win.mp3"></audio>
    <audio ref="click" src="/click.mp3"></audio>
    <div class="min-h-screen flex flex-col items-center justify-center text-6xl text-blue-700 cursor-pointer bg-cover bg-bottom" style="background-image: url('/fondo.jpg');">
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__zoomInDown"
        leave-active-class="animate__animated animate__zoomOutDown"
        >
        <div v-if="gano != ''" class="absolute text-blue-500 h-full flex flex-col items-center justify-center w-full font-serif text-7xl">
          <div class="px-32 py-16 bg-contain bg-no-repeat bg-center flex flex-col items-center text-center leading-none" style="background-image: url('/mensaje.png');">
            <div v-if="gano == 'X' || gano == 'O'"><img src="./assets/star.png" class="h-24 -mb-4"></div>
            <div v-if="gano == 'X' || gano == 'O'" class="text-blue-400">Ganó</div>
            <div v-if="gano == 'X'" class="text-4xl mb-4">{{ jugador1 }}!!!</div>
            <div v-else-if="gano == 'O'" class="text-4xl mb-4">{{ jugador2 }}!!!</div>
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
          <div class="w-48 h-48 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(1,variable1)">
            <img v-if="variable1 == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="variable1 == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 border-pink-400 border-dashed border-l-4 border-r-4 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(2,variable2)">
            <img v-if="variable2 == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="variable2 == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 flex items-center justify-center hover:bg-pink-200" @click="ponerTurno(3,variable3)">
            <img v-if="variable3 == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="variable3 == 'O'" src="./assets/o.svg" class="h-20">          
          </div>
        </div>
        <div class="flex justify-center">
          <div class="w-48 h-48 border-pink-400 border-dashed border-t-4 border-b-4 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(4,variable4)">
            <img v-if="variable4 == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="variable4 == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 border-blue-400 border-dashed border-4 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(5,variable5)">
            <img v-if="variable5 == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="variable5 == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 border-pink-400 border-dashed border-t-4 border-b-4 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(6,variable6)">
            <img v-if="variable6 == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="variable6 == 'O'" src="./assets/o.svg" class="h-20">
          </div>
        </div>
        <div class="flex justify-center">
          <div class="w-48 h-48 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(7,variable7)">
            <img v-if="variable7 == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="variable7 == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 border-pink-400 border-dashed border-l-4 border-r-4 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(8,variable8)">
            <img v-if="variable8 == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="variable8 == 'O'" src="./assets/o.svg" class="h-20">
          </div>
          <div class="w-48 h-48 flex justify-center items-center hover:bg-pink-200" @click="ponerTurno(9,variable9)">
            <img v-if="variable9 == 'X'" src="./assets/x.svg" class="h-20">
            <img v-if="variable9 == 'O'" src="./assets/o.svg" class="h-20">
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
        <a v-if="jugador1 && jugador2" @click="jugar=true" class="my-10 bg-blue-400 text-white text-4xl px-4 py-2 rounded-full border-4 border-blue-500 hover:opacity-50">Jugar</a>
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
      variable1: '',
      variable2: '',
      variable3: '',
      variable4: '',
      variable5: '', 
      variable6: '',
      variable7: '',
      variable8: '',
      variable9: '',
      turno: 'X',
      gano:'',
      jugar: false,
      jugador1:'',
      jugador2:'',
      click:false,
      twoplayers:false,
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
          if(numero == 1)this.variable1 = this.turno
          else if(numero == 2)this.variable2 = this.turno
          else if(numero == 3)this.variable3 = this.turno
          else if(numero == 4)this.variable4 = this.turno
          else if(numero == 5)this.variable5 = this.turno
          else if(numero == 6)this.variable6 = this.turno
          else if(numero == 7)this.variable7 = this.turno
          else if(numero == 8)this.variable8 = this.turno
          else if(numero == 9)this.variable9 = this.turno
          if(this.turno == 'X') this.turno = 'O'
          else this.turno = 'X'

          this.click_sonido.play()
        }
        this.revisarSiGano()
      }
  

    },
    revisarSiGano(){
      if(this.variable1 != '' && this.variable1 == this.variable2 && this.variable1 == this.variable3)this.gano = this.variable1
      else if(this.variable4 != '' && this.variable4 == this.variable5 && this.variable4 == this.variable6)this.gano = this.variable4
      else if(this.variable7 != '' && this.variable7 == this.variable8 && this.variable7 == this.variable9)this.gano = this.variable7
      else if(this.variable1 != '' && this.variable1 == this.variable4 && this.variable1 == this.variable7)this.gano = this.variable1
      else if(this.variable2 != '' && this.variable2 == this.variable5 && this.variable2 == this.variable8)this.gano = this.variable2
      else if(this.variable3 != '' && this.variable3 == this.variable6 && this.variable3 == this.variable9)this.gano = this.variable3
      else if(this.variable1 != '' && this.variable1 == this.variable5 && this.variable1 == this.variable9)this.gano = this.variable1
      else if(this.variable3 != '' && this.variable3 == this.variable5 && this.variable3 == this.variable7)this.gano = this.variable3
      else if(this.variable1 != '' && this.variable2 != '' && this.variable3 != '' && this.variable4 != '' && this.variable5 != '' && this.variable6 != '' && this.variable7 != '' && this.variable8 != '' && this.variable9 != '')this.gano = '-'
    },
    reiniciar(){
      this.jugar = false
      this.gano = ''
      this.variable1 = ''
      this.variable2 = ''
      this.variable3 = ''
      this.variable4 = ''
      this.variable5 = ''
      this.variable6 = ''
      this.variable7 = ''
      this.variable8 = ''
      this.variable9 = ''
    this.turno='X'}
  }
}
</script>
