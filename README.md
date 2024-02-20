# SAMSAT KELILING SISAM

Samsat keliling website using [Laravel](https://laravel.com) and template with [InertiaJs](https://inertiajs.com/)

## Prerequisites

Before you begin, ensure you have the following dependencies installed on your local machine:

- [PHP](https://www.php.net/) (>= 7.x)
- [Composer](https://getcomposer.org/)
- [NodeJs](https://nodejs.org/en)

## Installation

Follow the steps below to set up and run the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/agussutra/samsat_keliling.git
   ```

2. Navigate to the project directory:

   ```bash
   cd samsat-keliling
   ```

3. Install PHP dependencies:

   ```bash
   composer install
   ```
4. Install Inertia JS
   ```bash
   npm install
   ```

5. Copy the `.env.example` file to create a new `.env` file:

   ```bash
   cp .env.example .env
   ```

6. Generate an application key:

   ```bash
   php artisan key:generate
   ```

7. Configure the database settings in the `.env` file.

8. Build inertia js 

    ```bash
    npm run build
     ```

9. Start the development server:

    ```bash
    php artisan serve
    ```

    Your Laravel application should now be running at `http://localhost:8000`.

## Additional Configuration

- Customize the `.env` file for additional configuration options.
- Refer to the Laravel documentation for advanced configuration: [Laravel Documentation](https://laravel.com/docs).