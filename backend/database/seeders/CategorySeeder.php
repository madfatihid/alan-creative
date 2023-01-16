<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Carbon\Carbon;

class CategorySeeder extends Seeder
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
                'name' => 'Cumi & Kerang'
            ],
            [
                'name' => 'Sayuran'
            ],
            [
                'name' => 'Ikan'
            ],
            [
                'name' => 'Minuman'
            ],
        ];
        $news = [];
        foreach ($data as $item) {
            $now = Carbon::now()->format('Y-m-d H:i:s');
            $new = new Category();
            $new->name = $item['name'];
            $new->created_at = $now;
            $new->updated_at = $now;
            $news[] = $new->attributesToArray();
        }
        Category::insert($news);
    }
}
