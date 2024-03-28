<?php

namespace App\Http\Controllers;

use App\Http\Traits\MasterCrud;
use App\Models\Jadwal_Samling;
use App\Models\Pendaftaran_detail;
use App\Models\Pendaftaran_Offline;
use App\Models\Pendaftaran_Samling;
use App\Models\Regis_Stnk;
use App\Models\User;
use App\Models\Wajib_pajak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class PendaftaranSamlingController extends Controller
{

    use MasterCrud;

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

        // Get the authenticated user
        $user = auth()->user();
        // Now you can access the properties of the authenticated user
        $userRole = $user->role;
        $userId = $user->id;

        $dataPendaftaran = DB::table('pendaftaran_samsat')
            ->select('pendaftaran_samsat.*', 'users.name', 'users.id as id_user', 'jadwal_pajak.tgl_samling', 'jadwal_pajak.jam_samling', 'jadwal_pajak.jam_samling_selesai' )
            ->leftJoin('pendaftaran_samsat_detail', 'pendaftaran_samsat_detail.id_pendaftaran', '=', 'pendaftaran_samsat.id')
            ->leftJoin('users', 'users.id', '=', 'pendaftaran_samsat_detail.id_user')
            ->leftJoin('jadwal_pajak', 'jadwal_pajak.id', '=', 'pendaftaran_samsat.jadwal_id')
            ->where('kode_pendaftaran', 'like', "%$query%")
            ->when($userRole === 2, function ($query) use ($userId) {
                return $query->where('users.id', $userId);
            })
            ->distinct('users.name')
            ->paginate(10);

        $dataStnk = DB::table('stnk')
            ->select('stnk.*')
            ->Join('pendaftaran_samsat_detail', 'pendaftaran_samsat_detail.id_stnk', '=', 'stnk.id')
            ->get();

        return Inertia::render('pendaftaranSamling/pendaftaranSamlingList', [
            'dataPendaftaran' => $dataPendaftaran,
            'query' => $query,
            'dataStnk' => $dataStnk,
        ]);
    }

    public function form()
    {
        $lastCode = Pendaftaran_Samling::latest()->value('kode_pendaftaran');
        $kodePendaftaran = 'AN' . str_pad(intval(substr($lastCode, 2)) + 1, 3, '0', STR_PAD_LEFT);
        $dataJadwal = Jadwal_Samling::orderBy('tgl_samling')->orderBy('jam_samling')->get();
        $dataUser = User::all();
        $dataStnk = Regis_Stnk::all();
        return Inertia::render('pendaftaranSamling/pendaftaranSamlingForm', [
            'action' => 'CREATE',
            'dataJadwal' => $dataJadwal,
            'title' => 'Create Pendaftaran',
            'kodePendaftaran' => $kodePendaftaran,
            'dataUser' => $dataUser,
            'dataStnk' => $dataStnk
        ]);
    }

    public function store(Request $request)
    {
        $validateData = $request->validate(
            [
                'kode_pendaftaran' => 'required|unique:pendaftaran_samsat,kode_pendaftaran',
                'status_antrian' => 'required',
                'tgl_pendaftaran' => 'required',
                'tipe_pendaftaran' => 'required',
                'jadwal_id' => 'required|check_quota',
                'user_id' => 'required',

            ],
            [
                'kode_pendaftaran.required' => 'Field no kode pendaftaran harus diisi.',
                'status_antrian.required' => 'Field no status antrian harus diisi.',
                'tgl_pendaftaran.required' => 'Field no tgl pendaftaran harus diisi.',
                'tipe_pendaftaran.required' => 'Field no tipe pendaftaran harus diisi.',
                'jadwal_id.required' => 'Field jadwal pendaftaran harus diisi.',
                'jadwal_id.check_quota' => 'Quota sudah penuh',
                'kode_pendaftaran.unique' => 'Field kode pendaftaran tidak boleh sama.',
                'user_id.required' => 'Field User harus diisi.',
            ]
        );

        try {
            DB::beginTransaction();
            $Pendaftaran_master = Pendaftaran_Samling::create([
                'jadwal_id' => $validateData['jadwal_id'],
                'kode_pendaftaran' => $validateData['kode_pendaftaran'],
                'status_antrian' => $validateData['status_antrian'],
                'tgl_pendaftaran' => $validateData['tgl_pendaftaran'],
                'tipe_pendaftaran' => $validateData['tipe_pendaftaran'],
            ]);

            foreach ($request->dataListStnk as $value) {
                Pendaftaran_detail::create([
                    'id_user' => $value['id_user'],
                    'id_pendaftaran' => $Pendaftaran_master->id,
                    'id_stnk' => $value['id']
                ]);
            }
            DB::commit();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back();
        }
    }

    public function update(Request $request, $id)
    {
        Pendaftaran_Samling::find($id)->update([
            'status_antrian' => $request->statusAntrian
        ]);
        return redirect()->back();
    }

    public function delete($id)
    {
        Pendaftaran_Samling::find($id)->delete();
        return redirect()->back();
    }
}
