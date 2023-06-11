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
}
