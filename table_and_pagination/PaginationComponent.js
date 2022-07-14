import React from 'react';
import {useNavigate} from "react-router-dom";
import {useInformation} from "../../../contexts/informationContext";
import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
  usePagination
} from "@ajna/pagination";

import {Box, Text} from "@chakra-ui/react";

function PaginationComponent({results, setPageNo}) {

  const navigate = useNavigate();
  const {state} = useInformation();

  let totalPages = 0;
  if (results.totalPages !== null) totalPages = results.totalPages;
  const {currentPage, setCurrentPage, pagesCount, pages}
    = usePagination({
    pagesCount: totalPages,
    limits: {
      outer: 1,
      inner: 1,
    },
    initialState: {currentPage: (state.employeesResult.pageNumber + 1) || 1},
  });

  const handlePageChange = nextPage => {
    setCurrentPage(nextPage);
    setPageNo(nextPage - 1);
  };

  return (
    <Box>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          w="full"
        >
          <PaginationPrevious>
            <Text>Previous</Text>
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                bg="blue.300"
                fontSize="sm"
                w={10}
                mx={4}
                jumpSize={11}
              />
            }
          >
            {pages.map(page => (
              <PaginationPage
                px={3}
                minW={10}
                bg="white"
                textColor="black"
                key={`pagination_page_${page}`}
                page={page}
                fontSize="sm"
                _hover={{
                  bg: 'blackAlpha.300',
                }}
                _current={{
                  bg: 'blackAlpha.600',
                  fontSize: 'sm',
                  textColor: 'white',
                  w: 7,
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext>
            <Text>Next</Text>
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Box>
  );
}

export default PaginationComponent;