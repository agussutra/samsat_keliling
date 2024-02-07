<?php

namespace App\Http\Controllers;

use App\Http\Traits\MasterCRUD;
use App\Models\Jadwal_Samling;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class JadwalSamlingController extends Controller
{

    use MasterCRUD;

    public function __construct()
    { 
        $this->setModel(\App\Models\Jadwal_Samling::class);
        $this->setValidationRule([
             'tgl_samling' => ['required'],
             'jam_samling' => ['required'],
             'info_samling' => ['required', 'max:100'],
             'lokasi_samling' => ['required', 'max:50'],
        ]);

        $this->setValidationRuleMassage([
            'tgl_samling.required' => 'Tanggal Samling Harus Diisi', 
            'jam_samling.required' => 'Jam Samling Harus Diisi', 
            'info_samling.required' => 'Info Samling Harus Diisi', 
            'lokasi_samling.required' => 'Lokasi Samling Harus Diisi', 
            'info_samling.max' => 'Tidak Bisa Lebih Dari 100 karakter', 
            'lokasi_samling.max' => 'Tidak Bisa Lebih Dari 50 karakter', 
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('search');
        $dataJadwal = Jadwal_Samling::where('lokasi_samling','like', "%$query%")->paginate(10);
        return Inertia::render('jadwalSamling/jadwalSamling', [
            'dataJadwal' => $dataJadwal,
            'query' => $query,
        ]);
    }
}
