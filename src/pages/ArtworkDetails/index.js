import React, { useEffect, useState } from "react";
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
import Form from "react-bootstrap/Form";
import {
  fetchArtworkById,
  updateNumberOfHearts,
  postBid,
} from "../../store/artworkDetails/actions";
import { selectArtworkDetails } from "../../store/artworkDetails/selectors";
import { selectUser } from "../../store/user/selectors";
import { showMessageWithTimeout } from "../../store/appState/actions";

export default function ArtworkDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const artworkDetails = useSelector(selectArtworkDetails);
  const user = useSelector(selectUser);

  const [newBid, setNewBid] = useState(0);

  useEffect(() => {
    dispatch(fetchArtworkById(id));
  }, [dispatch, id]);

  // get the actual values of the bids into an array.
  const bids = artworkDetails.bids.map((bid) => bid.amount);

  // check what should be the minimum bid
  const minBid = bids.length ? Math.max(...bids) : artworkDetails.minimumBid;

  // update the value of the state with the minBid.
  useEffect(() => {
    setNewBid(minBid + 1 || 0);
  }, [minBid]);

  function makeBid(event) {
    event.preventDefault();
    if (newBid < minBid) {
      console.log("bid to low");
      dispatch(
        showMessageWithTimeout("danger", false, "Your bid is too low", 3000)
      );
      return null;
    }
    dispatch(postBid(id, newBid));
  }

  return (
    <>
      <Jumbotron>
        <h1>{artworkDetails.title}</h1>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <Image src={artworkDetails.imageUrl} alt="preview" thumbnail />
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
          </Col>
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
              {user.token && (
                <Form as={Col} md={{ span: 6, offset: 3 }}>
                  <Form.Group>
                    <Form.Label>Amount €</Form.Label>
                    <Form.Control
                      value={newBid}
                      onChange={(event) => setNewBid(event.target.value)}
                      type="number"
                      placeholder={minBid}
                      required
                    />
                  </Form.Group>{" "}
                  <Form.Group className="mt-5">
                    <Button variant="primary" type="submit" onClick={makeBid}>
                      Bid
                    </Button>
                  </Form.Group>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
