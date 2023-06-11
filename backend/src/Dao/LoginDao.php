<?php

class LoginDao
{
    public function getAuthenticate($usuario)
    {
        $c = PdoBootstrap::getConnection();

        try {
            $query = "SELECT id, nome, usuario FROM usuarios
                    WHERE usuario = :usuario AND senha = :senha
            ";

            $st = $c->prepare($query);
            $st->bindParam(':usuario', $usuario['usuario'], PDO::PARAM_STR);
            $st->bindParam(':senha', $usuario['senha'], PDO::PARAM_STR);

            if (!$st->execute()) {
                throw new Exception('Nao foi possivel fazer o login, contatar o administrador do site');
            }

            $obj = $st->fetchObject();

            if (empty($obj)) throw new Exception('Nao foi possivel fazer o login, contatar o administrador do site');

            return $obj;
        } catch (Exception $e) {
            Logger::logError($e);
            throw $e;
        }
    }
}
