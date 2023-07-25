<?php
$app->get('/site', \SiteController::class . ':site');
$app->post('/site/pagar', \SiteController::class . ':pagar');
