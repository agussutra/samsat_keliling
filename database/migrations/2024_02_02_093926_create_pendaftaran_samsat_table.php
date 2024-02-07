<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pendaftaran_samsat', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wajib_pajak_id');
            $table->unsignedBigInteger('jadwal_id');
            $table->string('kode_pendaftaran');
            $table->integer('status_antrian')->default(1);
            $table->date('tgl_pendaftaran');
            $table->enum('tipe_pendaftaran',['online','offline']);

            $table->foreign('wajib_pajak_id')->references('id')->on('wajib_pajak')->onDelete('cascade');
            $table->foreign('jadwal_id')->references('id')->on('jadwal_pajak')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftaran_samsat');
    }
};
