package org.cours.modele;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UtilisateurRepo extends CrudRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmail(String email);
}
