import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Bienvenue extends React.Component {
  render() {
    return (
      <div className="welcome-section">
        <Row className="align-items-center w-100">
          <Col lg={6} md={12} className="mb-4 mb-lg-0">
            <h1 className="welcome-title">
              Bienvenue dans votre Magasin de Voitures
            </h1>

            <p className="welcome-paragraph">
              Découvrez notre sélection de véhicules de qualité.
              Gérez votre flotte, analysez les prix et trouvez la voiture idéale.
            </p>

            <blockquote className="welcome-quote">
              <p>"Le meilleur de nos voitures est exposé près de chez vous"</p>
              <span className="quote-source">— Master MIOLA</span>
            </blockquote>

            <div className="d-flex flex-wrap gap-3">
              <Link to="/list" className="btn btn-primary px-4">
                Voir les voitures
              </Link>
              <Link to="/add" className="btn btn-outline-success px-4">
                Ajouter une voiture
              </Link>
            </div>
          </Col>

          <Col lg={6} md={12} className="text-center">
            <img
              src="https://www.turbo.fr/sites/default/files/migration/folder/field_image/000000008631824.jpg"
              alt="Voiture de qualité"
              className="welcome-car-img"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Bienvenue;
