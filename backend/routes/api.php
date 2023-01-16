<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Models\Block;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Product;
use App\Models\ProductCategory;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\File;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('products')->group(function () {
    //get
    Route::get('/', function () {
        return Product::all();
    });
    //get specific
    Route::get('/{id}', function ($id) {
        return Product::find($id);
    });
    //create new
    Route::post('/', function (Request $request) {

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $ext = $file->extension();
            $file->storeAs('public/image/', $product->id . '.' . $ext);
            // return redirect('/uploadfile');
        }
        return 1;
    });
    //update
    Route::post('/{id}', function (Request $request, $id) {
        Product::where('id', $id)
            ->update([
                'name' => $request->name,
                'price' => $request->price
            ]);

        if ($request->hasFile('image')) {

            $pathToFile = storage_path('/app/public/image/' . $id . '.png');
            if (file_exists($pathToFile)) File::delete($pathToFile);
            $pathToFile = storage_path('/app/public/image/' . $id . '.jpg');
            if (file_exists($pathToFile)) File::delete($pathToFile);
            $pathToFile = storage_path('/app/public/image/' . $id . '.jpeg');
            if (file_exists($pathToFile)) File::delete($pathToFile);
            $pathToFile = storage_path('/app/public/image/' . $id . '.webp');
            if (file_exists($pathToFile)) File::delete($pathToFile);


            $file = $request->file('image');
            $ext = $file->extension();
            $file->storeAs('public/image/', $id . '.' . $ext);
            // return redirect('/uploadfile');
        }
        return 1;
    });
    //delete
    Route::delete('/{id}', function ($id) {
        return Product::destroy($id);
    });
});


Route::prefix('categories')->group(function () {
    //get
    Route::get('/', function () {
        return Category::with(['products'])->get();
    });
    //get specific
    Route::get('/{id}', function ($id) {
        return Category::with(['products'])->where('id', $id)->get();
    });
    //create new
    Route::post('/', function (Request $request) {
        return Category::create([
            'name' => $request->name
        ]);
    });
    //update
    Route::post('/{id}', function (Request $request, $id) {
        // $prodcuts = $request->products;
        Category::where('id', $id)
            ->update([
                'name' => $request->name
            ]);
        ProductCategory::where('category_id', $id)->delete();
        // settype($request->products, "array");
        foreach ($request->products as $product) {
            // ProductCategory::cr('category_id', $id)
            ProductCategory::create([
                'category_id' => $id,
                'product_id' => $product['id']
            ]);
        }
    });
    //delete
    Route::delete('/{id}', function ($id) {
        return Category::destroy($id);
    });
});


Route::prefix('blocks')->group(function () {
    //get
    Route::get('/', function () {
        //return Block::all();
        return Block::with(['product', 'category', 'discount'])->get();
    });
    //get specific
    Route::get('/{id}', function ($id) {
        return Block::find($id);
    });
    //create new
    Route::post('/', function () {
        // Matches The "/admin/users" URL
    });
    //update
    Route::post('/{id}', function (Request $request, $id) {
        // var_dump($request->all());
        $type_id = $request->input('id');
        $type = $request->input('type');
        return Block::where('id', $id)
            ->update([$type . '_id' => $type_id]);
    });
    //delete
    Route::delete('/{id}', function ($id) {
        return Block::where('id', $id)
            ->update(['product_id' => null, 'category_id' => null, 'discount_id' => null]);
    });
});


Route::prefix('discounts')->group(function () {
    //get
    Route::get('/', function () {
        return Discount::all();
    });
    //get specific
    Route::get('/{id}', function ($id) {
        return Discount::find($id);
    });
    //create new
    Route::post('/', function (Request $request) {
        return Discount::create([
            'name' => $request->name,
            'percentage' => $request->percentage
        ]);
    });
    //update
    Route::post('/{id}', function (Request $request, $id) {
        Discount::where('id', $id)
            ->update([
                'name' => $request->name,
                'percentage' => $request->percentage
            ]);
    });
    //delete
    Route::delete('/{id}', function ($id) {
        return Discount::destroy($id);
    });
});
