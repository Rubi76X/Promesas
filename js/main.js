let div = document.getElementById("divData");
let mainProds = document.getElementById("mainProductos");
let check1 = document.getElementById("customCheck1");
let check2 = document.getElementById("customCheck2");
let check3 = document.getElementById("customCheck3");
let check4 = document.getElementById("customCheck4");

check1.addEventListener("click", filtrar);  //se manda a llamar la funcion en caso de que el checkbox se active
check2.addEventListener("click", filtrar);
check3.addEventListener("click", filtrar);
check4.addEventListener("click", filtrar);
    //event.target.value      //hace automatica la busqueda del checkbox, si se le da clic al check1 se trae ese valor y asi con los demas
  
    function filtrar(event){
        console.log(event.target.value)
    let elementos = Array.from(document.getElementsByClassName(event.target.value));    //no se puede hacer un for en una coleccion por lo que se hace una conversion con Array.from
    elementos.forEach((e) =>{
        if(event.target.checked){   //si esta precionado se va a mostrar el display
            e.style.display="block";
        }else{
            e.style.display="none";
        }
    });
    }






window.addEventListener("load", function(){//evento cada vez que cargue la pagina
    getData();
});

const getData = () =>{
    let promesa = fetch ("https://fakestoreapi.com/products/",{
        method : "GET"
    });   
    promesa.then((response) =>{
        response.json().then( (data) => {
            console.log(data);
            console.log(typeof(data));
            data.forEach(producto => {
                mainProds.innerHTML += `<div class=" ${getClassCategory(producto.category)} all card col-xs-1 col-sm-1 col-md-3 col-lg-3 col-xl-3 m-4" style="width: 18rem;">
                <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
                <div class="card-body">
                  <h5 class="card-title">${producto.title}</h5>
                  <p class="card-text">${producto.category}</p>
                  <p class="card-text">${producto.description.slice(0, 100)}</p>    
                  <p class="card-text text-rigth"><strong>$ ${producto.price}</strong></p>

                  <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_${producto.id}">
                    <i class="bi bi-eye-fill"></i> Ver mas
                    </button>
                    
                </div>
              </div>
              
            <!-- Modal -->
            <div class="modal fade" id="modal_${producto.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${producto.title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ${producto.description}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
            </div>
`;
            });
        }).catch((error)=>{     
            console.log("Problema con el formato de la respuesta");
        });
    }).catch((error)=>{
        console.log("Error en la solicitud" + error);
    });
} //get data

function getClassCategory(cat){ //funcion para hacer los filtros
    let c = "";
    switch(cat){    //cat se le va asignarla categoria y basado en ello se le va asignar
        case "men's clothing":
            c = "mens";
            break;
        case "women's clothing":
            c = "women";
            break;
        case "jewelery":
            c = "jew";
            break;
        case "electronics":
            c = "elec";
            break;
        default:
            c = "all";
            break;
    }
    return c;
}

//slice(0, 100) para cortar los caracteres de la descripcion

//modal es una tarjeta para mostrar mas informacion de las tarjetas

//para que cambia la informacion de cada modal, se le cambia el id data-target="#modal_${producto.id}
//del boton, ya que es el unico identificador de cada producto diferente

//para que s evea la informacion en cada modal debe ser el mismo id en el modal pero son el "#"

//<i class="bi bi-eye-fill">    se pone el icono, para poner iconeos se debe poner el link de CDN

//${getClassCategory(producto.category)} se pone en innerHTML para mandar a traer la funcion de los filtros
