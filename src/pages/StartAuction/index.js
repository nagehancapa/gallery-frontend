import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useDispatch } from "react-redux";
import { postArtwork } from "../../store/artworkDetails/actions";

export default function StartAuction() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [minimumBid, setMinimumBid] = useState(0);

  function submitForm(event) {
    event.preventDefault();
    dispatch(postArtwork(title, imageUrl, minimumBid));
    setTitle("");
    setMinimumBid("0");
    setImageUrl("");
  }

  return (
    <>
      <Jumbotron>
        <h1>Start an auction</h1>
      </Jumbotron>
      <Form as={Col} md={{ span: 6, offset: 3 }}>
        <h1 className="mt-5 mb-5">
          Post one of your artwork to start receiving offers
        </h1>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Title of the artwork"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Minimum bid</Form.Label>
          <Form.Control
            value={minimumBid}
            onChange={(event) => setMinimumBid(event.target.value)}
            type="number"
            placeholder="Minimum bid of the artwork"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image url</Form.Label>
          <Form.Control
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            type="text"
            placeholder="Image of the artwork"
            required
          />

          <Col className="mt-4" md={{ span: 8, offset: 2 }}>
            <Image src={imageUrl} alt="preview" thumbnail />
          </Col>
        </Form.Group>

        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Start auction
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
