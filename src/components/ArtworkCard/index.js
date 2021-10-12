import React from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Space(props) {
  return (
    <>
      <Card border="secondary">
        <Col className="mt-4" md={{ span: 8, offset: 2 }}>
          <Image src={props.imageUrl} alt="preview" thumbnail />
        </Col>
        <h1>{props.title}</h1>
        <Link to={`/artworks/${props.id}`}>
          <Button>See details</Button>
        </Link>
        <Container>
          <Row>
            <Col>
              {props.hearts}
              <span role="img" aria-label="heart">
                &#10084;
              </span>
            </Col>
            <Col>
              {props.numberOfBid}
              <span role="img" aria-label="Money-Mouth Face">
                &#129297;
              </span>
            </Col>
          </Row>
        </Container>
      </Card>
      <br />
    </>
  );
}
