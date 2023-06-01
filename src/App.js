import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Avatar,
  FormControl,
  Input,
  Button,
  FormLabel,
  Box,
  HStack,
  List,
  ListItem,
  Center,
} from "@chakra-ui/react";

function App() {
  const [poke, setPoke] = useState("");
  const [data, setData] = useState(null);

  const handlePoke = (event) => {
    setPoke(event.target.value);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const abc = axios
      .get(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`)
      .then((response) => {
        setData(response.data);
      });
  };

  return (
    <>
      <Heading as="h1">Pokemon Application</Heading>
      <HStack>
        <Box m="30px" p="60px" w="500px" border="1px solid">
          <form onSubmit={handleChange}>
            <FormControl>
              <FormLabel>Enter a Pokemon Name</FormLabel>
              <Input type="text" value={poke} onChange={handlePoke} />
              <Button type="submit">Submit</Button>
            </FormControl>
          </form>
        </Box>

        {data && (
          <Card p="40px" bg="green.200" border="1px solid" w="350px">
            <CardHeader>
              {
                <Heading as="h1" textAlign="center">
                  {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                </Heading>
              }
              <Center>
                <img
                  style={{ padding: "10px", height: "150px" }}
                  src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`}
                  alt="pokemon-pic"
                />
              </Center>
            </CardHeader>
            <CardBody>
              <Heading as="h3">Abilities</Heading>
              {data.abilities.map((ability) => (
                <Text>{ability.ability.name}</Text>
              ))}
              <Heading as="h3">Moves</Heading>
              {data.moves.slice(0, 3).map((move) => (
                <List>
                  <ListItem>{move.move.name}</ListItem>
                </List>
              ))}
            </CardBody>

            <CardFooter>
              <Avatar
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
              />
              <Avatar
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`}
              />
            </CardFooter>
          </Card>
        )}
      </HStack>
    </>
  );
}

export default App;
