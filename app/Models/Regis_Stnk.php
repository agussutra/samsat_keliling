<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regis_Stnk extends Model
{
    use HasFactory;

    protected $table = 'stnk';
    protected $primaryKey = 'id';
    protected $fillable = ['plat_kendaraan', 'tipe_kendaraan', 'no_stnk', 'masa_berlaku', 'id_user'];

    public function getMasaBerlakuAttribute($value)
    {
        return date('d/m/Y', strtotime($value)); // reformating date when retrieving it
    }
}
