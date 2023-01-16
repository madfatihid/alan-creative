<?php

namespace Database\Seeders;

use App\Models\Block;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlockSeeder extends Seeder
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
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => 2,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => 3,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => null,
                'category_id' => 1,
                'discount_id' => null,
            ],
            [
                'product_id' => 4,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => 5,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => 6,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => null,
                'category_id' => 2,
                'discount_id' => null,
            ],
            [
                'product_id' => 7,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => 8,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => 9,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => null,
                'category_id' => 3,
                'discount_id' => null,
            ],
            [
                'product_id' => 10,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => 11,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => 12,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => null,
                'category_id' => 4,
                'discount_id' => null,
            ],
            [
                'product_id' => 13,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => 14,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => 15,
                'category_id' => null,
                'discount_id' => null,
            ],
            [
                'product_id' => null,
                'category_id' => null,
                'discount_id' => 1,
            ],
        ];
        $news = [];
        foreach ($data as $item) {
            $now = Carbon::now()->format('Y-m-d H:i:s');
            $new = new Block();
            $new->product_id = $item['product_id'];
            $new->category_id = $item['category_id'];
            $new->discount_id = $item['discount_id'];
            $new->created_at = $now;
            $new->updated_at = $now;
            $news[] = $new->attributesToArray();
        }
        Block::insert($news);
    }
}
