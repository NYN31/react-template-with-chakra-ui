import React, { useState } from 'react';
import { Flex, Text, Input, Button, Spacer, Select } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { RetailStatus } from '../../helper/retail-status';
import { PopoverDateRangePicker } from './PopoverDateRangePicker';
import _ from 'lodash'; // TODO: Remove lodash

export const EmptyDateRange = {
    startDate: null,
    endDate: null,
    key: 'selection',
};

const SearchBox = ({ setPayload, search, reset }) => {
    const [phoneNo, setPhoneNo] = useState('');
    const [enablePhoneNo, setEnablePhoneNo] = useState(true);
    const [applicationId, setApplicationId] = useState('');
    const [enableApplicationId, setEnableApplicationId] = useState(true);
    const [status, setStatus] = useState('');
    const [enableStatus, setEnableStatus] = useState(false);
    const [referrerNo, setReferrerNo] = useState('');
    const [enableReferrerNo, setEnableReferrerNo] = useState(false);
    const [nid, setNid] = useState('');
    const [enableNid, setEnableNid] = useState(true);

    const [dateRange, setDateRange] = useState(EmptyDateRange);
    const [enableDateRange, setEnableDateRange] = useState(true);

    const editEnum = {
        all: 0,
        phoneEdited: 1,
        idEdited: 2,
        statusEdited: 3,
        referrerNoEdited: 4,
        nidEdited: 5,
        dateRangeEdited: 6,
    };

    function changePayload(
        inputPhone,
        inputId,
        inputNid,
        inputReferrer,
        inputStatus,
        inputDateRange
    ) {
        const payload = {
            phoneNumber: inputPhone.trim() === '' ? null : inputPhone.trim(),
            retailAccountId: inputId.trim() === '' ? null : inputId.trim(),
            nid: inputNid.trim() === '' ? null : inputNid.trim(),
            referrerPhoneNumber:
                inputReferrer.trim() === '' ? null : inputReferrer.trim(),
            status: inputStatus.trim() === '' ? null : inputStatus.trim(),
            fromDate: inputDateRange.startDate,
            toDate: inputDateRange.endDate,
        };
        setPayload(payload);
    }

    const changeInput = (edited, value) => {
        if (value === null || _.isEqual(value, EmptyDateRange)) {
            value = '';
        }

        let inputPhone = phoneNo;
        let inputId = applicationId;
        let inputStatus = status;
        let inputReferrer = referrerNo;
        let inputNid = nid;
        let inputDate = dateRange;

        const commonCase = edited === editEnum.all || value === '';
        const dateGroupCase =
            edited === editEnum.dateRangeEdited ||
            edited === editEnum.statusEdited ||
            edited === editEnum.referrerNoEdited;

        if (edited === editEnum.phoneEdited || edited === editEnum.all) {
            inputPhone = value;
        } else {
            inputPhone = '';
        }
        if (edited === editEnum.idEdited || edited === editEnum.all) {
            inputId = value;
        } else {
            inputId = '';
        }
        if (edited === editEnum.statusEdited || edited === editEnum.all) {
            inputStatus = value;
        } else if (!dateGroupCase) {
            inputStatus = '';
        }
        if (edited === editEnum.referrerNoEdited || edited === editEnum.all) {
            inputReferrer = value;
        } else if (!dateGroupCase) {
            inputReferrer = '';
        }
        if (edited === editEnum.nidEdited || edited === editEnum.all) {
            inputNid = value;
        } else {
            inputNid = '';
        }
        if (edited === editEnum.dateRangeEdited || edited === editEnum.all) {
            if (value === '') {
                inputDate = EmptyDateRange;
            } else {
                inputDate = value;
            }
        } else if (!dateGroupCase) {
            inputDate = EmptyDateRange;
        }
        changePayload(
            inputPhone,
            inputId,
            inputNid,
            inputReferrer,
            inputStatus,
            inputDate
        );
        setPhoneNo(inputPhone);
        setApplicationId(inputId);
        setStatus(inputStatus);
        setReferrerNo(inputReferrer);
        setNid(inputNid);
        setDateRange(inputDate);

        setEnablePhoneNo(edited === editEnum.phoneEdited || commonCase);
        setEnableApplicationId(edited === editEnum.idEdited || commonCase);
        setEnableNid(edited === editEnum.nidEdited || commonCase);
        setEnableDateRange(dateGroupCase || commonCase);
        setEnableStatus(dateGroupCase);
        setEnableReferrerNo(dateGroupCase);
    };

    const changeDateRange = range => {
        changeInput(editEnum.dateRangeEdited, range);
    };

    function handleReset() {
        changeInput(editEnum.all, '');
        reset();
    }

    return (
        <Flex>
            <Flex width="28%" direction="column">
                <Text m={2}>Mobile Number</Text>
                <Input
                    m={2}
                    disabled={!enablePhoneNo}
                    value={phoneNo}
                    onChange={e =>
                        changeInput(editEnum.phoneEdited, e.target.value)
                    }
                    placeholder="Please enter mobile number"
                />
                <Text m={2}>Referrer Number</Text>
                <Input
                    m={2}
                    disabled={!enableReferrerNo}
                    value={referrerNo}
                    onChange={e =>
                        changeInput(editEnum.referrerNoEdited, e.target.value)
                    }
                    placeholder="Please enter referrer number"
                />
            </Flex>
            <Flex w="28%" direction="column">
                <Text m={2}>Application ID</Text>
                <Input
                    m={2}
                    disabled={!enableApplicationId}
                    value={applicationId}
                    onChange={e =>
                        changeInput(editEnum.idEdited, e.target.value)
                    }
                    placeholder="Application ID"
                />
                <Text m={2}>NID</Text>
                <Input
                    m={2}
                    disabled={!enableNid}
                    value={nid}
                    onChange={e =>
                        changeInput(editEnum.nidEdited, e.target.value)
                    }
                    placeholder="Please enter NID number"
                />
            </Flex>
            <Flex w="28%" direction="column">
                <Text m={2}>Status</Text>
                <Select
                    m={2}
                    disabled={!enableStatus}
                    value={status}
                    onChange={e =>
                        changeInput(editEnum.statusEdited, e.target.value)
                    }
                    placeholder="Select application status"
                >
                    {RetailStatus.map(retailStatus => (
                        <option key={retailStatus} value={retailStatus}>
                            {retailStatus}
                        </option>
                    ))}
                </Select>
                <Text m={2}>Date Range</Text>
                <PopoverDateRangePicker
                    disabled={!enableDateRange}
                    selectionRange={dateRange}
                    setRange={changeDateRange}
                />
            </Flex>
            <Flex w="15%" direction="column">
                <Flex h={10} />
                <Spacer />
                <Button
                    ml={8}
                    variant="outline"
                    colorScheme="teal"
                    onClick={search}
                >
                    Submit
                </Button>
                <Spacer />
                <Button variant="outline" ml={8} onClick={() => handleReset()}>
                    Reset
                </Button>
                <Spacer />
            </Flex>
        </Flex>
    );
};

SearchBox.propTypes = {
    setPayload: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
};

export default SearchBox;
