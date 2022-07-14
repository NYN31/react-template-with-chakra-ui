import React, {useState} from 'react';
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Image, Spacer, Text, useToast} from "@chakra-ui/react";
import homeIcon from "../../../assets/icons/homeIcon.svg";
import addEmployeeIcon from "../../../assets/icons/addEmployeeIcon.svg"
import {useNavigate} from "react-router-dom";
import EmployeeEditModal from "../components/EmployeeEditModal";
import EmployeeTableResults from "../components/EmployeeTableResults";
import PageTitle from "../../../common/PageTitle";
import EmployeeManagement from "../../../service/employee-management";
import {useInformation} from "../../../contexts/informationContext";
import PaginationComponent from "../components/PaginationComponent";

export default function EmployeeList() {

  const navigate = useNavigate();
  const {state, dispatch} = useInformation();
  const toast = useToast();
  const [isEmployeeEditModalOpen, setEmployeeEditModalOpen] = useState(true);
  const [results, setResults] = useState(state.employeesResult);

  let pageNo = state.employeesResult.pageNumber || 0;
  const PAGE_SIZE = 5;
  const PAGE_TITLE = "Employee List";

  async function search() {
    try {
      console.log(pageNo, PAGE_SIZE);
      const response = await EmployeeManagement.findEmployees(
        pageNo,
        PAGE_SIZE
      );
      setResults(response);
      console.log("Results: {}", response);
      dispatch({type: 'SET_EMPLOYEES', payload: response});
    } catch (error) {
      toast({
        title: 'Search Failed',
        description: 'Search has been failed.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function setPageNumber(pageNumber) {
    pageNo = pageNumber;
    search();
  }

  function BreadcrumbLinkHandler(addressLink) {
    navigate(addressLink);
  }

  return (
    <Box>
      <EmployeeEditModal isOpen={false} onClose={() => setEmployeeEditModalOpen(false)}/>
      <Box bgColor="#FFFFFF">
        <Breadcrumb
          p="6px"
          mt="16px"
          mx={{lg: "24px", md: "24px", sm: "24px", base: "8px"}}
          fontWeight="medium"
          fontSize="12px"
          bgColor="#F2F2F2"
          border="1px solid"
          borderColor="#EEEEEE"
          borderRadius="4px"
          w={{lg: "97%", base: "96%"}}
          h="32px"
        >
          <BreadcrumbItem color="#828282">
            <BreadcrumbLink onClick={() => BreadcrumbLinkHandler("/home")}>
              <Flex direction="row">
                <Image pr={2} w="20px" h="12px" src={homeIcon}/>
                <Text>Home</Text>
              </Flex>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink onClick={() => BreadcrumbLinkHandler("/employees")}>
              Employee Management
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex
          direction="row"
          my="16px"
        >
          <PageTitle title={PAGE_TITLE}/>

          <Spacer/>

          <Flex>
            <Box
              align="right"
              mx={8}
              fontSize="16px"
              fontWeight="400"
            >
              <Flex
                direction="row"
                cursor="pointer"
                onClick={() => navigate("/employee/add")}
              >
                <Image mx={2} src={addEmployeeIcon}/>
                <Text> New Employee </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>

        <Flex
          mx={{lg: "24px", md: "24px", sm: "24px", base: "8px"}}
          mt="8px"
          direction="column"
        >
          <EmployeeTableResults results={results}/>
        </Flex>

        <Flex
          direction="row"
          mx={{lg: "24px", md: "24px", sm: "24px", base: "8px"}}
          bgColor={results.size ? "#EEEEEE" : "#FFFFFF"}
          h="50px"
          py={1}
        >
          <Spacer/>
          <PaginationComponent results={results} setPageNo={setPageNumber}/>
        </Flex>

      </Box>
    </Box>
  );
}