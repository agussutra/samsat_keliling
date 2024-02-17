<?php

namespace App\Http\Controllers;

use App\Http\Traits\MasterCrud;
use App\Models\Regis_Stnk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class RegisStnkController extends Controller
{

    use MasterCrud;

    public function __construct(Request $request)
    {
        $role_stnk = 'required|max:10|unique:stnk,no_stnk';
        $no_stnk_new = $request->input('no_stnk');
        $no_stnk_old = $request->input('no_stnk_old');
        if ($no_stnk_old != null) {
            if ($no_stnk_new == $no_stnk_old) {
                $role_stnk = 'required|max:10';
            }
        }
        $this->setModel(Regis_Stnk::class);
        $this->setValidationRule([
            'plat_kendaraan' => 'required|max:10',
            'tipe_kendaraan' => 'required',
            'no_stnk' => $role_stnk,
            'masa_berlaku' => 'required',
            'id_user' => 'required',
        ]);

        $this->setValidationRuleMassage([
            'plat_kendaraan.required' => 'Field plat kendaraan harus diisi.',
            'plat_kendaraan.max' => 'Field plat kendaraan maksimal 10 karakter.',
            'tipe_kendaraan.required' => 'Field tipe kendaraan harus diisi.',
            'no_stnk.required' => 'Field no stnk harus diisi.',
            'no_stnk.max' => 'Field no stnk maksimal 10 karakter.',
            'no_stnk.required' => 'Field no stnk harus diisi.',
            'masa_berlaku.required' => 'Field no masa berlaku harus diisi.',
            'no_stnk.unique' => 'Nomor STNK sudah terdaftar',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get the authenticated user
        $user = auth()->user();
        // Now you can access the properties of the authenticated user
        $userId = $user->id;

        $query = $request->input('search');
        $dataStnk = Regis_Stnk::where('id_user', $userId)->where('no_stnk', 'like', "%$query%")->paginate(10);
        return Inertia::render('regisStnk/regisStnk', [
            'dataStnk' => $dataStnk,
            'query' => $query,
        ]);
    }
}
