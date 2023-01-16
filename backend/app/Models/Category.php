<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function products()
    {
        // return $this->hasMany(ProductCategory::class);
        return $this->hasManyThrough(
            Product::class, // the related model
            ProductCategory::class, // the pivot model
            'category_id', // the current model id in the pivot
            'id', // the id of related model
            'id', // the id of current model
            'product_id' // the related model id in the pivot
        );
    }
}
