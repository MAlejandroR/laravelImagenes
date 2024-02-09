import React, {useState} from 'react';

export default function Main() {
    //imagen seleccionada
    const [selectedFile, setSelectedFile]=useState(null);
    //imagen submit
    const[imageUrl, setImageUrl]=useState('');

    const handleFileChange=(event)=>{
        console.log("cambiando el file "+event.target.files[0].name);
        setSelectedFile(event.target.files[0])
    }


    const subirImagen=async (event)=>{
        event.preventDefault();
        if (!selectedFile){
            alert ("Seleccione una imagen");
            return
        }

        //Recojo los datos del formulario preparándolos para la subida
        const formData = new FormData();
        formData.append('image', selectedFile);
        const config= {
            headers:{
                'Content-Type':"multipart/form-data"
            }

        };

        try{
            const response =  await  axios.post("/subir_imagen",
                formData,
                config);
            setImageUrl(response.data.url);
            console.log(`Imagen ${imageUrl}`);
            alert(`Imagen ${imageUrl}`);
        }
        catch(error){
            alert (`se ha producido un error ${error}`)
        }


    }

    return(
        <>
            <form action="">

                <input onChange={handleFileChange} type="file" name="imagen" id=""/>
                <button onClick={subirImagen}>Subir imagen</button>
                {imageUrl && <img src={imageUrl} alt="img"/>}
            </form>
        </>
    )

}


