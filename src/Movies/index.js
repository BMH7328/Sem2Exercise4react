import { useState, useEffect } from "react";
import axios from "axios";
import { Title, Grid, Card, Badge, Group, Space, Button } from "@mantine/core";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterMovie = async (genre = "") => {
    try {
      const response = await axios.get(
        "http://localhost:5000/movies?genre=" + genre
      );
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Title order={3} align="center">
        Movies
      </Title>
      <Space h="20px" />
      <Group>
        <Button
          onClick={() => {
            filterMovie("");
          }}
        >
          All
        </Button>
        <Button
          onClick={() => {
            filterMovie("Drama");
          }}
        >
          Drama
        </Button>
        <Button
          onClick={() => {
            filterMovie("Fantasy");
          }}
        >
          Fantasy
        </Button>
        <Button
          onClick={() => {
            filterMovie("Action");
          }}
        >
          Action
        </Button>
        <Button
          onClick={() => {
            filterMovie("Sci-Fi");
          }}
        >
          Sci-fi
        </Button>
      </Group>
      <Space h="20px" />
      <Grid>
        {movies
          ? movies.map((movie) => {
              return (
                <Grid.Col key={movie._id} span={4}>
                  <Card withBorder shadow="sm">
                    <Title order={5}>{movie.title}</Title>
                    <Space h="20px" />
                    <Group position="center" spacing="5px">
                      <Badge
                        variant="gradient"
                        gradient={{ from: "indigo", to: "purple" }}
                      >
                        {movie.director}
                      </Badge>
                      <Badge
                        variant="gradient"
                        gradient={{ from: "red", to: "blue" }}
                      >
                        {movie.genre}
                      </Badge>
                      <Badge color="yellow">{movie.rating}</Badge>
                    </Group>
                  </Card>
                </Grid.Col>
              );
            })
          : null}
      </Grid>
    </>
  );
}

export default Movies;
