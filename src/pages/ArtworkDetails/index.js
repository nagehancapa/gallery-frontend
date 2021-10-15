import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import {
  fetchArtworkById,
  updateNumberOfHearts,
} from "../../store/artworkDetails/actions";
import { selectArtworkDetails } from "../../store/artworkDetails/selectors";

import NewBidForm from "../../components/NewBidForm";

export default function ArtworkDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const artworkDetails = useSelector(selectArtworkDetails);

  useEffect(() => {
    dispatch(fetchArtworkById(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Jumbotron>
        <h1>{artworkDetails.title}</h1>
      </Jumbotron>

      <Row>
        <Card>
          <Image src={artworkDetails.imageUrl} alt="preview" thumbnail />
          <Container>
            <Row>
              <Col>
                {artworkDetails.hearts}
                <span role="img" aria-label="heart">
                  &#128150;
                </span>
              </Col>
              <Col>
                <Button onClick={() => dispatch(updateNumberOfHearts(id))}>
                  Give heart
                </Button>
              </Col>
            </Row>
          </Container>
        </Card>
        <Col>
          <Card border="secondary">
            <Card.Header>
              {" "}
              <span role="img" aria-label="Money-Mouth Face">
                &#129297;
              </span>{" "}
              Bids{" "}
              <span role="img" aria-label="Money-Mouth Face">
                &#129297;
              </span>
            </Card.Header>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>email</th>
                  <th>Bid (€)</th>
                </tr>
              </thead>
              {artworkDetails.bids &&
                artworkDetails.bids.map((bid) => {
                  return (
                    <tbody key={bid.id}>
                      <tr>
                        <td>{bid.email}</td>
                        <td>{bid.amount}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
            <NewBidForm
              bids={artworkDetails.bids}
              minimumBid={artworkDetails.minimumBid}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
