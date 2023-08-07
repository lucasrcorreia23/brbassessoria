<?php
$app->get('/site', \SiteController::class . ':site');
$app->post('/site/pagar', \SiteController::class . ':pagar');
$app->get('/site/cep', \SiteController::class . ':cep');
