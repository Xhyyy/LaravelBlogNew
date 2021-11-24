<!DOCTYPE html>

<html lang="en">

<head>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" ></script>

    <style type="text/css">

        body{

          margin-top: 150px;

            background-color: #A8766A;

        }

        .error-main{

          background-color: #fff;

          box-shadow: 0px 10px 10px -10px #5D6572;

        }

        .error-main h1{

          font-weight: bold;

          color: #6D372A;

          font-size: 100px;

          text-shadow: 2px 4px 5px #bd9990;

        }

        .error-main h6{

          color: #42494F;

        }

        .error-main p{

          color: #6D372A;

          font-size: 14px; 

        }

        .error-main .text-info {
          background: none;
          border: 1px solid;
        }

        .error-main .text-info:hover {
          cursor: pointer;
        }

    </style>

</head>

<body>

    <div id="header"></div>

    <div class="container">

      <div class="row text-center">

        <div class="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 p-3 error-main">

          <div class="row">

            <div class="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1">

              <h1 class="m-0">404</h1>

              <h3>PAGE NOT FOUND</h3>

              <p style="margin-bottom:10px;"><button onclick="goBack()" class="text-info">Go Back</button></p>
              {{-- <p><button onclick="goBack()" class="text-info">Register</button> or <button onclick="goBack()" class="text-info">Login</button></p> --}}

            </div>

          </div>

        </div>

      </div>

    </div>

    <script>
      function goBack() {
        window.history.back();
      }
    </script>

</body>

</html>