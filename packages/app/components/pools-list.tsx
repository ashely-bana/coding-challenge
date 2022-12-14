import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  useColorModeValue,
  SimpleGrid,
  Image,
  Grid,
  GridItem,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

import { chain, assets, asset_list } from '@chain-registry/osmosis';
import { PoolStore } from '../mobx/store'

interface PoolsData {
  id: string;
  token1: { name: string; imgSrc: string };
  token2: { name: string; imgSrc: string };
  poolLiquidity: number;
  apr: number;
  myLiquidity: number;
  myBoundedAmount: number;
  longestDaysUnbonding: boolean;
}

const PoolsCard = ({ poolsData }: { poolsData: PoolsData[] }) => {
  return (
    <SimpleGrid columns={{ sm: 2, lg: 4 }} gap={4} mb={8}>
      {poolsData.map(
        ({
          id,
          token1,
          token2,
          poolLiquidity,
          apr,
          myLiquidity,
          myBoundedAmount,
          longestDaysUnbonding,
        }) => {
          return (
            <Box
              key={id}
              borderRadius="lg"
              border="1px solid"
              borderColor={
                longestDaysUnbonding
                  ? useColorModeValue("primary.500", "primary.300")
                  : "transparent"
              }
              boxShadow="md"
              _hover={{
                cursor: "pointer",
                borderColor: longestDaysUnbonding
                  ? useColorModeValue("primary.500", "primary.300")
                  : "orange.300",
              }}
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              p={4}
            >
              <Flex align="center" mb={4}>
                <Flex
                  position="relative"
                  align="center"
                  pr={{ base: 10, sm: 14 }}
                >
                  <Box
                    w={{ base: 12, md: 14, lg: 16 }}
                    h={{ base: 12, md: 14, lg: 16 }}
                    bg="whiteAlpha.900"
                    borderRadius="full"
                    border="1px solid"
                    borderColor={useColorModeValue(
                      "primary.100",
                      "primary.900"
                    )}
                    overflow="hidden"
                    p={0.5}
                  >
                    <Image src={token1.imgSrc} />
                  </Box>
                  <Box
                    position="absolute"
                    left={{ base: 8, sm: 10 }}
                    w={{ base: 12, md: 14, lg: 16 }}
                    h={{ base: 12, md: 14, lg: 16 }}
                    bg="whiteAlpha.900"
                    borderRadius="full"
                    border="1px solid"
                    borderColor={useColorModeValue(
                      "primary.100",
                      "primary.900"
                    )}
                    overflow="hidden"
                    p={0.5}
                  >
                    <Image src={token2.imgSrc} />
                  </Box>
                </Flex>
                <Flex flexDirection="column" justify="center">
                  <Text fontSize="xl" fontWeight="extrabold">
                    Pools #{id}
                  </Text>
                  <Text
                    fontWeight="bold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                    wordBreak="break-word"
                  >
                    {token1.name}/{token2.name}
                  </Text>
                </Flex>
              </Flex>
              <Grid
                templateColumns={{ lg: "1fr 1fr" }}
                gap={{ base: 2, md: 4 }}
              >
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    Pool Liquidity
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                    wordBreak="break-word"
                  >
                    ${poolLiquidity.toLocaleString()}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    Apr
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    {apr}%
                  </Text>
                </GridItem>
                <GridItem colSpan={{ lg: 2 }}>
                  <Divider
                    borderColor={useColorModeValue(
                      "primary.300",
                      "primary.100"
                    )}
                  />
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    My Liquidity
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    ${myLiquidity}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    My Bounded Amount
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    ${myBoundedAmount}
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          );
        }
      )}
    </SimpleGrid>
  );
};

export default function ListPools(myPoolStore: PoolStore) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [poolsData, setPoolsData] = useState<PoolsData[]>([]);
  const [poolsDataAdd, setPoolsDataAdd] = useState<PoolsData>({
    id: '',
    token1: { name: '', imgSrc: '' },
    token2: { name: '', imgSrc: '' },
    poolLiquidity: 0,
    apr: 0,
    myLiquidity: 0,
    myBoundedAmount: 0,
    longestDaysUnbonding: true,
  });
  const [asset1, setAsset1] = useState<any>({
    name: '',
    imgSrc: ''
  });
  const [asset2, setAsset2] = useState<any>({
    name: '',
    imgSrc: ''
  });

  const handleChange1 = (event: any, key: string) => {
    // poolsDataAdd[key] = event.target.value
    // console.log(poolsDataAdd)
    // setPoolsDataAdd({ ...poolsDataAdd })
    // myPoolStore.PoolStore[key] = event.target.value
    myPoolStore.PoolStore.setValue(key, event.target.value)
    setPoolsDataAdd({ ...myPoolStore.PoolStore })
  }

  const handleChange2 = (event: any, key1: string, key2: string) => {
    // poolsDataAdd[key1][key2] = event.target.value
    // setPoolsDataAdd({ ...poolsDataAdd })
    console.log(asset1, asset2)
    if (key1 == 'token1') {
      if (key2 == 'name') {
        setAsset1(Object.assign(asset1, { name: event.target.value }))
      }
      if (key2 == 'imgSrc') {
        setAsset1(Object.assign(asset1, { imgSrc: event.target.value }))
      }
    }
    if (key1 == 'token2') {
      if (key2 == 'name') {
        setAsset2(Object.assign(asset2, { name: event.target.value }))
      }
      if (key2 == 'imgSrc') {
        setAsset2(Object.assign(asset2, { imgSrc: event.target.value }))
      }
    }
    myPoolStore.PoolStore.addPool(asset1, asset2)
    setPoolsDataAdd({ ...myPoolStore.PoolStore })
  }

  const closeModal = () => {
    // onClose();
    // const poolsDataArray = poolsData.concat([poolsDataAdd])
    // setPoolsData(poolsDataArray)
    onClose();
    const poolsDataArray = poolsData.concat({ ...myPoolStore.PoolStore })
    setPoolsData(poolsDataArray)
  }

  useEffect(() => {

    const getShuffledArr = (arr: any[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
      }
      return arr;
    };
    const allTokens = asset_list.assets.map(({ name, logo_URIs }) => ({
      name: name,
      imgSrc: logo_URIs.png,
    }));
    const poolOptionToken1 = getShuffledArr([...allTokens]);
    const poolOptionToken2 = getShuffledArr([...allTokens]).filter(
      (v, i) => v !== poolOptionToken1[i]
    );
    const getRandomId = getShuffledArr(
      [...Array(500)].map((v, i) => (v = i + 1))
    ).slice(0, 4);
    const getRandomPoolLiquidity = [...Array(4)].fill(undefined).map((_) => {
      return parseInt(
        getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
          .toString()
          .replaceAll(",", "")
      );
    });
    const getRandomMyLiquidity = [...Array(4)].fill(undefined).map((_) => {
      return parseInt(
        getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
          .toString()
          .slice(0, 5)
          .replaceAll(",", "")
      );
    });
    const getRandomAPR = [...Array(4)].fill(undefined).map((_) => {
      return (
        parseInt(
          getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .toString()
            .slice(0, 7)
            .replaceAll(",", "")
        ) / 100
      );
    });
    const getDefaultData = [...Array(4)].fill(undefined).map((_, i) => ({
      id: getRandomId[i],
      token1: poolOptionToken1[i],
      token2: poolOptionToken2[i],
      poolLiquidity: getRandomPoolLiquidity[i],
      apr: getRandomAPR[i],
      myLiquidity: getRandomMyLiquidity[i],
      myBoundedAmount: getRandomMyLiquidity[i],
      longestDaysUnbonding: Math.random() < 0.5,
    }));
    // console.log("getRandomAPR", getDefaultData);
    setPoolsData(getDefaultData);

  }, []);

  return (
    <Box p={4}>
      <Flex align="center" mb={6}>
        <Heading as="h2" fontSize="2xl" mr={4}>
          Active Pools
        </Heading>
        <Button display={{ base: "none", sm: "block" }} onClick={onOpen}>Create New Pool</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>MAdd Pools</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>id</FormLabel>
              <Input value={myPoolStore.PoolStore.id} onChange={(event) => handleChange1(event, 'id')} />
            </FormControl>
            <FormControl>
              <FormLabel>token1.name</FormLabel>
              <Input value={myPoolStore.PoolStore.token1.name} onChange={(event) => handleChange2(event, 'token1', 'name')} />
            </FormControl>
            <FormControl>
              <FormLabel>token1.imgSrc</FormLabel>
              <Input value={myPoolStore.PoolStore.token1.imgSrc} onChange={(event) => handleChange2(event, 'token1', 'imgSrc')} />
            </FormControl>
            <FormControl>
              <FormLabel>token2.name</FormLabel>
              <Input value={myPoolStore.PoolStore.token2.name} onChange={(event) => handleChange2(event, 'token2', 'name')} />
            </FormControl>
            <FormControl>
              <FormLabel>token2.imgSrc</FormLabel>
              <Input value={myPoolStore.PoolStore.token2.imgSrc} onChange={(event) => handleChange2(event, 'token2', 'imgSrc')} />
            </FormControl>
            <FormControl>
              <FormLabel>poolLiquidity</FormLabel>
              <Input value={myPoolStore.PoolStore.poolLiquidity} onChange={(event) => handleChange1(event, 'poolLiquidity')} />
            </FormControl>
            <FormControl>
              <FormLabel>apr</FormLabel>
              <Input value={myPoolStore.PoolStore.apr} onChange={(event) => handleChange1(event, 'apr')} />
            </FormControl>
            <FormControl>
              <FormLabel>myLiquidity</FormLabel>
              <Input value={myPoolStore.PoolStore.myLiquidity} onChange={(event) => handleChange1(event, 'myLiquidity')} />
            </FormControl>
            <FormControl>
              <FormLabel>myBoundedAmount</FormLabel>
              <Input value={myPoolStore.PoolStore.myBoundedAmount} onChange={(event) => handleChange1(event, 'myBoundedAmount')} />
            </FormControl>
            <FormControl>
              <FormLabel>longestDaysUnbonding</FormLabel>
              <Input value={myPoolStore.PoolStore.longestDaysUnbonding} onChange={(event) => handleChange1(event, 'longestDaysUnbonding')} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={closeModal}>
              done
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SimpleGrid columns={{ sm: 2 }} gap={4} maxW={{ sm: "md" }} mb={8}>
        <Box>
          <Text
            fontWeight="semibold"
            color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
            mb={1}
          >
            OSMO Price
          </Text>
          <Text fontSize="3xl" fontWeight="bold" py={2}>
            $4.41
          </Text>
        </Box>
        <Box>
          <Text
            fontWeight="semibold"
            color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
            mb={2}
          >
            Reward distribution on
          </Text>
          <Flex align="center">
            <Text fontSize="3xl" fontWeight="bold">
              12
            </Text>
            <Box
              borderRadius="lg"
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              px={3}
              mx={1}
            >
              <Text fontSize="2xl" fontWeight="bold">
                H
              </Text>
            </Box>
            <Text fontSize="3xl" fontWeight="bold">
              19
            </Text>
            <Box
              borderRadius="lg"
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              px={3}
              mx={1}
            >
              <Text fontSize="2xl" fontWeight="bold">
                M
              </Text>
            </Box>
          </Flex>
        </Box>
      </SimpleGrid>
      <Box
        bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
        m={-4}
        px={4}
        py={6}
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          My Pools
        </Text>
        <PoolsCard poolsData={poolsData} />
      </Box>
    </Box>
  );
}
