<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran_Offline extends Model
{
    use HasFactory;

    protected $table = 'pendaftaran_samsat';
    protected $primaryKey = 'id';
    protected $fillable = ['wajib_pajak_id','jadwal_id','kode_pendaftaran','status_antrian','tgl_pendaftaran','tipe_pendaftaran'];
}
