'use client';
import ReInviteManagerDialog from '@/components/dashboard/dialogs/ReInviteManagerDialog';
import InviteManagerDialog from '@/components/dashboard/dialogs/inviteManagerDialog';
import Table from '@/components/table';
import {
  ManagerTableHeaderFields,
  managerTableSearchKeys,
} from '@/shared/constants/table';
import {fetchManagers, getUsersList} from '@/shared/redux/slices/user';
import {filterTableData, prepareTableDataList} from '@/shared/utils/table';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {BsFillSendCheckFill} from 'react-icons/bs';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../header';

export default function AdminDashboard({dataList}) {
  const title = "Manager's List";

  const dispatch = useDispatch();
  const usersList = useSelector(getUsersList);

  const [search, setSearch] = useState('');
  const [itemsToShow] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [open, setOpen] = useState(false);
  const [userToReInvite, setUserToReInvite] = useState(null);

  const [openInviteDialog, setOpenInviteDialog] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePages = (_, page) => {
    setActivePage(page);
  };

  const tableDataList = prepareTableDataList({
    dataList: usersList,
    headerFields: ManagerTableHeaderFields,
  });

  const handleDialogue = ({user}) => {
    setOpen(true);
    setUserToReInvite(user);
  };

  const actions = [
    {
      id: 1,
      label: 'Re invite',
      method: handleDialogue,
      icon: <BsFillSendCheckFill fontSize={30} />,
    },
  ];

  const filteredDataList = filterTableData({
    data: tableDataList,
    search,
    searchKeys: managerTableSearchKeys,
  });

  const startIndex = search ? 0 : (activePage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const paginatedDataList = filteredDataList?.slice(startIndex, endIndex);

  const [loading, setLoading] = useState(false);

  const fetchManagersList = async () => {
    setLoading(true);
    await dispatch(fetchManagers());
    setLoading(false);
  };

  useEffect(() => {
    fetchManagersList();
  }, []);

  return (
    <>
      <InviteManagerDialog
        open={openInviteDialog}
        setOpen={setOpenInviteDialog}
      />
      <ReInviteManagerDialog
        open={open}
        setOpen={setOpen}
        userToReInvite={userToReInvite}
      />
      <Header
        title={title}
        handleSearch={handleSearch}
        btnText="Invite Manager"
        placeholder="Search Manager"
        handleClick={() => setOpenInviteDialog(true)}
      />
      <Table
        headerList={ManagerTableHeaderFields}
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

AdminDashboard.propTypes = {
  dataList: PropTypes.array,
};
