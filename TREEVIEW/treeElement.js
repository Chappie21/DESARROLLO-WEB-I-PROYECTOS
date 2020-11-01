class TreeElement extends HTMLElement{

    constructor(){
        super();/*CONSTRUCTOR DE CLASE PADRE (HTMLElement)*/

        //ATRIBUTOS DEL WEBCOMPONENT

        this.lista;/*LISTA BASE*/
        this.select = "black"; /*SELECCINADO PREDETERMIANDO*/
        this.noselect = "black"; /* NO SELECCINADO PREDETERMIANDO*/
        this.treeEvent = "true";/* DEFINE SI CREAR EL EVENTO O NO*/
    }

    static get observedAttributes(){
        return ['select','noselect','treevent'];
    }

    attributeChangedCallback(att, viejo, nuevo){
         /*CASOS PARA LOS DIFERENTES ATRIBUTOS POSIBLES DEL ELEMENTO*/
         switch(att){
            case "select":
                this.select= nuevo;
            break;

            case "noselect":
                this.noselect = nuevo;
            break;

            case "treevent":
                this.treeEvent = nuevo;
            break;
        }
    }

    connectedCallback(){

        this.style.color = this.noselect;/*COLOCA UN COLOR DE TEXTO PREDETERMNADO AL NO SELECCIONAR*/

       //PROCESO DE CREADO DE ARBOL
       
        if(objeto.Hijos.length !=0){

            this.appendChild(this.lista = document.createElement("ul"));/*SE CREA LA LISTA*/

            //INICIA LA CONSTRUCCION DEL ARBOL

            /*SE INGRESA EL ARRAY COMPLETO DE TODOS LOS ELEMENTOS DEL JSON Y
            UNA LISTA DE REFERENCIA DONDE AGREGAR LOS RESPECTIVOS ELEMENTOS*/
            this.CrearNodo(objeto.Hijos, this.lista);
        }
        
    }

    /*CONSTRUCCION DEL ARBOL*/
    CrearNodo(hijo_padre, raiz){

        for(let i in hijo_padre){
            if(hijo_padre[i].Hijos != 0){

                let content = document.createElement("li"); /*SE CREA UN ELEMNTO DE LISTA "li"*/
                content.style.fontStyle = "oblique";/*ESTILO CURVO*/
                content.innerHTML = `<strong> ${hijo_padre[i].Nombre} </strong>`;/*SE AÑADE NOMBRE DE CARPETA*/
                
                let nuevaraiz = document.createElement("ul");/*SE CREA UNA NUEVA LITSA "nuevaraiz"*/

                /*SE AGREGAN LOS ELEMENTOS DENTRO DEL COMPONENTE EN EL RESPECTIVO DOM*/
                raiz.appendChild(content);
                raiz.appendChild(nuevaraiz);

                this.CrearNodo(hijo_padre[i].Hijos, nuevaraiz);/*SE LLAMA A LA FUNCION DE FORMA RECURSIVA*/
                
                /*EN CASO DE SER FALSE (EDITADO POR EL USUARIO YA QUE POR DEFECTO ES TRUE) NO SE GENERARÁ
                EL RESPECTIVO EVENTO*/
                if(this.treeEvent == "true"){
                    nuevaraiz.style.display = "none"; /*CERRAR LISTA*/
                    this.Eventos(content,nuevaraiz);/*SE CREAR EL EVENTO DE LA LISTA DESPLEGABLE*/
                }
                
            }else{

                let content = document.createElement("li");
                content.innerHTML = `${hijo_padre[i].Nombre}`;

                raiz.appendChild(content);/*SE AÑADE ELEMENTO A LA LITSA RAIZ*/
            }
        }

    }

    /*DEFINIR EVENTO PARA ELEMENTOS QUE CONTIENEN UN "ul"*/
    Eventos(padre,eventolista){

        let presionado = true;
        padre.onclick = () =>{
            
            //SI ES TRUE GUARDA LA LISTA, SI NO, LA DESPLIEGA
            if(presionado){
                eventolista.style.display = "none";
                padre.style.color = this.noselect;
                presionado = false;
            }else{
                eventolista.style.display = "block";
                padre.style.color = this.select;
                presionado = true;
            }

        }
    }
}

//DEFINIR EL WEBCOMPONENTE COMO CUSTOMELEMENT Y SU NOMBRE DE ETIQUETA
window.customElements.define("tree-element", TreeElement);

/*******************************************************************************************************************************/

/*ARBOL TREEVIEW EN JSON*/
var objeto = {
    "Hijos": [
        {
        "Nombre": "Carpeta 1",
        "Hijos": [
            {
                "Nombre": ".dist",
                "Hijos": [
                    {
                        "Nombre": "Datos",
                        "Hijos": [
                            {
                                "Nombre": "humano.txt",
                                "Hijos": []
                            },
                            {
                                "Nombre": "poder.txt",
                                "Hijos": []
                            }
                        ]
                    }
                ]
            },
            {
                "Nombre": "Nuevo archivo word",
                "Hijos": []
            },
            {
                "Nombre": "Clase.pdf",
                "Hijos": []
            },
            {
                "Nombre": "Videos",
                "Hijos": [
                    {
                        "Nombre": "HolasoyGerman.mp4",
                        "Hijos": []
                    },
                    {
                        "Nombre": "Dross-Juega-Give-up.mp4",
                        "Hijos": []
                    },
                    {
                        "Nombre": "El_best_Challenge.mp4",
                        "Hijos": []
                    }
                ]
            },
            {
                "Nombre": "100_años_de_soledad.pdf",
                "Hijos": []
            },
            {
                "Nombre": "Proyectos",
                "Hijos": [
                    {
                        "Nombre": "Treeview-WEB I",
                        "Hijos": [
                            {
                                "Nombre": "Cuerpo.html",
                                "Hijos":[]
                            },
                            {
                                "Nombre": "codigo.js",
                                "Hijos": []
                            }
                        ]
                    }
                ]
            }
        ]
        },
        {
            "Nombre": "Carpeta 2",
            "Hijos": [
                {
                    "Nombre": "La casa.mp3",
                    "Hijos":[]
                },
                {
                    "Nombre": "Tareas de Universidad",
                    "Hijos":[
                        {
                            "Nombre": "Informe_deWindows.pdf",
                            "Hijos": []
                        }
                    ]
                }
            ]
        },
        {
            "Nombre": "URU",
            "Hijos": [
                {
                    "Nombre": "Pago-de-inscripcion-2020C.jpg",
                    "Hijos": []
                },
                {
                    "Nombre": "Horarios",
                    "Hijos":[
                        {
                            "Nombre": "PRIMER_TRIMESTRE.jpg",
                            "Hijos": []
                        },
                        {
                            "Nombre": "SEGUNDO_TRIMESTRE.jpg",
                            "Hijos": []
                        },
                        {
                            "Nombre": "SEPTIMO_TRIMESTRE.jpg",
                            "Hijos": []
                        }
                    ]
                }
            ]
        }
    ]
};

