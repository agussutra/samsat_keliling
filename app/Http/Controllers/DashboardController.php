<?php

namespace App\Http\Controllers;

use App\Http\Traits\MasterCRUD;
use App\Models\Informasi;
use App\Models\Pendaftaran_Offline;
use App\Models\Pendaftaran_Samling;
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
        // Get the authenticated user
        $user = auth()->user();
        // Now you can access the properties of the authenticated user
        $userRole = $user->role;

        if ($userRole == 1) {
            $totalPendaftaran = Pendaftaran_Samling::count();
            $totalSelesai = Pendaftaran_Samling::where('status_antrian', '=', 3)->count();
        } else {
            $pendaftaranSedangDiproses = Pendaftaran_Samling::select('pendaftaran_samsat.*', 'users.name')
                ->leftjoin('jadwal_pajak', 'jadwal_pajak.id', '=', 'pendaftaran_samsat.jadwal_id')
                ->leftjoin('pendaftaran_samsat_detail', 'pendaftaran_samsat_detail.id_pendaftaran', '=', 'pendaftaran_samsat.id')
                ->leftjoin('users', 'users.id', '=', 'pendaftaran_samsat_detail.id_user')
                ->where('status_antrian', '=', 2)
                ->where('jadwal_pajak.tgl_samling', '=', now()->format('Y-m-d'))
                ->first();
        }

        $pendaftaranSamsat = Pendaftaran_Samling::select('pendaftaran_samsat.*')
            ->leftjoin('jadwal_pajak', 'jadwal_pajak.id', '=', 'pendaftaran_samsat.jadwal_id')
            ->where('status_antrian', '!=', 3)
            ->where('jadwal_pajak.tgl_samling', '=', now()->format('Y-m-d'))
            ->orderBy('status_antrian', 'desc')
            ->get();

        return Inertia::render('dashboard/dashboardList', [
            'pendaftaranSamsat' => $pendaftaranSamsat,
            'pendaftaranSedangDiproses' => $userRole == 2 ? $pendaftaranSedangDiproses : "",
            'totalPendaftar' => $userRole == 1 ? $totalPendaftaran : "",
            'totalSelesai' => $userRole == 1 ? $totalSelesai : "",
        ]);
    }
}
