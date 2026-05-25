package org.cours.web;

import org.cours.modele.Utilisateur;
import org.cours.modele.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepo utilisateurRepo;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Utilisateur utilisateur) {
        if (utilisateurRepo.findByEmail(utilisateur.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Cet email est déjà utilisé.");
        }
        utilisateurRepo.save(utilisateur);
        return ResponseEntity.ok("Inscription réussie.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String motDePasse = credentials.get("motDePasse");

        Optional<Utilisateur> user = utilisateurRepo.findByEmail(email);
        if (user.isPresent() && user.get().getMotDePasse().equals(motDePasse)) {
            return ResponseEntity.ok("Connexion réussie.");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect.");
    }
}
