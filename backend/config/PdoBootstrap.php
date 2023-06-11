<?php

require_once dirname(__FILE__) . "/dbParams.php";

class PdoBootstrap
{
    private static $pdo;
    private static $instance;

    private function __construct()
    {
        try {
            $dns = DBParams_PDODRIVER . ":host=" . DBParams_SERVER . ";dbname=" . DBParams_DBNAME . "";
            self::$pdo = new PDO($dns, DBParams_USER, DBParams_PASSWORD);
        } catch (Exception $e) {
            Logger::logError($e);
            throw $e;
        }
    }

    public static function getConnection()
    {
        if (!isset(self::$instance)) {
            $c = __CLASS__;
            self::$instance = new $c;
        }

        return self::$pdo;
    }
}
