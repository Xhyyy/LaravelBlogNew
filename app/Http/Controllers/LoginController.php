<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;

class LoginController extends Controller
{
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function createUser(Request $request)
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

    // public function loginUser(Request $request)
    // {
    //     $params = $request -> all();
    //     $selectUser = [
    //         'id',
    //         'email',
    //         'name',
    //         'role',
    //         'password'
    //     ];
    //     if(isset($params['email']) && isset($params['password'])){
    //         // $selectedUser = User::select($selectUser)
    //         //     ->where('email', '=', $params['email'])
    //         //     ->where('password', '=', Hash::check('password',$params['password']))
    //         //     ->where('status', '=', 'enabled')
    //         //     ->get();

    //         $userData = User::where('email','=', $params['email'])->where('status', '=', 'enabled')->first();
    //         $checkDetails = Hash::check($params['password'], $userData->password);
            
    //         if($checkDetails) {
    //             // return view('pages.author');
                
    //             $response['code'] = 200;
    //             $response['message'] = 'Login Successfuly';
    //         }else{
    //             $response['code'] = 429;
    //             $response['message'] = 'Login Failed';
    //         }
    //     }else {
    //         $response['code'] = 400;
    //         $response['message'] = 'Empty fields not allowed.';
    //     }
    //     return $response;
    // }

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
