<?php

class Logger
{
    private static $logFileError;
    private static $instance;

    private function __construct()
    {
        self::$logFileError = dirname(__FILE__) . "/../logs/" . date("d-m-Y") . ".error";
    }

    public static function logError(Exception $log)
    {
        if (!isset(self::$instance)) {
            $c = __CLASS__;
            self::$instance = new $c;
        }

        $message = "[ ERROR " . date("d/m/Y H:i") . " ]: " . $log->getCode() . ' - ' . $log->getMessage() . "\n*** TRACE ***: " . $log->getTraceAsString();

        $fh = fopen(self::$logFileError, 'a');
        if (!$fh) {
            throw new Exception("Logger::logError - não foi possivel abrir o arquivo de log. ");
        }
        fwrite($fh, $message . "\n\n");
        fclose($fh);
    }
}
