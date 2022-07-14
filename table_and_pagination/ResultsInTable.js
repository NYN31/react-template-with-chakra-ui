import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React from "react";
import {useNavigate} from "react-router-dom";

function EmployeeTableResults({results}) {

  const navigate = useNavigate();

  return (
    <>
      <Table variant="simple" w="100%">
        <Thead
          bgColor="#0077C0"
          color="#FFFFFF"
        >
          <Tr>
            <Th color="#FFFFFF">Name of the Employee</Th>
            <Th color="#FFFFFF">Email ID</Th>
            <Th color="#FFFFFF">Employee ID</Th>
            <Th color="#FFFFFF">Joining Date</Th>
            <Th color="#FFFFFF">Designation</Th>
            <Th color="#FFFFFF">Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {results.content.map((result, index) => (
            <Tr
              key={result.employeeId}
              bgColor={index & 1 ? "#EEEEEE" : "#FFFFFF"}
              onClick={() => navigate(`/employee/details/${result.employeeId}`, {state: {result}})}
              cursor="pointer"
            >
              <Td>{result.name}</Td>
              <Td>{result.email}</Td>
              <Td>{result.employeeId}</Td>
              <Td>{result.joiningDate}</Td>
              <Td>{result.designation}</Td>
              <Td>{result.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default EmployeeTableResults;