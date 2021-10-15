import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { fetchArtworks } from "../../store/artworks/actions";
import { selectArtworks } from "../../store/artworks/selectors";
import ArtworkCard from "../../components/ArtworkCard";

export default function HomePage() {
  const dispatch = useDispatch();
  const artworks = useSelector(selectArtworks);

  useEffect(() => {
    if (!artworks.length) {
      dispatch(fetchArtworks());
    }
  }, [dispatch, artworks.length]);

  return (
    <Container>
      <Jumbotron>
        <h1>Artworks</h1>
      </Jumbotron>

      {artworks.map((artwork) => {
        return (
          <ArtworkCard
            key={artwork.id}
            id={artwork.id}
            imageUrl={artwork.imageUrl}
            title={artwork.title}
            hearts={artwork.hearts}
            numberOfBid={artwork.bids.length}
          />
        );
      })}
    </Container>
  );
}
