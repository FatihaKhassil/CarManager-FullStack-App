import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default class Analyse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      selectedId: '',
      marque: '',
      modele: '',
      annee: '',
      prix: '',
      result: null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:9090/api/voitures')
      .then(response => {
        this.setState({ voitures: response.data._embedded?.voitures || [] });
      })
      .catch(() => {});
  }

  handleSelectVoiture = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      this.setState({ selectedId: '', marque: '', modele: '', annee: '', prix: '', result: null });
      return;
    }
    const voiture = this.state.voitures.find(
      v => v._links.self.href.split('/').pop() === selectedId
    );
    if (voiture) {
      this.setState({
        selectedId,
        marque: voiture.marque,
        modele: voiture.modele,
        annee: voiture.annee,
        prix: voiture.prix,
        result: null
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, result: null });
  }

  analyser = (e) => {
    e.preventDefault();
    const annee = Number(this.state.annee);
    const prix = Number(this.state.prix);
    const age = new Date().getFullYear() - annee;

    let status, conseil, attention;

    if (age <= 3) {
      status = prix <= 350000 ? 'cohérent' : 'élevé';
      conseil = status === 'cohérent'
        ? 'Prix adapté pour un véhicule récent. Bonne valeur sur le marché.'
        : 'Le prix est élevé pour un véhicule récent. Une comparaison avec le marché est conseillée.';
      attention = 'Vérifier que le kilométrage est cohérent avec l\'âge du véhicule.';
    } else if (age <= 7) {
      status = prix <= 150000 ? 'cohérent' : 'élevé';
      conseil = status === 'cohérent'
        ? 'Le prix semble adapté à l\'âge du véhicule.'
        : 'Le prix paraît élevé pour un véhicule de cet âge. Une négociation est envisageable.';
      attention = 'Vérifier l\'état mécanique et le kilométrage.';
    } else if (age <= 15) {
      status = prix <= 80000 ? 'cohérent' : 'élevé';
      conseil = status === 'cohérent'
        ? 'Bon rapport qualité/prix pour l\'âge du véhicule.'
        : 'Ce prix semble élevé pour un véhicule de plus de 7 ans. Négociation possible.';
      attention = 'Faire inspecter l\'état mécanique et la carrosserie par un professionnel.';
    } else {
      status = prix <= 40000 ? 'cohérent' : 'à évaluer';
      conseil = status === 'cohérent'
        ? 'Prix raisonnable pour un véhicule ancien.'
        : 'Comparer avec des offres similaires sur le marché.';
      attention = 'Vérifier l\'état mécanique complet, la carrosserie et l\'historique du véhicule.';
    }

    this.setState({ result: { status, conseil, attention } });
  }

  render() {
    const { voitures, selectedId, marque, modele, annee, prix, result } = this.state;

    const alertVariant = result
      ? (result.status === 'cohérent' ? 'success' : result.status === 'élevé' ? 'danger' : 'warning')
      : null;

    return (
      <Card className="app-card">
        <Card.Header className="app-card-header">
          <FontAwesomeIcon icon={faChartBar} /> Analyse du Prix
        </Card.Header>

        <Card.Body className="p-4">
          <Form onSubmit={this.analyser}>
            {voitures.length > 0 && (
              <Form.Group className="mb-4">
                <Form.Label>Sélectionner une voiture existante (optionnel)</Form.Label>
                <Form.Select
                  value={selectedId}
                  onChange={this.handleSelectVoiture}
                  className="app-input"
                >
                  <option value="">-- Saisie manuelle --</option>
                  {voitures.map((v, i) => (
                    <option key={i} value={v._links.self.href.split('/').pop()}>
                      {v.marque} {v.modele} ({v.annee}) — {Number(v.prix).toLocaleString('fr-MA')} DH
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Row className="mb-4">
              <Col md={3} sm={6} className="mb-3">
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  type="text"
                  name="marque"
                  value={marque}
                  onChange={this.handleChange}
                  placeholder="Ex: Toyota"
                  className="app-input"
                />
              </Col>
              <Col md={3} sm={6} className="mb-3">
                <Form.Label>Modèle</Form.Label>
                <Form.Control
                  type="text"
                  name="modele"
                  value={modele}
                  onChange={this.handleChange}
                  placeholder="Ex: Corolla"
                  className="app-input"
                />
              </Col>
              <Col md={3} sm={6} className="mb-3">
                <Form.Label>Année <span style={{ color: '#ef4444' }}>*</span></Form.Label>
                <Form.Control
                  type="number"
                  name="annee"
                  value={annee}
                  onChange={this.handleChange}
                  placeholder="Ex: 2018"
                  required
                  min="1950"
                  max={new Date().getFullYear()}
                  className="app-input"
                />
              </Col>
              <Col md={3} sm={6} className="mb-3">
                <Form.Label>Prix (DH) <span style={{ color: '#ef4444' }}>*</span></Form.Label>
                <Form.Control
                  type="number"
                  name="prix"
                  value={prix}
                  onChange={this.handleChange}
                  placeholder="Ex: 95000"
                  required
                  min="0"
                  className="app-input"
                />
              </Col>
            </Row>

            <Button type="submit" className="btn-primary px-4">
              <FontAwesomeIcon icon={faMagnifyingGlass} /> Analyser
            </Button>
          </Form>

          {result && (
            <div className="analyse-result-box">
              <Alert variant={alertVariant}>
                <h5>
                  Analyse : prix{' '}
                  <strong>
                    {result.status === 'cohérent' ? '✓ cohérent' : result.status === 'élevé' ? '⚠ élevé' : '~ à évaluer'}
                  </strong>
                  {marque && modele && (
                    <span style={{ fontWeight: 'normal', fontSize: '0.9rem', marginLeft: '8px' }}>
                      — {marque} {modele} ({annee})
                    </span>
                  )}
                </h5>
                <hr />
                <p><strong>Conseil :</strong> {result.conseil}</p>
                <p className="mb-0"><strong>Point d'attention :</strong> {result.attention}</p>
              </Alert>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
}
