<?php

namespace App\Http\Controllers;

use App\Http\Traits\MasterCRUD;
use App\Models\Informasi;
use App\Models\Pendaftaran_Offline;
use App\Models\Wajib_pajak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pendaftaranSamsat = Pendaftaran_Offline::select('pendaftaran_samsat.*')
                            ->leftjoin('jadwal_pajak','jadwal_pajak.id','=','pendaftaran_samsat.jadwal_id')
                            ->where('status_antrian','!=',3)
                            ->orderBy('status_antrian', 'desc')
                            ->get();
        $totalPendaftaran = Pendaftaran_Offline::count();
        $totalSelesai = Pendaftaran_Offline::where('status_antrian','=',3)->count();

        return Inertia::render('dashboard/dashboardList', [
            'pendaftaranSamsat' => $pendaftaranSamsat,
            'totalPendaftar' => $totalPendaftaran,
            'totalSelesai' => $totalSelesai
        ]);
    }
}
