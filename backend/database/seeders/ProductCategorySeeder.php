<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductCategory;
use Carbon\Carbon;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $data = [
            [
                'product_id' => 1,
                'category_id' => 1,
            ],
            [
                'product_id' => 2,
                'category_id' => 1,
            ],
            [
                'product_id' => 3,
                'category_id' => 1,
            ],
            [
                'product_id' => 4,
                'category_id' => 2,
            ],
            [
                'product_id' => 5,
                'category_id' => 2,
            ],
            [
                'product_id' => 6,
                'category_id' => 2,
            ],
            [
                'product_id' => 7,
                'category_id' => 1,
            ],
            [
                'product_id' => 9,
                'category_id' => 3,
            ],
            [
                'product_id' => 13,
                'category_id' => 4,
            ],
            [
                'product_id' => 14,
                'category_id' => 4,
            ],
        ];
        $news = [];
        foreach($data as $item){
            $now = Carbon::now()->format('Y-m-d H:i:s');
            $new = new ProductCategory();
            $new->product_id = $item['product_id'];
            $new->category_id = $item['category_id'];
            $new->created_at = $now;
            $new->updated_at = $now;
            $news[] = $new->attributesToArray();
        }
        ProductCategory::insert($news);
    }
}
