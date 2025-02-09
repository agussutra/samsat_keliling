# 1. Gunakan base image PHP (versi 8.1 atau sesuai kebutuhan)
FROM php:8.1-fpm

RUN apt-get update && apt-get install -y libpq-dev && \
    docker-php-ext-install pdo_pgsql pgsql

# 2. Install dependensi sistem yang diperlukan
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    git \
    unzip \
    libpng-dev libjpeg-dev libfreetype6-dev zip \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd
    

# 3. Install Composer (dependency manager untuk PHP)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 4. Set direktori kerja di dalam container
WORKDIR /var/www

# 5. Salin seluruh aplikasi ke dalam container
COPY . .

# 6. Install dependensi PHP dengan Composer
RUN composer install --no-dev --optimize-autoloader

# 7. Install dependensi frontend menggunakan npm
RUN npm install

# 8. (Opsional) Build aplikasi frontend menggunakan Vite
RUN npm run build

# 9. Jalankan migrasi database Laravel (opsional jika Anda ingin melakukannya di build)
RUN php artisan migrate --force

# 10. Set e
