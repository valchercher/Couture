<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class ImageController extends Controller
{
    /**
     * Show the form for creating the resource.
     */
    public function create(): never
    {
        abort(404);
    }

    /**
     * Store the newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|mimes:jpeg,jpg,png'
        ]);
    
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $type = $file->getClientOriginalExtension();
            $data = file_get_contents($file);
            $image = 'data:image/' . $type . ';base64,' . base64_encode($data);
    
            // Décodage
            $folder = "app/images";
            $image_parts = explode(";base64,", $image);
            $image_type_aux = explode('image/', $image_parts[0]);
            $image_type = $image_type_aux[1];
            $file_path = $folder . "/This_is_base_64_".time().".". $image_type;
           $file= file_put_contents(storage_path($file_path),base64_decode($image_parts[1]));
    
            return response()->json([$file_path]);
        }
        // // abort(404);
        // $request->validate([
        //     'image'=>'required|mimes:jpeg,jpg,png'
        // ]);
        // if($request->hasFile('image'))
        // {
        //     $path=public_path().'/Capture d’écran du 2023-03-07 21-14-52.png';
        //     $type=pathinfo($path,PATHINFO_EXTENSION);
        //     $data=file_get_contents($path);
        //     $image='data:image/'.$type.';base64,'.base64_encode($data);
        //     //   decodage;
        //     $folder="public/images";
        //     $image_parts=explode(";base64",$image);
        //     $image_type_aux=explode('image',$image_parts[0]);
        //     $image_type=base64_decode($image_parts[1]);
        //     $file=$folder."This_is_base_64_decode_image.png";
        //     file_put_contents($file,$image_parts);
        //     return response()->json([$image,$image_type]);









            // $destination='public/images';
            // $image=$request->file('image');
            // $image_name=$image->getClientOriginalName();
            // $path=$request->file('image')->storeAs($destination,$image_name);
            // $base64Image = base64_encode($image_name);
            // $base64= base64_decode($base64Image);
            
            // $img=$request->image;
            // $image_parts = explode(";base64,", $img);
            // $image_type_aux = explode("image/", $image_parts[0]);
            // $destination='images';
            // $path='/images';
            // // $image_type = $image_type_aux[1];
            // $image_en_base64 = base64_encode($img);
            // $file = $destination . uniqid() . '.png';
            //  $pathr=$request->file('image')->storeAs($path,$file);
           
            // file_put_contents($file, $image_en_base64);
        // }
        // return [$img,$image_parts,$image_type_aux,$image_en_base64,$file];
    }

    /**
     * Display the resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy(): never
    {
        abort(404);
    }
}
