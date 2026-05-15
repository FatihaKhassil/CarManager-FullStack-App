package org.cours.modele;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RepositoryRestResource
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    List<Voiture> findByModele(@Param("modele") String modele);

    List<Voiture> findByCouleur(@Param("couleur") String couleur);
}