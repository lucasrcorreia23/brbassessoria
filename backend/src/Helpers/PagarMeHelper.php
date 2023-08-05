<?php
define('C_REST_WEB_HOOK_URL', 'https://api.pagar.me/core/v5/'); //url on creat Webhook
// define('C_REST_APPKEY', 'sk_test_9G8Y745sWDcY645a:pk_test_a4MV8RoFXduGWZx8'); //appkey

define('C_REST_APPKEY', 'sk_8xjleMnhyzSrlNVM:pk_LkbVaGONCpHlaqjW'); //appkey

class PagarMeHelper
{
    protected static function callCurl($arParams)
    {
        $url = C_REST_WEB_HOOK_URL . $arParams['method'];

        try {
            $headers = array(
                'Authorization: Basic ' . base64_encode(C_REST_APPKEY),
                'Content-Type: application/json'
            );

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($arParams["params"]));

            $response = curl_exec($ch);

            if (curl_errno($ch)) {
                $response['curl_error'] = curl_error($ch);
            }

            $result = json_decode($response, true);

            curl_close($ch);

            if (!empty($result['error'])) {
                throw new Exception($result['error']);
            }

            if (!empty($response['curl_error'])) {
                $result['error'] = 'curl_error';
                $result['error_information'] = $response['curl_error'];
            }

            return $result;
        } catch (Exception $e) {
            return [
                'error' => 'exception',
                'error_exception_code' => $e->getCode(),
                'error_information' => $e->getMessage(),
            ];
        }
    }

    public static function call($method, $params = [])
    {
        $arPost = [
            'method' => $method,
            'params' => $params
        ];

        $result = static::callCurl($arPost);
        return $result;
    }

    public static function newSubscriptions($body)
    {
        try {
            $dados = (array)PagarMeHelper::call(
                'subscriptions',
                $body
            );

            return $dados;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public static function newOrder($body)
    {
        try {
            $dados = (array)PagarMeHelper::call(
                'orders',
                $body
            );

            return $dados;
        } catch (Exception $e) {
            throw $e;
        }
    }
}
