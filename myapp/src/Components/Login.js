import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      motDePasse: '',
      message: null,
      messageType: null
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, motDePasse } = this.state;

    axios.post('http://localhost:9090/api/login', { email, motDePasse })
      .then(() => {
        this.setState({
          message: `Connexion réussie ! Bienvenue, ${email}`,
          messageType: 'success'
        });
      })
      .catch(err => {
        const msg = err.response?.data || 'Email ou mot de passe incorrect.';
        this.setState({ message: msg, messageType: 'danger' });
      });
  }

  render() {
    const { email, motDePasse, message, messageType } = this.state;

    return (
      <div className="auth-wrapper">
        <Card className="app-card auth-card">
          <Card.Header className="app-card-header">
            <FontAwesomeIcon icon={faUser} /> Connexion
          </Card.Header>

          <Card.Body>
            {message && (
              <Alert variant={messageType} className="mb-3">
                {message}
              </Alert>
            )}

            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Entrez votre email"
                  required
                  className="app-input"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="motDePasse"
                  value={motDePasse}
                  onChange={this.handleChange}
                  placeholder="Entrez votre mot de passe"
                  required
                  className="app-input"
                />
              </Form.Group>

              <Button type="submit" className="btn-primary w-100 py-2">
                Se connecter
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
