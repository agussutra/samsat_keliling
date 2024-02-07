<?php

namespace App\Http\Controllers;

use App\Http\Traits\MasterCRUD;
use App\Models\Jadwal_Samling;
use App\Models\Pendaftaran_Offline;
use App\Models\Wajib_pajak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class PendaftaranOfflineController extends Controller
{

    use MasterCRUD;

    public function __construct()
    {
        $this->setModel(\App\Models\Jadwal_Samling::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('search');

        $dataPendaftaran = DB::table('pendaftaran_samsat')
                        ->select('pendaftaran_samsat.*', 'jadwal_pajak.tgl_samling','wajib_pajak.nama')
                        ->leftJoin('jadwal_pajak', 'jadwal_pajak.id', '=', 'pendaftaran_samsat.jadwal_id')
                        ->leftJoin('wajib_pajak', 'wajib_pajak.id', '=', 'pendaftaran_samsat.wajib_pajak_id')
                        ->paginate(10);

        return Inertia::render('pendaftaranOffline/pendaftaranOfflineList', [
            'dataPendaftaran' => $dataPendaftaran,
            'query' => $query,
        ]);
    }

    public function form()
    {
        $lastCode = Pendaftaran_Offline::latest()->value('kode_pendaftaran');
        $kodePendaftaran = 'AN' . str_pad(intval(substr($lastCode, 2)) + 1, 3, '0', STR_PAD_LEFT);
        $dataJadwal = Jadwal_Samling::all();
        return Inertia::render('pendaftaranOffline/pendaftaranOfflineForm', [
            'action' => 'CREATE',
            'dataJadwal' => $dataJadwal,
            'title' => 'Create Pendaftaran',
            'kodePendaftaran' => $kodePendaftaran
        ]);
    }

    public function store(Request $request)
    {
        $validateData = $request->validate(
            [
                'nama' => 'required|max:50',
                'alamat' => 'required|max:100',
                'no_tlp' => 'required|numeric',
                'plat_kendaraan' => 'required|max:10',
                'tipe_kendaraan' => 'required',
                'no_stnk' => 'required|max:10|unique:wajib_pajak,no_stnk',
                'masa_berlaku' => 'required',
                'kode_pendaftaran' => 'required|unique:pendaftaran_samsat,kode_pendaftaran',
                'status_antrian' => 'required',
                'tgl_pendaftaran' => 'required',
                'tipe_pendaftaran' => 'required',
                'jadwal_id' => 'required',

            ],
            [
                'nama.required' => 'Field nama harus diisi.',
                'nama.max' => 'Field nama tidak boleh lebih dari 50 karakter.',
                'no_tlp.required' => 'Field no tlp harus diisi.',
                'no_tlp.numeric' => 'Field no tlp harus angka.',
                'plat_kendaraan.required' => 'Field plat kendaraan harus diisi.',
                'plat_kendaraan.max' => 'Field plat kendaraan maksimal 10 karakter.',
                'tipe_kendaraan.required' => 'Field tipe kendaraan harus diisi.',
                'no_stnk.required' => 'Field no stnk harus diisi.',
                'no_stnk.max' => 'Field no stnk maksimal 10 karakter.',
                'no_stnk.required' => 'Field no stnk harus diisi.',
                'masa_berlaku.required' => 'Field no masa berlaku harus diisi.',
                'kode_pendaftaran.required' => 'Field no kode pendaftaran harus diisi.',
                'status_antrian.required' => 'Field no status antrian harus diisi.',
                'tgl_pendaftaran.required' => 'Field no tgl pendaftaran harus diisi.',
                'tipe_pendaftaran.required' => 'Field no tipe pendaftaran harus diisi.',
                'jadwal_id.required' => 'Field jadwal pendaftaran harus diisi.',
                'kode_pendaftaran.unique' => 'Field kode pendaftaran tidak boleh sama.',
                'no_stnk.unique' => 'Field no stnk tidak boleh sama.',
            ]
        );

        try {
            DB::beginTransaction();

            // DB::connection()->enableQueryLog();
            $dataWajibPajak = Wajib_pajak::create([
                'nama' => $validateData['nama'],
                'alamat' => $validateData['alamat'],
                'no_tlp' => $validateData['no_tlp'],
                'plat_kendaraan' => $validateData['plat_kendaraan'],
                'tipe_kendaraan' => $validateData['tipe_kendaraan'],
                'no_stnk' => $validateData['no_stnk'],
                'masa_berlaku' => $validateData['masa_berlaku'],
            ]);
            // $queries = DB::getQueryLog();
            // dd($queries);

            Pendaftaran_Offline::create([
                'wajib_pajak_id' => $dataWajibPajak->id,
                'jadwal_id' => $validateData['jadwal_id'],
                'kode_pendaftaran' => $validateData['kode_pendaftaran'],
                'status_antrian' => $validateData['status_antrian'],
                'tgl_pendaftaran' => $validateData['tgl_pendaftaran'],
                'tipe_pendaftaran' => $validateData['tipe_pendaftaran'],
            ]);

            DB::commit();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back();
        }
    }

    public function update (Request $request, $id) 
    {
        Pendaftaran_Offline::find($id)->update([
            'status_antrian' => $request->statusAntrian
        ]);
        return redirect()->back();
    }

    public function delete ($id)
    {
        Pendaftaran_Offline::find($id)->delete();
        return redirect()->back();
    }
}
