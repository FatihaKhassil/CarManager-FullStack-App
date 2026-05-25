import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import Register from './Components/Register';
import Login from './Components/Login';
import Analyse from './Components/Analyse';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container fluid style={{ maxWidth: '1280px', marginTop: '20px' }}>
        <Row>
          <Col lg={12}>
            <Routes>
              <Route path="/" element={<Bienvenue />} />
              <Route path="/add" element={<Voiture />} />
              <Route path="/edit/:id" element={<Voiture />} />
              <Route path="/list" element={<VoitureListe />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/analyse" element={<Analyse />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
