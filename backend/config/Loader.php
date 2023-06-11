<?php

abstract class Loader
{
    private static $paths;

    public static function registerLoader($paths)
    {
        spl_autoload_register("Loader::load");
        self::$paths = $paths;
    }

    private static function load($class)
    {
        $ds = DIRECTORY_SEPARATOR;
        $class = str_replace("\\", $ds, $class);

        try {
            $filename = dirname(__FILE__) . $ds . $class . ".php";
            if (file_exists($filename)) {
                include_once $filename;
                return;
            }

            foreach (self::$paths as $path) {
                $filename = $path . $class . ".php";
                if (file_exists($filename)) {
                    include_once $filename;
                    return;
                }
            }
        } catch (Exception $e) {
            Logger::logError($e);
        }
    }
}
