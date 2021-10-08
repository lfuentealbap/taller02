import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import MaterialDatatable from "material-datatable";


const MiComponente = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [personas, setPersonas] = useState([])
    const [Id_persona, setID] = useState("")

    const handleInputChangeNombre = (event) => {
        //console.log(event.target.value)
        setNombre(event.target.value)
    }

    const handleInputChangeApellido = (event) => {
        //console.log(event.target.value)
        setApellido(event.target.value)

    }

    const enviarDatos = () => {
        // alert("Entro aqui")
        // console.log("Enviando datos nombre:"+nombre+" y apellido:"+apellido)
        console.log(`Enviando datos nombre:${nombre} y apellido:${apellido}`)

        guardarPersona();
     
     
        // let nuevo = {
        //     name: nombre,
        //     last: apellido
        // }
        // setPersonas(personas => [...personas, nuevo])
        // setNombre("")
        // setApellido("")
    }

    useEffect(()=>{

        getPersonas()
    },[])

    async function getPersonas() {
        try {
          const response = await axios.get('http://192.99.144.232:5000/api/personas?grupo=13');
          if(response.status === 200)
          {
            
            setPersonas(response.data.persona)
            console.log(response.data);

          }
         
        } catch (error) {
          console.error(error);
        }
      }
    
      function guardarPersona()
      {
        axios.post('http://192.99.144.232:5000/api/personas', {
            nombre: nombre,
            apellido: apellido,
            grupo:13
          })
          .then(function (response) {

                if(response.status===200)
                {
                    alert("Registro correcto")
                    getPersonas()

                }else{
                    alert("Error al guardar")
                }
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      const actualizarDatos = (Id_persona) => {
        console.log(Id_persona);
        axios.put(`http://192.99.144.232:5000/api/personas/${Id_persona}`, {
            nombre: nombre,
            apellido: apellido,
            grupo: 13
        })
        .then(function (response) {

            if (response.status === 200) {
                alert("Actualización correcta")
                getPersonas()

            } else {
                alert("Error al actualizar")
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    }

      const columns = [
        {
         name: "Nombre",
         field: "nombre",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "Apellido",
         field: "apellido",
         options: {
          filter: true,
          sort: true,
         }
        },
        
       ];
        
       /*const data = [
           {nombre: "Name 1", apellido: "Title 1"},
           {nombre: "Name 2", apellido: "Title 2"},
       ];
       let listaP = [{nombre:"", apellido:""}]
       datosP.persona.map((persona)=>(
        listaP.push(persona.nombre, persona.apellido) 
       ));*/
      
       const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData);
        document.getElementsByTagName("input").item(0).value = rowData.nombre
        document.getElementsByTagName("input").item(1).value = rowData.apellido
        setID(rowData._id)
    
       
    };

       const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected:true,
        onRowClick: handleRowClick
       };

       const handleInputCLean = () => {
        setNombre('');
        setApellido('');
        setID(0);
    }
    return (
        <Fragment>
            <h1>Formulario</h1>
            <div>
                <div>
                    <input type="text" placeholder="Nombre" name="nombre" onChange={handleInputChangeNombre} value={nombre} ></input>
                </div>

                <div>
                    <input type="text" placeholder="Apellido" name="apellido" onChange={handleInputChangeApellido} value={apellido}></input>
                </div>
                {
                    Id_persona ? <button onClick={()=> {actualizarDatos(Id_persona)}}> Modificar</button> :
                    <button onClick={enviarDatos}>Enviar</button>
                }
                <br/>
                
                <button onClick={handleInputCLean}>Limpiar</button>

                {/* <div className="users">
                    {personas.map((persona) => (
                 
                          <li>{persona.nombre} {persona.apellido}</li>
                    ))}
                </div> */}

            </div>
            <MaterialDatatable
  title={"Employee List"}
  data={personas}
  columns={columns}
  options={options}
/>

        </Fragment>

    )
}
export default MiComponente