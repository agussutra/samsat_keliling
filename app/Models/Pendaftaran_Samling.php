<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran_Samling extends Model
{
    use HasFactory;

    protected $table = 'pendaftaran_samsat';
    protected $primaryKey = 'id';
    protected $fillable = ['jadwal_id', 'kode_pendaftaran', 'status_antrian', 'tgl_pendaftaran', 'tipe_pendaftaran'];

    public function detail()
    {
        return $this->hasMany(Pendaftaran_detail::class, 'id_pendaftaran', 'id');
    }
}
