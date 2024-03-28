<?php

namespace App\Http\Controllers;

use App\Http\Traits\MasterCrud;
use App\Models\Jadwal_Samling;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class JadwalSamlingController extends Controller
{

    use MasterCrud;

    public function __construct()
    {
        $this->setModel(\App\Models\Jadwal_Samling::class);
        $this->setValidationRule([
            'tgl_samling' => ['required'],
            'jam_samling' => ['required'],
            'jam_samling_selesai' => ['required'],
            'info_samling' => ['required', 'max:100'],
            'lokasi_samling' => ['required', 'max:50'],
        ]);

        $this->setValidationRuleMassage([
            'tgl_samling.required' => 'Tanggal Samling Harus Diisi',
            'jam_samling.required' => 'Jam Samling Harus Diisi',
            'jam_samling_selesai.required' => 'Jam Samling Harus Diisi',
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
        $dataJadwal = DB::table('jadwal_pajak AS jp')
            ->select(
                DB::raw('(SELECT COUNT(id) FROM pendaftaran_samsat WHERE jadwal_id = jp.id) AS remaining_quota'),
                'jp.*'
            )
            ->where('lokasi_samling', 'like', "%$query%")
            ->orderBy('tgl_samling')
            ->orderBy('jam_samling')
            ->groupBy('jp.id')
            ->paginate(10);

        // Jadwal_Samling::where('lokasi_samling', 'like', "%$query%")->orderBy('tgl_samling')->orderBy('jam_samling')->paginate(10);
        return Inertia::render('jadwalSamling/jadwalSamling', [
            'dataJadwal' => $dataJadwal,
            'query' => $query,
        ]);
    }
}
