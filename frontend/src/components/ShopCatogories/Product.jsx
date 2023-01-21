import React, { useEffect, useState } from "react";
// import axios from "axios";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import {
  GetToProduct,
  GetToQueryProduct,
  GetToSearchQueryProduct,
} from "../../redux/prod/prod.action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import ProductFunctionality from "./ProductFunctionality";
// The default icon size is 1em (16px)

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [length, setLength] = useState(20);
  const [mapData, setMapData] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const { prod } = useSelector((store) => store);

  const setLengthFunction = () => {
    // console.log("bjabxh");
    setMapData(prod.data.slice(0, length));
  };

  const getData = () => {
    if (!location.state) {
      return dispatch(GetToProduct());
    }
    // console.log(location.state);
    if (location.state.q === "S") {
      dispatch(GetToSearchQueryProduct(location.state.query));
    } else if (location.state.q === "N") {
      dispatch(GetToQueryProduct(location.state.query));
    }
  };

  const sortFilterFunc = (value) => {
    if (value === "1") {
      let updated = prod.data.map((el) => {
        return el;
      });
      updated.sort((a, b) => a.price - b.price);
      //   console.log(updated);

      dispatch({ type: "UPDATED", payload: updated });
    } else if (value === "2") {
      let updated = prod.data.map((el) => {
        return el;
      });
      updated.sort((a, b) => b.price - a.price);

      dispatch({ type: "UPDATED", payload: updated });
    } else if (value === "3") {
      let updated = prod.data.map((el) => {
        return el;
      });
      updated.sort((a, b) => b.rating - a.rating);

      dispatch({ type: "UPDATED", payload: updated });
    } else if (value === "4") {
      dispatch(GetToQueryProduct("foundation"));
    } else if (value === "5") {
      dispatch(GetToQueryProduct("lipstick"));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setProductData(prod.data);
    setLengthFunction();

    // console.log(mapData);
  }, [prod]);

  useEffect(() => {
    setLengthFunction();
  }, [length]);

  if (!productData.length > 0) {
    return (
      <Stack>
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />

        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />

        <Skeleton height="20px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />

        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    );
  }

  return (
    <Box>
      <Box>
        <ProductFunctionality sortFilterFunc={sortFilterFunc} />
      </Box>{" "}
      <SimpleGrid
        minChildWidth="230px"
        spacing="40px"
        w="95%"
        m="auto"
        mt="30px"
      >
        {mapData &&
          mapData.map((prod) => {
            return (
              <Box
                key={prod._id}
                border="1px"
                borderColor={"gray.200"}
                m="auto"
                p="3"
                w="100%"
                cursor="pointer"
                height="auto"
                boxShadow={` rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;`}
              >
                <Link to={`/productmain/${prod._id}`}>
                  {" "}
                  <Image
                    src={prod.image_link}
                    alt="naruto"
                    w="100%"
                    m="auto"
                    h="200px"
                  />
                </Link>
                <Text fontSize="15px" fontWeight="600" textAlign={"left"}>
                  {prod.name}
                </Text>
                <Text fontSize="15px" fontWeight="600" textAlign={"left"}>
                  {" "}
                  Price - {prod.price}
                </Text>
                <Button
                  bg="#fd1d92"
                  borderRadius={"35px"}
                  fontSize="15px"
                  h="30px"
                  mt="3px"
                  color={"white"}
                  fontWeight="light"
                  textAlign={"center"}
                  _hover={{ bg: "#fd1d65" }}
                >
                  {" "}
                  {prod.rating}{" "}
                  <StarIcon color={"white"} pl="5px" fontSize={"18px"} />
                </Button>
              </Box>
            );
          })}
      </SimpleGrid>
      <Box>
        <Button
          onClick={() => {
            setLength(length + length);
          }}
          bg="#fd1d92"
        >
          LoadMore
        </Button>
      </Box>
    </Box>
  );
};

export default Product;
