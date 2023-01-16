<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'price'];

    public function categories()
    {
        // return $this->hasMany(ProductCategory::class);
        return $this->hasManyThrough(
            Category::class, // the related model
            ProductCategory::class, // the pivot model
            'product_id', // the current model id in the pivot
            'id', // the id of related model
            'id', // the id of current model
            'category_id' // the related model id in the pivot
        );
    }
}
