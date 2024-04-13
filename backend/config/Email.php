<?php

require dirname(__FILE__) . "/../vendor/phpmailer/phpmailer/PHPMailerAutoload.php";

class Email extends PHPMailer
{

    public function __construct()
    {
        parent::__construct();

        $this->IsSMTP();
        $this->Host = "br1130.hostgator.com.br";
        $this->SMTPAuth = true;
        $this->SMTPSecure = 'ssl';
        $this->Username = "atendimento@odontoguard.com.br";
        $this->Password = "5Tcx-n!rA7yj";
        $this->Port = 465;
        $this->exceptions = true;
        $this->setFrom("atendimento@odontoguard.com.br", "Atendimento - OdontoGuard");

        $this->IsHtml(true);
        $this->exceptions = true;
        $this->CharSet = "utf-8";
    }

    public function setAssunto($assunto)
    {
        $this->Subject = $assunto;
    }

    public function setMensagem($msg)
    {
        $this->Body = $msg;
    }
}
