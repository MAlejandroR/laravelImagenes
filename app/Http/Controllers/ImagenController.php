<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagenController extends Controller
{
    public function subir_imagen(Request $request){
        // Verifica si la solicitud tiene un archivo con el nombre 'image'
        if ($request->hasFile('image')) {
            // Obtiene el archivo de la solicitud

            $file = $request->file('image');
//            info ("Datos del fichero $request");

            // Genera un nombre único para el archivo
//            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $filename = $file->getClientOriginalName();
//            $filename.=$file->getClientOriginalExtension();


            // Guarda el archivo en el disco público
            // Esto creará un archivo en storage/app/public y generará un enlace simbólico en public/storage
            $path = $file->storeAs('images', $filename, 'public');

            // Genera una URL accesible al archivo
            $url = asset("storage/images/".$filename);
//            $url = Storage::disk('public')->url($path);
            info ("Url -$url-");

            // Retorna una respuesta con la URL de la imagen
            return response()->json(['url' => $url]);
        }

        // Si no se encontró un archivo, retorna un error
        return response()->json(['error' => 'No se encontró el archivo de imagen.'], 422);

    }
    //
}
