<?php

namespace App\Http\Controllers;

use App\Http\Traits\MasterCRUD;
use App\Models\Informasi;
use App\Models\Wajib_pajak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class WajibPajakController extends Controller
{

    use MasterCRUD;

    public function __construct()
    {
        $this->setModel(\App\Models\Wajib_pajak::class);

        $this->setValidationRule([
            'nama' => 'required|max:50',
            'alamat' => 'required|max:100',
            'no_tlp' => 'required|numeric',
            'plat_kendaraan' => 'required|max:10',
            'tipe_kendaraan' => 'required',
            'no_stnk' => 'required|max:10|unique:wajib_pajak,no_stnk',
            'masa_berlaku' => 'required',
        ]);

        $this->setValidationRuleMassage([
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
            'no_stnk.unique' => 'Field no stnk tidak boleh sama.',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('search');
        $wajibPajak = Wajib_pajak::where('nama','like', "%$query%")->paginate(10);
        return Inertia::render('wajibPajak/wajibPajakList', [
            'wajibPajak' => $wajibPajak,
            'query' => $query,
        ]);
    }
}
