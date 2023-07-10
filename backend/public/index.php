<?php
header("Access-Control-Allow-Origin: *");

define('ROUTERS_PATH', '../src/Routers/');

$ds = DIRECTORY_SEPARATOR;

require_once dirname(__FILE__) . '/../vendor/autoload.php';
require_once dirname(__FILE__) . '/../config/Loader.php';

$paths = array(
    dirname(__FILE__) . '/../config/',
    dirname(__FILE__) . '/../src/Dao/',
    dirname(__FILE__) . '/../src/Helpers/',
    dirname(__FILE__) . '/../src/Controllers/',
    dirname(__FILE__) . '/../src/Routers/'
);
Loader::registerLoader($paths);

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];

$c = new \Slim\Container($configuration);
$app = new Slim\App($c);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

function headersRetorno($res)
{
    return $res
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Expose-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
}

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return headersRetorno($response);
});

$app->add(function ($req, $res, $next) use ($app) {
    $routeBase = substr($req->getUri()->getPath(), 1, strlen($req->getUri()->getPath()));

    $route = explode('/', $routeBase)[0];
    $fileName = ROUTERS_PATH . $route . '.php';

    if ($req->getOriginalMethod() == 'OPTIONS') {
        return $next($req, $res);
    }

    if (is_file($fileName)) {
        if (
            $route != "login"
            && $route != "site"
        ) {
            $token = $req->getHeader('Authorization');

            if (!empty($token)) {
                try {
                    $token = substr($token[0], 7);
                    TokenHelper::validaToken($token);

                    require_once $fileName;
                    return $next($req, $res);
                } catch (Exception $aa) {
                    $ret = headersRetorno($res);
                    return $ret->withStatus(401)->write('Token Invalido!');
                }
            } else {
                $ret = headersRetorno($res);
                return $ret->withStatus(401)->write('Token Invalido!');
            }
        } else {
            require_once $fileName;
            return $next($req, $res);
        }
    } else {
        $ret = headersRetorno($res);
        return $ret->withStatus(404)->write('Rota Invalida!');
    }
});

$app->run();
