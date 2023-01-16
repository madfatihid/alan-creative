<?php

namespace Database\Seeders;

use App\Models\Discount;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DiscountSeeder extends Seeder
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
                'name' => 'Happy Hour',
                'percentage' => '10'
            ],
        ];
        $news = [];
        foreach ($data as $item) {
            $now = Carbon::now()->format('Y-m-d H:i:s');
            $new = new Discount();
            $new->name = $item['name'];
            $new->percentage = $item['percentage'];
            $new->created_at = $now;
            $new->updated_at = $now;
            $news[] = $new->attributesToArray();
        }
        Discount::insert($news);
    }
}
