<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wajib_pajak extends Model
{
    use HasFactory;

    protected $table = 'wajib_pajak';
    protected $primaryKey = 'id';
    protected $fillable = ['nama','alamat','no_tlp','plat_kendaraan','tipe_kendaraan','no_stnk','masa_berlaku'];
}
