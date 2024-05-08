export const prepareTableDataList = ({dataList, headerFields}) => {
  return dataList?.map((data) => {
    const preparedData = {};
    Object.entries(headerFields).forEach(([key]) => {
      if (key === 'status') {
        preparedData[key] = data['isVerified'] ? 'Active' : 'Pending';
      } else if (key === 'organization') {
        preparedData[key] = data?.organizationId?.name || 'Not Registered';
      } else {
        preparedData[key] = data[key] || '';
      }
    });
    preparedData['isVerified'] = data['isVerified'] || false;
    preparedData['id'] = data['id'] || '';
    return preparedData;
  });
};

export const filterTableData = ({data, search, searchKeys = {}}) => {
  const searchValue = search.toLowerCase();
  return data?.filter((item) => {
    return Object.keys(searchKeys).some((key) => {
      const value = item[searchKeys[key]]?.toString().toLowerCase();
      return value?.includes(searchValue);
    });
  });
};
