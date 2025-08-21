<?php
header('Content-Type: application/json');

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

if (!$name || !$email || !$message) {
    echo json_encode(['success' => false, 'error' => 'Tous les champs sont requis.']);
    exit;
}

// Exemple simple d'envoi par mail
$to = "ton-email@exemple.com";
$subject = "Nouveau message depuis le site";
$body = "Nom: $name\nEmail: $email\nMessage:\n$message";
$headers = "From: $email";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Impossible d’envoyer le mail.']);
}
?>
