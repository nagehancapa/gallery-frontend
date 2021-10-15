import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { postBid } from "../../store/artworkDetails/actions";
import { useSelector, useDispatch } from "react-redux";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { selectUser } from "../../store/user/selectors";
import { Container } from "react-bootstrap";

export default function NewBidForm(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(selectUser);
  const [newBid, setNewBid] = useState(0);

  // get the actual values of the bids into an array.
  const bids = props.bids.map((bid) => bid.amount);

  // check what should be the minimum bid
  const minBid = bids.length ? Math.max(...bids) : props.minimumBid;

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
    <Container>
      {user.token && (
        <Row>
          <Form as={Col} md={{ span: 6, offset: 3 }}>
            <Col>
              <Form.Group>
                <Form.Label>Amount €</Form.Label>
                <Form.Control
                  value={newBid}
                  onChange={(event) => setNewBid(event.target.value)}
                  type="number"
                  placeholder={minBid}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mt-5">
                <Button variant="primary" type="submit" onClick={makeBid}>
                  Bid
                </Button>
              </Form.Group>
            </Col>
          </Form>
        </Row>
      )}
      <br />
    </Container>
  );
}
