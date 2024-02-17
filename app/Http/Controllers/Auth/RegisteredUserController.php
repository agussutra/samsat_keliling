<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Regis_Stnk;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */

    public function index(Request $request)
    {
        $query = $request->input('search');

        $dataUser = User::where('name', 'like', "%$query%")->paginate(10);
        $dataDetailUser = Regis_Stnk::all();

        return Inertia::render('user/listUser', [
            'dataUser' => $dataUser,
            'query' => $query,
            'dataDetailUSer' => $dataDetailUser
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required'],
            'username' => 'required|string|max:255',
            'role' => 'required',
            'alamat' => 'required',
            'no_tlp' => 'required|numeric',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'username' => $request->username,
            'role' => $request->role,
            'alamat' => $request->alamat,
            'no_tlp' => $request->no_tlp,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $dataDetailUser = $request->validate([
            'plat_kendaraan' => 'required',
            'tipe_kendaraan' => 'required',
            'no_stnk' => 'required',
            'masa_berlaku' => 'required',
        ]);

        $dataDetailUser['id_user'] = $id;

        Regis_Stnk::updateOrCreate(
            ['plat_kendaraan' => $dataDetailUser['plat_kendaraan']],
            $dataDetailUser
        );
    }

    public function destroy($id)
    {
        User::where('id', $id)->delete();
        return redirect()->back();
    }

    public function deleteChild($id) {
        Regis_Stnk::where('plat_kendaraan', $id)->delete();
    }
}
