import { useState, useEffect } from "react";
import axios from "axios";
import { Title, Grid, Card, Badge, Group, Space } from "@mantine/core";

function Tvshows() {
  const [tvshows, setTvshows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tvshows")
      .then((response) => {
        setTvshows(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Title order={3} align="center">
        Tvshows
      </Title>
      <Space h="20px" />
      <Grid>
        {tvshows
          ? tvshows.map((tvshow) => {
              return (
                <Grid.Col key={tvshow._id} span={4}>
                  <Card withBorder shadow="sm">
                    <Title order={5}>{tvshow.title}</Title>
                    <Space h="20px" />
                    <Group position="center" spacing="5px">
                      <Badge color="green">{tvshow.creator}</Badge>
                      <Badge color="dark">{tvshow.genre}</Badge>
                      <Badge color="yellow">{tvshow.rating}</Badge>
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

export default Tvshows;
