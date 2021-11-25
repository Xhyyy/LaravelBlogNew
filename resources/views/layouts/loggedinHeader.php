<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="height: 100%">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'MyBlog') }}</title>

    <!-- Scripts -->
    {{-- <script src="js/manifest.js" defer></script>
    <script src="js/vendor.js" defer></script> --}}
    <script src="js/app.js" defer></script>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- CSS -->
    {{-- <link rel='stylesheet' href="{{ mix('css/app.css') }}"> --}}
</head>
<body style="margin:0;">
    <div id="loggedinHeader"></div>
    <div class="container">
        @yield('content')
    </div>
</body>
</html>