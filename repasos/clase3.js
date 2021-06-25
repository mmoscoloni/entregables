// funcion

function mostrar(params) {
    console.log(params)
}

// funcion dentro de variable

const richard = function(richard) {
    console.log(richard)
}

// nueva declaracion de funciones

const variable = (params) => {
    console.log(params)
}

//funciones de un solo parametro 

const variable2 = params => {
    console.log(params)
}

// return implicito 

const var3 = params => console.log(params)

// return implicito ejemplo 2 

const promediar = (a, b) => (a + b) / 2
const p = promediar(4, 8)

console.log(p) 

// funciones como parametros

const ejecutar = unaFuncion => unaFuncion()
const saludar = () => console.log('saludos')
ejecutar(saludar)

// CALLBACkS



mostrar("hola")
richard("123")
variable("variable")
variable2("variable2")
var3("var3")