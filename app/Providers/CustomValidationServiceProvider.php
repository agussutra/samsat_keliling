<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CustomValidationServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Validator::extend('check_quota', function ($attribute, $value, $parameters, $validator) {
            $get_pendaftar = DB::table('pendaftaran_samsat')
                ->leftJoin('jadwal_pajak', 'jadwal_pajak.id', '=', 'pendaftaran_samsat.jadwal_id')
                ->where('jadwal_pajak.id', $value)
                ->count();

            $quota = $this->_checkQuota($get_pendaftar);

            // Example: Check if the value is greater than 10
            return $quota > 0;
        });
    }

    private function _checkQuota($val)
    {
        $max_quota = 30;
        $remaining_quota = $max_quota - $val;
        return $remaining_quota;
    }
}
