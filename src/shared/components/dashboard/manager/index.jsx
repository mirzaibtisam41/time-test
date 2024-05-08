'use client';
import InviteEmployeeViaCSVDialog from '@/components/dashboard/dialogs/inviteEmployeeCSVDialogue';
import Header from '@/components/dashboard/header';
import Table from '@/components/table';
import InviteEmployeeDialog from '@/shared/components/dashboard/dialogs/inviteEmployeeFormDialog';
import {
  employeeTableHeaderFields,
  employeeTableSearchKeys,
} from '@/shared/constants/table';
import {fetchEmployees, getUsersList} from '@/shared/redux/slices/user';
import {filterTableData, prepareTableDataList} from '@/shared/utils/table';
import {useEffect, useState} from 'react';
import {BsPencilSquare, BsTrash3} from 'react-icons/bs';
import {FaCloudUploadAlt} from 'react-icons/fa';
import {FaFileWaveform} from 'react-icons/fa6';
import {useDispatch, useSelector} from 'react-redux';

export default function ManagerDashboard() {
  const title = "Employee's List";

  const dispatch = useDispatch();
  const usersList = useSelector(getUsersList);

  const [search, setSearch] = useState('');
  const [itemsToShow] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const [openInviteFormDialog, setOpenInviteFormDialog] = useState(false);
  const [openInviteCSVDialog, setOpenInviteCSVDialog] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePages = (_, page) => {
    setActivePage(page);
  };

  const tableDataList = prepareTableDataList({
    dataList: usersList,
    headerFields: employeeTableHeaderFields,
  });

  const actions = [
    {
      id: 1,
      label: 'Edit',
      method: () => {},
      icon: <BsPencilSquare />,
    },
    {
      id: 2,
      label: 'Delete',
      method: () => {},
      icon: <BsTrash3 color="red" />,
    },
  ];

  const filteredDataList = filterTableData({
    data: tableDataList,
    search,
    searchKeys: employeeTableSearchKeys,
  });

  const startIndex = search ? 0 : (activePage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const paginatedDataList = filteredDataList?.slice(startIndex, endIndex);

  const [loading, setLoading] = useState(false);

  const fetchEmployeesList = async () => {
    setLoading(true);
    await dispatch(fetchEmployees());
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployeesList();
  }, []);

  const buttonMenuList = [
    {
      id: 1,
      title: 'Create a new form',
      icon: <FaFileWaveform size={25} color="var(--primary)" />,
      method: () => setOpenInviteFormDialog(true),
    },
    {
      id: 2,
      title: 'Import from CSV',
      icon: <FaCloudUploadAlt size={25} color="var(--primary)" />,
      method: () => setOpenInviteCSVDialog(true),
    },
  ];

  return (
    <>
      <InviteEmployeeDialog
        open={openInviteFormDialog}
        setOpen={setOpenInviteFormDialog}
      />
      <InviteEmployeeViaCSVDialog
        open={openInviteCSVDialog}
        setOpen={setOpenInviteCSVDialog}
      />
      <Header
        title={title}
        handleSearch={handleSearch}
        placeholder="Search Employees"
        btnText="Invite Employee"
        handleClick={() => setOpenInviteFormDialog(true)}
        hasButtonMenu={true}
        buttonMenuList={buttonMenuList}
      />
      <Table
        headerList={employeeTableHeaderFields}
        dataList={paginatedDataList}
        actions={actions}
        itemsToShow={itemsToShow}
        totalItems={filteredDataList?.length}
        handlePages={handlePages}
        loading={loading}
      />
    </>
  );
}
