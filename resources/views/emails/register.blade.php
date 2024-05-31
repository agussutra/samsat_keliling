<!DOCTYPE html>
<html>
<head>
    <title>APLIKASI SAMSAT KELILING</title>
</head>
<body>
    <h1>Selamat Datang, {{ $user->name }}!</h1>
    <p>Anda {{ $messageContent }} Dengan Username {{ $user->name }} Pada Pukul {{ \Carbon\Carbon::now()->format('d-M-Y') }}</p>
</body>
</html>
