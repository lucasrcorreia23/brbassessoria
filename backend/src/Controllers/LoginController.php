<?php

class LoginController
{
    public function login($request, $response)
    {
        try {
            $post = (array)json_decode($request->getBody());

            if (!isset($post['usuario'])) throw new Exception('O campo Login não existe');
            if (empty($post['usuario'])) throw new Exception('O campo Login não pode estar vazio');

            if (!isset($post['senha'])) throw new Exception('O campo Senha não existe');
            if (empty($post['senha'])) throw new Exception('O campo senha não pode estar vazio');

            try {
                $return = [];

                $dao = new LoginDao();
                $return["usuario"] = $dao->getAuthenticate($post);
                $return['token'] = TokenHelper::setToken($return);
            } catch (Exception $e) {
                throw $e;
            }

            $responseNew = $response->withJson($return);
        } catch (Exception $e) {
            $responseNew = $response->withStatus(500)->withJson($e->getMessage());
        }

        return $responseNew;
    }
}
