import React, { useState } from 'react';
import SearchBox from '../components/SearchBox';
import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import AdvancedSearchService from '../../service/advanced-search-service';
import AdvancedSearchResult from '../components/AdvancedSearchResult';
import RetailAccountService from '../../service/retail-account-service';
import { useInformation } from '../../contexts/informationContext';
import { rolesEligibleForExport } from '../../helper/qc-roles';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';

const AdvancedSearchContainer = () => {
    const toast = useToast();
    const [results, setResults] = useState({ content: [] });
    const [payload, setPayload] = useState({});
    const [payloadEmpty, setPayloadEmpty] = useState(true);
    const [exportPending, setExportPending] = useState(false);
    const [csvResult, setCsvResult] = useState([]);
    const pageSize = 10;
    let pageNo = 0;
    const csvLink = React.useRef();

    const {
        state: { roles },
    } = useInformation();
    const exportable = roles.some(r => rolesEligibleForExport.includes(r));

    async function search() {
        try {
            if (payloadEmpty) {
                const response = await RetailAccountService.getAll(
                    pageNo,
                    pageSize
                );
                setResults(response);
            } else {
                const response = await AdvancedSearchService.search(
                    payload,
                    pageNo,
                    pageSize
                );
                setResults(response);
            }
        } catch (error) {
            toast({
                title: 'Search Failed',
                description: 'Search has been failed.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setResults({ content: [] });
        }
    }

    async function exportCsv() {
        try {
            setExportPending(true);
            const response = await AdvancedSearchService.exportCsv(payload);
            setCsvResult(response.data);
            csvLink.current.link.click();
        } catch (error) {
            toast({
                title: 'Export Failed',
                description: 'Export has been failed.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setExportPending(false);
        }
    }

    function reset() {
        setResults({ content: [] });
        setPayload({});
        pageNo = 0;
    }

    function changePayload(newPayload) {
        setPayload(newPayload);
        const isEmpty = Object.values(newPayload).every(
            x => x === null || x === ''
        );
        setPayloadEmpty(isEmpty);
    }

    return (
        <Flex mr={16} mt={4} direction="column" ml={140}>
            <Heading as="h3" size="lg" mb={4}>
                Search
            </Heading>
            <SearchBox
                setPayload={changePayload}
                reset={reset}
                search={search}
            />
            <Flex direction="row">
                <Spacer />
                <Button
                    ml={8}
                    mr={4}
                    variant="outline"
                    colorScheme="linkedin"
                    onClick={exportCsv}
                    disabled={payloadEmpty || !exportable || exportPending}
                >
                    Export
                </Button>
                <CSVLink
                    data={csvResult}
                    filename={`users_${format(
                        new Date(),
                        'yyyy-MM-dd_HH:mm:ss'
                    )}.csv`}
                    className="hidden"
                    ref={csvLink}
                    target="_blank"
                />
            </Flex>
        </Flex>
    );
};

export default AdvancedSearchContainer;
