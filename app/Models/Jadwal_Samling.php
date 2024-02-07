<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal_Samling extends Model
{
    use HasFactory;

    protected $table = 'jadwal_pajak';
    protected $primaryKey = 'id';
    protected $fillable = ['tgl_samling','jam_samling','info_samling','lokasi_samling'];

    public function pendaftaran_offline()
    {
        return $this->hasMany(Pendaftaran_Offline::class);
    }
}
