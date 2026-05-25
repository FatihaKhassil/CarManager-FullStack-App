import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Button, Col, Row, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons';

export default class Voiture extends Component {

  constructor(props) {
    super(props);
    this.state = { ...this.initialState, show: false };
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
  }

  initialState = {
    id: '',
    marque: '',
    modele: '',
    couleur: '',
    immatricule: '',
    annee: '',
    prix: ''
  };

  componentDidMount() {
    const currentURL = window.location.href;
    if (currentURL.includes('/edit/')) {
      const id = currentURL.split('/edit/')[1];
      axios.get('http://localhost:9090/api/voitures/' + id)
        .then(response => {
          if (response.data != null) {
            this.setState({
              id,
              marque: response.data.marque,
              modele: response.data.modele,
              couleur: response.data.couleur,
              immatricule: response.data.immatricule,
              annee: response.data.annee,
              prix: response.data.prix
            });
          }
        });
    }
  }

  voitureChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  resetVoiture = () => {
    this.setState(() => this.initialState);
  }

  submitVoiture(event) {
    event.preventDefault();

    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: Number(this.state.annee),
      prix: Number(this.state.prix)
    };

    if (this.state.id) {
      axios.put('http://localhost:9090/api/voitures/' + this.state.id, voiture)
        .then(response => {
          if (response.data != null) {
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
          }
        });
    } else {
      axios.post('http://localhost:9090/api/voitures', voiture)
        .then(response => {
          if (response.data != null) {
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
            this.setState(this.initialState);
          }
        });
    }
  }

  render() {
    const { id, marque, modele, couleur, immatricule, annee, prix, show } = this.state;

    return (
      <div>
        <div className="toast-success-wrapper" style={{ display: show ? 'block' : 'none' }}>
          <Toast className="border text-white bg-success">
            <Toast.Header className="bg-success text-white">
              <strong className="me-auto">Succès</strong>
            </Toast.Header>
            <Toast.Body>Voiture enregistrée avec succès.</Toast.Body>
          </Toast>
        </div>

        <Card className="app-card">
          <Card.Header className="app-card-header">
            <FontAwesomeIcon icon={id ? faEdit : faPlusSquare} />
            {' '}{id ? 'Modifier une Voiture' : 'Ajouter une Voiture'}
          </Card.Header>

          <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture}>
            <Card.Body className="p-4">
              <Row className="mb-3">
                <Form.Group as={Col} md={4} controlId="formMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="marque"
                    value={marque}
                    onChange={this.voitureChange}
                    className="app-input"
                    placeholder="Ex: Toyota"
                  />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="formModele">
                  <Form.Label>Modèle</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="modele"
                    value={modele}
                    onChange={this.voitureChange}
                    className="app-input"
                    placeholder="Ex: Corolla"
                  />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="formCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="couleur"
                    value={couleur}
                    onChange={this.voitureChange}
                    className="app-input"
                    placeholder="Ex: Grise"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md={4} controlId="formImmatricule">
                  <Form.Label>Immatriculation</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="immatricule"
                    value={immatricule}
                    onChange={this.voitureChange}
                    className="app-input"
                    placeholder="Ex: A-1-9090"
                  />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="formAnnee">
                  <Form.Label>Année</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="number"
                    name="annee"
                    value={annee}
                    onChange={this.voitureChange}
                    className="app-input"
                    placeholder="Ex: 2018"
                  />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="formPrix">
                  <Form.Label>Prix (DH)</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="number"
                    name="prix"
                    value={prix}
                    onChange={this.voitureChange}
                    className="app-input"
                    placeholder="Ex: 95000"
                  />
                </Form.Group>
              </Row>
            </Card.Body>

            <Card.Footer style={{ backgroundColor: '#1f2937', borderTop: '1px solid #30363d', textAlign: 'right', padding: '14px 20px' }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Enregistrer
              </Button>
              <Button size="sm" variant="info" type="reset" style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faUndo} /> Réinitialiser
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
