<?php

class CrmController
{
    public function dados($request, $response)
    {
        try {
            $post = (array)json_decode($request->getBody());

            try {
                $dao = new SiteDao();
                $dao->putDados($post);
            } catch (Exception $e) {
                throw $e;
            }

            $responseNew = $response->withStatus(200);
        } catch (Exception $e) {
            $responseNew = $response->withStatus(500)->withJson($e->getMessage());
        }

        return $responseNew;
    }
}
