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

                if ($post["tipo"] < 3) {
                    $plan_id = "";

                    switch ($post["tipo"]) {
                        case 0:
                            $plan_id = "plan_MwbNO5JtvCYVGx3o";
                            break;
                        case 1:
                            $plan_id = "plan_MwbNO5JtvCYVGx3o";
                            break;
                        case 2:
                            $plan_id = "plan_MwbNO5JtvCYVGx3o";
                            break;
                    }

                    $body = json_decode('{
                      "customer": {
                        "name": "' . $post["nome"] . '",
                        "email": "' . $post["email"] . '",
                        "document": "' . $post["cpfcnpj"] . '",
                        "document_type": "' . (strlen($post["cpfcnpj"]) > 11 ? "CNPJ" : "CPF") . '",
                        "type": "' . (strlen($post["cpfcnpj"]) > 11 ? "company" : "individual") . '"
                      },
                      "card": {
                        "billing_address": {
                          "line_1": "' . $post["numerocobranca"] . ', ' . $post["logradouro"] . ', ' . $post["bairrocobranca"] . '",
                          "line_2": "' . $post["complementocobranca"] . '",
                          "zip_code": "' . $post["cep"] . '",
                          "city": "' . $post["cidadecobranca"] . '",
                          "state": "' . $post["estadocobranca"] . '",
                          "country": "BR"
                        },
                        "number": "' . $post["numerocartao"] . '",
                        "holder_name": "' . $post["nomecartao"] . '",
                        "exp_month": ' . (substr($post["validade"], 0, 2) * 1) . ',
                        "exp_year": ' . (substr($post["validade"], 2) * 1) . ',
                        "cvv": "' . $post["cvv"] . '"
                      },
                      "code": "",
                      "plan_id": "' . $plan_id . '",
                      "payment_method": "credit_card",
                      "start_at": "' . date('Y-m-d') . '",
                      "installments": 1
                    }');

                    $teste = PagarMeHelper::newSubscriptions($body);

                    if (array_key_exists("message", $teste)) {
                        $mensagem = "";

                        foreach ($teste["errors"] as $K => $V) {
                            if ($V[0] == "The email field is not a valid e-mail address.") {
                                $mensagem .= "Endereço de e-mail informado invalido.\n";
                            } elseif ($V[0] == "The number field is not a valid card number") {
                                $mensagem .= "Número do cartão informado invalido.\n";
                            } else {
                                $mensagem .= "$V[0]\n";
                            }
                        }

                        throw new Exception($mensagem);
                    }
                } else {
                    $body = json_decode('{
                        "items": [
                            {
                                "amount": 9900,
                                "description": "Relatório processual",
                                "quantity": 1
                            }
                        ],
                        "customer": {
                            "name": "' . $post["nome"] . '",
                            "email": "' . $post["email"] . '",
                            "document": "' . $post["cpfcnpj"] . '",
                            "document_type": "' . (strlen($post["cpfcnpj"]) > 11 ? "CNPJ" : "CPF") . '",
                            "type": "' . (strlen($post["cpfcnpj"]) > 11 ? "company" : "individual") . '"
                        },
                        "payments": [
                            {
                                "payment_method": "credit_card",
                                "credit_card": {
                                    "recurrence": false,
                                    "installments": 1,
                                    "card": {
                                        "number": "' . $post["numerocartao"] . '",
                                        "holder_name": "' . $post["nomecartao"] . '",
                                        "exp_month": ' . (substr($post["validade"], 0, 2) * 1) . ',
                                        "exp_year": ' . (substr($post["validade"], 2) * 1) . ',
                                        "cvv": "' . $post["cvv"] . '"
                                        "billing_address": {
                                            "line_1": "' . $post["numerocobranca"] . ', ' . $post["logradouro"] . ', ' . $post["bairrocobranca"] . '",
                                            "line_2": "' . $post["complementocobranca"] . '",
                                            "zip_code": "' . $post["cep"] . '",
                                            "city": "' . $post["cidadecobranca"] . '",
                                            "state": "' . $post["estadocobranca"] . '",
                                            "country": "BR"
                                        },
                                    }
                                }
                            }
                        ]
                    }');

                    $teste = PagarMeHelper::newOrder($body);

                    if (array_key_exists("message", $teste)) {
                        $mensagem = "";

                        foreach ($teste["errors"] as $K => $V) {
                            if ($V[0] == "The email field is not a valid e-mail address.") {
                                $mensagem .= "Endereço de e-mail informado invalido.\n";
                            } elseif ($V[0] == "The number field is not a valid card number") {
                                $mensagem .= "Número do cartão informado invalido.\n";
                            } else {
                                $mensagem .= "$V[0]\n";
                            }
                        }

                        throw new Exception($mensagem);
                    }
                }
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
