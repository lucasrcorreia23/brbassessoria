<?php

class SiteController
{
    public function site($request, $response)
    {
        try {
            try {
                $dao = new SiteDao();
                $data = $dao->getDados();
            } catch (Exception $e) {
                throw $e;
            }

            $responseNew = $response->withJson($data);
        } catch (Exception $e) {
            $responseNew = $response->withStatus(500)->withJson($e->getMessage());
        }

        return $responseNew;
    }

    public function pagar($request, $response)
    {
        try {
            try {
                $post = (array)json_decode($request->getBody());

                throw new Exception("Problema no pagamento");

                $data = $post;
            } catch (Exception $e) {
                throw $e;
            }

            $responseNew = $response->withJson($data);
        } catch (Exception $e) {
            $responseNew = $response->withStatus(500)->withJson($e->getMessage());
        }

        return $responseNew;
    }
}
