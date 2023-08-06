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
                            $plan_id = "plan_qeo39GvtptoMdZEa";
                            break;
                        case 1:
                            $plan_id = "plan_qeo39GvtptoMdZEa";
                            break;
                        case 2:
                            $plan_id = "plan_qeo39GvtptoMdZEa";
                            break;
                    }

                    $body = json_decode('{
                      "customer": {
                        "name": "' . $post["pessoal"]->nome . '",
                        "email": "' . $post["pessoal"]->email . '",
                        "document": "' . $post["pessoal"]->cpfcnpj . '",
                        "document_type": "' . (strlen($post["pessoal"]->cpfcnpj) > 11 ? "CNPJ" : "CPF") . '",
                        "type": "' . (strlen($post["pessoal"]->cpfcnpj) > 11 ? "company" : "individual") . '"
                      },
                      "card": {
                        "billing_address": {
                          "line_1": "' . $post["cobranca"]->numerocobranca . ', ' . $post["cobranca"]->logradouro . ', ' . $post["cobranca"]->bairrocobranca . '",
                          "line_2": "' . $post["cobranca"]->complementocobranca . '",
                          "zip_code": "' . $post["cobranca"]->cep . '",
                          "city": "' . $post["cobranca"]->cidadecobranca . '",
                          "state": "' . $post["cobranca"]->estadocobranca . '",
                          "country": "BR"
                        },
                        "number": "' . $post["cartao"]->numerocartao . '",
                        "holder_name": "' . $post["cartao"]->nomecartao . '",
                        "exp_month": ' . (substr($post["cartao"]->validade, 0, 2) * 1) . ',
                        "exp_year": ' . (substr($post["cartao"]->validade, 2) * 1) . ',
                        "cvv": "' . $post["cartao"]->cvv . '"
                      },
                      "code": "",
                      "plan_id": "' . $plan_id . '",
                      "payment_method": "credit_card",
                      "start_at": "' . date('Y-m-d') . '",
                      "installments": 1
                    }');

                    $pagamento = PagarMeHelper::newSubscriptions($body);
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
                            "name": "' . $post["pessoal"]->nome . '",
                            "email": "' . $post["pessoal"]->email . '",
                            "document": "' . $post["pessoal"]->cpfcnpj . '",
                            "document_type": "' . (strlen($post["pessoal"]->cpfcnpj) > 11 ? "CNPJ" : "CPF") . '",
                            "type": "' . (strlen($post["pessoal"]->cpfcnpj) > 11 ? "company" : "individual") . '"
                        },
                        "payments": [
                            {
                                "payment_method": "credit_card",
                                "credit_card": {
                                    "recurrence": false,
                                    "installments": 1,
                                    "card": {
                                        "number": "' . $post["cartao"]->numerocartao . '",
                                        "holder_name": "' . $post["cartao"]->nomecartao . '",
                                        "exp_month": ' . (substr($post["cartao"]->validade, 0, 2) * 1) . ',
                                        "exp_year": ' . (substr($post["cartao"]->validade, 2) * 1) . ',
                                        "cvv": "' . $post["cartao"]->cvv . '"
                                        "billing_address": {
                                            "line_1": "' . $post["cobranca"]->numerocobranca . ', ' . $post["cobranca"]->logradouro . ', ' . $post["cobranca"]->bairrocobranca . '",
                                            "line_2": "' . $post["cobranca"]->complementocobranca . '",
                                            "zip_code": "' . $post["cobranca"]->cep . '",
                                            "city": "' . $post["cobranca"]->cidadecobranca . '",
                                            "state": "' . $post["cobranca"]->estadocobranca . '",
                                            "country": "BR"
                                        },
                                    }
                                }
                            }
                        ]
                    }');

                    $pagamento = PagarMeHelper::newOrder($body);
                }

                if (array_key_exists("message", $pagamento)) {
                    $mensagem = "";

                    foreach ($pagamento["errors"] as $K => $V) {
                        if ($V[0] == "The email field is not a valid e-mail address.") {
                            $mensagem .= "Endereço de e-mail informado invalido.\n";
                        } elseif (
                            $V[0] == "The number field is not a valid card number"
                            || $V[0] == "The field number must be a string with a minimum length of 13 and a maximum length of 19."
                        ) {
                            $mensagem .= "Número do cartão informado invalido.\n";
                        } else {
                            $mensagem .= "$V[0]\n";
                        }
                    }

                    throw new Exception($mensagem);
                }

                if (array_key_exists("status", $pagamento) && $pagamento["status"] == "failed") {
                    throw new Exception("Pagamento recusado: Revise os dados preenchidos. Utilize somente cartão físico, não aceitamos cartão virtual.");
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
