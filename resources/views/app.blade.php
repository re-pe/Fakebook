@php
    $url = '';
    $auth = 'false';
    $urlRegister = '';
    if (Route::has('login')) {
        if (Auth::user()){
            $auth = 'true';
            $url = route('login');
        } else {
            $url = url('/home');
        }
        if (Route::has('register')) {
            $urlRegister = route('register');
        }
    }
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ mix('css/index.css') }}" rel="stylesheet">
    </head>
    <body class="antialiased">
        <div id="app"></div>
        <script type="module">
            window.welcomeData = {
                isAuthenticated: "{{ $auth }}",
                url: "{{ $url }}",
                urlRegister: "{{ $urlRegister }}",
                laravelVersion: "{{ Illuminate\Foundation\Application::VERSION }}",
                phpVersion: "{{ PHP_VERSION }}"
            }
        </script>
        <script src="{{ mix('js/index.js') }}" defer></script>
    </body>
</html>
