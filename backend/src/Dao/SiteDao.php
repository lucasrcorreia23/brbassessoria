<?php

class SiteDao
{
    public function getDados()
    {
        $c = PdoBootstrap::getConnection();

        try {
            $return = [];

            $query = "SELECT * FROM dados";

            $st = $c->prepare($query);

            if (!$st->execute()) {
                throw new Exception('Não foi possivel selecionar o estabelecimento');
            }

            $return = $st->fetchObject();

            $query = "SELECT * FROM metodologias";

            $st = $c->prepare($query);

            if (!$st->execute()) {
                throw new Exception('Não foi possivel selecionar o estabelecimento');
            }

            $return->metodologias = $st->fetchAll(PDO::FETCH_ASSOC);

            $query = "SELECT * FROM planos";

            $st = $c->prepare($query);

            if (!$st->execute()) {
                throw new Exception('Não foi possivel selecionar o estabelecimento');
            }

            $return->planos = $st->fetchAll(PDO::FETCH_ASSOC);

            foreach ($return->planos as &$plano) {
                $plano["topicos"] = json_decode($plano["topicos"]);
            }

            $query = "SELECT * FROM segmentos";

            $st = $c->prepare($query);

            if (!$st->execute()) {
                throw new Exception('Não foi possivel selecionar o estabelecimento');
            }

            $return->segmentos = $st->fetchAll(PDO::FETCH_ASSOC);

            return $return;
        } catch (Exception $e) {
            Logger::logError($e);
            throw $e;
        }
    }

    public function putDados($dados)
    {
        $c = PdoBootstrap::getConnection();

        try {
            $return = [];

            $query = "UPDATE dados SET
                banner_foto = :banner_foto,
                banner_frase = :banner_frase,
                quemsomos_foto = :quemsomos_foto,
                quemsomos_frase = :quemsomos_frase,
                frasefinal = :frasefinal,
                contato_email = :contato_email,
                contato_endereco = :contato_endereco,
                contato_telefone = :contato_telefone
            ";

            $st = $c->prepare($query);
            $st->bindParam(':banner_foto', $dados["banner_foto"], PDO::PARAM_STR);
            $st->bindParam(':banner_frase', $dados["banner_frase"], PDO::PARAM_STR);
            $st->bindParam(':quemsomos_foto', $dados["quemsomos_foto"], PDO::PARAM_STR);
            $st->bindParam(':quemsomos_frase', $dados["quemsomos_frase"], PDO::PARAM_STR);
            $st->bindParam(':frasefinal', $dados["frasefinal"], PDO::PARAM_STR);
            $st->bindParam(':contato_email', $dados["contato_email"], PDO::PARAM_STR);
            $st->bindParam(':contato_endereco', $dados["contato_endereco"], PDO::PARAM_STR);
            $st->bindParam(':contato_telefone', $dados["contato_telefone"], PDO::PARAM_STR);

            if (!$st->execute()) {
                throw new Exception('Não foi possivel selecionar o estabelecimento');
            }

            $query = "DELETE FROM metodologias";

            $st = $c->prepare($query);

            if (!$st->execute()) {
                throw new Exception('Não foi possivel selecionar o estabelecimento');
            }

            foreach ($dados["metodologias"] as $dado) {
                $query = "INSERT INTO metodologias (icone, titulo, descricao) VALUES (:icone, :titulo, :descricao)";

                $st = $c->prepare($query);
                $st->bindParam(':icone', $dado->icone, PDO::PARAM_STR);
                $st->bindParam(':titulo', $dado->titulo, PDO::PARAM_STR);
                $st->bindParam(':descricao', $dado->descricao, PDO::PARAM_STR);

                if (!$st->execute()) {
                    throw new Exception('Não foi possivel selecionar o estabelecimento');
                }
            }

            $query = "DELETE FROM segmentos";

            $st = $c->prepare($query);

            if (!$st->execute()) {
                throw new Exception('Não foi possivel selecionar o estabelecimento');
            }

            foreach ($dados["segmentos"] as $dado) {
                $query = "INSERT INTO segmentos (nome) VALUES (:nome)";

                $st = $c->prepare($query);
                $st->bindParam(':nome', $dado->nome, PDO::PARAM_STR);

                if (!$st->execute()) {
                    throw new Exception('Não foi possivel selecionar o estabelecimento');
                }
            }

            foreach ($dados["planos"] as $dado) {
                $dado->topicos = json_encode($dado->topicos);

                $query = "UPDATE planos SET
                        nome = :nome,
                        descricao = :descricao,
                        topicos = :topicos
                    WHERE id = :id
                ";

                $st = $c->prepare($query);
                $st->bindParam(':id', $dado->id, PDO::PARAM_STR);
                $st->bindParam(':nome', $dado->nome, PDO::PARAM_STR);
                $st->bindParam(':descricao', $dado->descricao, PDO::PARAM_STR);
                $st->bindParam(':topicos', $dado->topicos, PDO::PARAM_STR);

                if (!$st->execute()) {
                    throw new Exception('Não foi possivel selecionar o estabelecimento');
                }
            }

            return $return;
        } catch (Exception $e) {
            Logger::logError($e);
            throw $e;
        }
    }
}
