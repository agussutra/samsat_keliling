<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran_detail extends Model
{
    use HasFactory;

    protected $table = 'pendaftaran_samsat_detail';
    protected $primaryKey = 'id';
    protected $fillable = ['id_user','id_pendaftaran','id_stnk'];
}
