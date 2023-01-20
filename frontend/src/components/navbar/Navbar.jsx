import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NavItem from "./NavbarItem/NavItem";
import logo from "../../image/P.png";
import { CiFaceSmile, CiHeart, CiSearch, CiShoppingCart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  // GetToQueryProduct,
  GetToSearchQueryProduct,
} from "../../redux/prod/prod.action";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  let [query, setQuery] = useState();

  const handleSearch = () => {
    if (!query) {
      return alert("Your Query is empty");
    }

    dispatch(GetToSearchQueryProduct(query));
    
    Navigate("/productmain", { state: { q: "S", query } });
    // console.log(query);
  };

  return (
    <Flex
      w="100%"
      m="auto"
      pl="18px"
      pr="18px"
      position={"sticky"}
      top="0px"
      zIndex={999}
      bg="white"
      boxShadow="base"
      // p="6"
      rounded="md"
      mb="5px"
      // bg="white"
    >
      <Box p="4">
        <Link to="/">
          <Image
            boxSize="60px"
            borderRadius={"5px"}
            w="80px"
            h="40px"
            objectFit="cover"
            src={logo}
            alt="logo"
          />
        </Link>
      </Box>
      <Spacer />
      <Box p="4">
        <NavItem />
      </Box>

      <Spacer />
      <Box p="4">
        <Flex>
          <Box>
            <Flex>
              {" "}
              <Button
                ref={btnRef}
                colorScheme="white"
                bg={"white"}
                color="black"
                onClick={onOpen}
              >
                <Text color={"black"} fontWeight="light" fontSize="40px">
                  <CiSearch />
                </Text>
              </Button>
              <Drawer
                isOpen={isOpen}
                placement="top"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader mt="15px" fontWeight={"light"} m="auto" w="80%">
                    Search for Product and Brands{" "}
                  </DrawerHeader>

                  <DrawerBody m="auto" mt="5px" w="80%">
                    <Flex cursor={"pointer"}>
                      <Input
                        // variant="outline"
                        variant="flushed"
                        borderRadius={"1px"}
                        borderBottomColor={"#fd1d92"}
                        focusBorderColor="#fd1d92"
                        placeholder="Type here..."
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <Text
                        ml="-10px"
                        pt="10px"
                        fontSize={"30px"}
                        color="#fd1d92"
                        bg="white"
                        onClick={handleSearch}
                      >
                        <CiSearch />
                      </Text>
                    </Flex>
                  </DrawerBody>

                  <DrawerFooter></DrawerFooter>
                </DrawerContent>
              </Drawer>
            </Flex>
          </Box>
          <Box color={"black"} fontWeight="light" fontSize="40px">
            <CiHeart />
          </Box>

          <Box color={"black"} fontWeight="light" fontSize="40px">
            <CiFaceSmile />
          </Box>

          <Box
            color={"black"}
            fontWeight="light"
            fontSize="40px"
            cursor={"pointer"}
          >
            <Link to="/cart">
              <CiShoppingCart />
            </Link>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
