<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\User;
use Redirect, Response, File;

class UserController extends Controller
{

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    function registerUser(Request $request)
    {
        $params = $request -> all();
        $selectUser = User::select([
            'id',
            'email'
        ])->where('email', '=', $params['email'])->get()->count();
        
        if($selectUser == 0){
            $userData = User::create([
                'name' => $params['name'],
                'email' => $params['email'],
                'password' => Hash::make($params['password'])
            ]);
            $response['code'] = 200;
            $response['message'] = 'User Successfully Registered';
        }else {
            $response['code'] = 400;
            $response['message'] = 'Account Duplicate. Please use a different Email.';
        }
        return $response;
    }

    function logout() {
        // if(Auth::user()) {
            Auth::logout();
            return redirect('/login-page');
        // }
    }

    function login(Request $request)
    {
        $params = $request -> all();
        $selectUser = [
            'id',
            'email',
            'name',
            'role',
            'password'
        ];
        $this->validate($request, [
            'email'=> 'required|max:32',
            'password'=> 'required|max:32|min:8',
        ]);
        if(isset($params['email']) && isset($params['password'])){            
            if (Auth::attempt(['email'=>$request->email,'password'=>$request->password])) {
                $user = User::where('email','=',$request->email)->first();
                Auth::login($user);
                // $checkDetails = Hash::check($params['password'], $user->password);
                $response['code'] = 200;
                $response['message'] = 'Login Successfuly';
                $response['user'] = \Auth::user();

                return $response;
            }else {
                $response['code'] = 429;
                $response['message'] = 'Login Failed';
            }
        }else {
            $response['code'] = 400;
            $response['message'] = 'Empty fields not allowed.';
        }
        return $response;
    }

    public function showUsers(Request $request)
    {
        
        $params = $request -> all();
        $select = [
            'id',
            'name',
            'email',
            'role',
            'status'
        ];
        $usersList = User::select($select)->orderBy('name', 'ASC');
        if(isset($params['id'])){
            $usersList -> where('id', '=', $params['id']);
        }
        $response['data'] = $usersList->get();
        return $response;
    }

    public function updateUser(Request $request)
    {
        $params = $request -> all();
        if(isset($params['id'])) {
            $id = $params ['id'];
            $user = User::whereId($id)->update($params);
            $response['message'] = 'User ' . $params['status'];
            $response['code'] = 200;
        }
        return $response;
    }
}
