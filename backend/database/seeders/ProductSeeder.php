<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use Carbon\Carbon;

class ProductSeeder extends Seeder
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
                'name' => 'Cumi Tepung',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Cumi Bakar',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Cumi Cabe Goreng',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Cah Kailan',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Tahu Goreng',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Cah Taoge',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Kerang Bambu',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Kepiting Padang',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Gurame Asam',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Udang Bakar',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Udang Saos',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Udang Mayo',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Iced Tea',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Es Jeruk Nipis',
                'price' => random_int(10, 99) * 1000
            ],
            [
                'name' => 'Nasi Putih',
                'price' => random_int(10, 99) * 1000
            ],
        ];
        $news = [];
        foreach($data as $item){
            $now = Carbon::now()->format('Y-m-d H:i:s');
            $new = new Product();
            $new->name = $item['name'];
            $new->price = $item['price'];
            $new->created_at = $now;
            $new->updated_at = $now;
            $news[] = $new->attributesToArray();
        }
        Product::insert($news);
    }
}
