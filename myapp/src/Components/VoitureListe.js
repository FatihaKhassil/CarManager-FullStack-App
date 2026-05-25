import React, { Component } from 'react';
import axios from 'axios';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = { voitures: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:9090/api/voitures')
      .then(response => {
        this.setState({ voitures: response.data._embedded.voitures });
      })
      .catch(error => console.log(error));
  }

  deleteVoiture = (voitureUrl) => {
    if (!window.confirm('Confirmer la suppression de cette voiture ?')) return;

    axios.delete(voitureUrl)
      .then(() => {
        this.setState({
          voitures: this.state.voitures.filter(v => v._links.self.href !== voitureUrl)
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { voitures } = this.state;

    return (
      <Card className="app-card">
        <Card.Header className="app-card-header">
          <FontAwesomeIcon icon={faList} /> Liste des Voitures
          {voitures.length > 0 && (
            <span className="badge-count ms-2">{voitures.length}</span>
          )}
        </Card.Header>

        <Card.Body className="p-0">
          <Table responsive className="voiture-table mb-0">
            <thead>
              <tr>
                <th>Marque</th>
                <th>Modèle</th>
                <th>Couleur</th>
                <th>Immatriculation</th>
                <th>Année</th>
                <th>Prix (DH)</th>
                <th style={{ width: '90px' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {voitures.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4" style={{ color: '#8b949e' }}>
                    Aucune voiture disponible
                  </td>
                </tr>
              ) : (
                voitures.map((voiture, index) => (
                  <tr key={index}>
                    <td><strong>{voiture.marque}</strong></td>
                    <td>{voiture.modele}</td>
                    <td><span className="couleur-badge">{voiture.couleur}</span></td>
                    <td style={{ fontFamily: 'monospace', letterSpacing: '0.03em' }}>{voiture.immatricule}</td>
                    <td>{voiture.annee}</td>
                    <td>{Number(voiture.prix).toLocaleString('fr-MA')} DH</td>
                    <td>
                      <ButtonGroup>
                        <Button
                          size="sm"
                          className="btn-action-edit"
                          href={`/edit/${voiture._links.self.href.split('/').pop()}`}
                          title="Modifier"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          size="sm"
                          className="btn-action-delete"
                          onClick={() => this.deleteVoiture(voiture._links.self.href)}
                          title="Supprimer"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
