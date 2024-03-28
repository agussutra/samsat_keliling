export function calculateEstimasi(nomorAntrian, waktuMulai, estimasiWaktu) {

    const [jamMulai, menitMulai] = waktuMulai.split(':').map(str => parseInt(str));
    const waktuKedatangan = new Date();
    waktuKedatangan.setHours(jamMulai);
    waktuKedatangan.setMinutes(menitMulai + (nomorAntrian - 1) * estimasiWaktu);

    const waktuAkhir = new Date(waktuKedatangan);
    waktuAkhir.setMinutes(waktuKedatangan.getMinutes() + estimasiWaktu);

    const waktuMulaiString = waktuKedatangan.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const waktuAkhirString = waktuAkhir.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `${waktuMulaiString} - ${waktuAkhirString}`;
}