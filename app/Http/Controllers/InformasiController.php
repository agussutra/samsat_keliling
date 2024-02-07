<?php

namespace App\Http\Controllers;

use App\Http\Traits\MasterCRUD;
use App\Models\Informasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class InformasiController extends Controller
{

    use MasterCRUD;

    public function __construct()
    {
        $this->setModel(\App\Models\Informasi::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('informasi/listInformasi');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate(
            [
                'informasi_samling' => 'required',
            ],
            [
                'informasi_samling.required' => 'Field informasi harus diisi.',
            ]
        );

        try {
            DB::beginTransaction();
            Informasi::truncate();
            Informasi::create($validatedData);
            DB::commit();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back();
        }
    }
}
