<?php

class Utils
{
    public static function formatToDBDate($string)
    {
        return substr($string, 4, 4) . "-" . substr($string, 2, 2) . "-" . substr($string, 0, 2);
    }

    public static function limparTexto($texto, $csv = false)
    {
        $texto = preg_replace('/[\x00-\x1F\x7F-\xFF]/', '', $texto); // Remove caracteres especiais
        $texto = preg_replace('/\s{2,}/u', ' ', $texto); // Remove espaços em excesso
        $texto = str_replace(["\r\n", "\r", "\n"], ' ', $texto); // Remove quebras de linha
        $texto = str_replace('-', ' ', $texto); // Remove hífens
        $texto = str_replace(['<soap:Body>', '</soap:Body>'], '', $texto); // Remove tags <soap:Body> e </soap:Body>
        $texto = str_replace(['&amp;', 'amp;', 'circ;'], '', $texto); // Remove &amp;, amp; e circ;

        if ($csv) {
            $texto = str_replace(['..', '*', '%', '>', '"', "'", '&'], '', $texto);
        }

        return trim($texto); // Remove espaços em branco no início e no fim do texto
    }

    public static function limparTextoParaSql($texto, $csv = false)
    {
        $texto = preg_replace('/[^a-zA-Z0-9\s]/', '', $texto);
        $texto = str_replace("'", "", $texto);
        return trim($texto); // Remove espaços em branco no início e no fim do texto
    }

    public static function downloadFile($dir, $file_name, $url)
    {
        $ch = curl_init($url);

        if (!file_exists($dir)) {
            mkdir($dir, 0777, true);
        }

        $fp = fopen($dir . $file_name, 'wb');

        curl_setopt($ch, CURLOPT_FILE, $fp);
        curl_setopt($ch, CURLOPT_HEADER, 0);

        curl_exec($ch);

        curl_close($ch);

        fclose($fp);
    }

    public static function rrmdir($dir)
    {
        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    if (filetype($dir . "/" . $object) == "dir")
                        Utils::rrmdir($dir . "/" . $object);
                    else unlink($dir . "/" . $object);
                }
            }
            reset($objects);
            rmdir($dir);
        }
    }

    public static function extractZip($caminhoarquivo, $arquivo)
    {
        $zip = new ZipArchive;

        if ($zip->open($caminhoarquivo . $arquivo) === TRUE) {
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $zip->extractTo($caminhoarquivo, [$zip->getNameIndex($i)]);
            }

            $zip->close();
        }

        unlink($caminhoarquivo . $arquivo);
    }

    public static function csvToArray($csvFile)
    {
        $file_to_read = fopen($csvFile, 'r');
        $header = [];
        $lines = [];

        while (!feof($file_to_read)) {
            $string = fgetcsv($file_to_read, 1000, ';');

            if (!empty($string) && count($string) > 1) {
                if (empty($header)) {
                    $header = $string;
                } else {
                    $lines[] = $string;
                }
            }
        }

        fclose($file_to_read);
        return $lines;
    }

    public static function mask($val, $mask)
    {
        $maskared = '';
        $k = 0;
        for ($i = 0; $i <= strlen($mask) - 1; $i++) {
            if ($mask[$i] == '#') {
                if (isset($val[$k])) $maskared .= $val[$k++];
            } else {
                if (isset($mask[$i])) $maskared .= $mask[$i];
            }
        }
        return $maskared;
    }

    public static function extrairRaizCNPJ($cnpj)
    {
        // Remove caracteres não numéricos do CNPJ
        $cnpj = preg_replace('/\D/', '', $cnpj);

        // Verifica se o CNPJ tem 14 dígitos
        if (strlen($cnpj) !== 14) {
            return false;
        }

        // Extrai os 8 primeiros dígitos como raiz
        $raiz = substr($cnpj, 0, 8);

        return $raiz;
    }

    public static function changeDataBrToUs($data)
    {
        if (!empty($data)) {
            $tempData = explode('/', $data);
            $data = $tempData[2] . '-' . $tempData[1] . '-' . $tempData[0] . ' 00:00:00.000';
            return $data;
        }
        return '';
    }

    public static function changeMoneyStringToNumber($valor)
    {
        if ($valor == 'NC') {
            return 0.0;
        }

        $valor = str_replace('.', '', $valor);
        $valor = str_replace(',', '.', $valor);

        return (float)$valor;
    }
}
