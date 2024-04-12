<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class TokenHelper
{

    private static $chaveMestra = 'Uaad5sa6d1#DASDsa1d56';

    public function __construct()
    {
    }

    public static function setToken($data)
    {
        try {
            $d = new DateTime();
            $issuedAt = $d->getTimestamp();
            $d->modify("+2 hour");

            $token = array(
                "iat"       => $issuedAt,
                "iss"       => "http://adm.odontoguard.com.br",
                "exp"       => $d->getTimestamp(),
                "host"      => $_SERVER['REMOTE_ADDR'],
                "data"      => $data
            );

            return JWT::encode($token, self::$chaveMestra, 'HS256');
        } catch (Exception $e) {
            Logger::logError($e);
            throw $e;
        }
    }

    public static function getClaimsToken($token)
    {
        try {

            return JWT::decode($token, new Key(self::$chaveMestra, 'HS256'));
        } catch (Exception $e) {
            Logger::logError($e);
            throw $e;
        }
        //teste de elementos
    }

    public static function validaToken($token)
    {
        try {

            $decoded = JWT::decode($token, new Key(self::$chaveMestra, 'HS256'));

            return self::setToken($decoded->data);
        } catch (Exception $e) {
            Logger::logError($e);
            throw $e;
        }
    }

    public static function getData($token)
    {
        try {

            $decoded = JWT::decode($token, new Key(self::$chaveMestra, 'HS256'));

            return $decoded->data;
        } catch (Exception $e) {
            Logger::logError($e);
            throw $e;
        }
    }
}
