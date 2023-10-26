import CustomerBooking from "../components/Admin/CustomerBooking";
// import HotelInformation from "../components/Admin/HotelInformation";
import RoomAndProperty from "../components/Admin/RoomAndProperty";
import RoomManagement from "../components/Admin/RoomManagement";
import SidebarItems from "../components/Admin/SidebarItems";
import MuiDrawer from "@mui/material/Drawer";
import { PageProvider } from "../contexts/PageContext";
import { Routes, Route } from "react-router-dom";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import { useState } from "react";

function Admin() {
  const Drawer = styled(MuiDrawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: 240,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
    },
    "& .MuiDrawer-root": {
      borderColor: "#2F3E35",
    },
    "& .MuiPaper-root": {
      borderColor: "#2F3E35",
    },
    "& .MuiListItemIcon-root": {
      minWidth: 37,
    },
  }));

  const [customerBooking, setCustomerBooking] = useState(true);
  const [roomManage, setRoomManage] = useState(false);

  const [roomandProperty, setRoomandProperty] = useState(false);

  const handleCustomerBooking = () => {
    setCustomerBooking(true);
    setRoomManage(false);
    setRoomandProperty(false);
  };
  const handleRoomManage = () => {
    setCustomerBooking(false);
    setRoomManage(true);
    setRoomandProperty(false);
  };

  const handleRoomandProperty = () => {
    setCustomerBooking(false);
    setRoomManage(false);
    setRoomandProperty(true);
  };

  const onlyAdminRoutes = [
    // {
    //   path: "/",
    //   element: <Admin />,
    //   children: [
    //     {
    //       path: "/", // This corresponds to / in the parent route
    //       element: <CustomerBooking />,
    //     },
    //     {
    //       path: "/RoomManagement",
    //       element: <RoomManagement />,
    //     },
    //     {
    //       path: "/RoomAndProperty",
    //       element: <RoomAndProperty />,
    //     },
    //   ],
    // },
    {
      path: "/",
      main: () => (
        <CustomerBooking handleCustomerBooking={handleCustomerBooking} />
      ),
    },
    {
      path: "/RoomManagement",
      main: () => <RoomManagement handleRoomManage={handleRoomManage} />,
    },
    {
      path: "/RoomAndProperty",
      main: () => (
        <RoomAndProperty handleRoomandProperty={handleRoomandProperty} />
      ),
    },
  ];

  const DrawerSx = {
    bgcolor: "#2F3E35",

    pt: 2,
  };
  const ListSx = {
    bgcolor: "#2F3E35",
    gap: 2,
  };

  return (
    <PageProvider>
      <div className="h-screen w-screen overflow-x-hidden">
        <div className="w-[240px] h-full fixed overflow-y-hidden top-0 left-0 z-50 bg-green-800 flex flex-col items-center ">
          <Drawer variant="permanent" open={open} sx={DrawerSx}>
            <div className="bg-green-800 flex flex-col items-center pb-[70px]">
              <img
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20white.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyB3aGl0ZS5zdmciLCJpYXQiOjE2OTM1NjEyOTUsImV4cCI6MTcyNTA5NzI5NX0.rsBAS_CgCAh-wxK9ATUoNXQHhksFXHD2-ETG5s-Ruio&t=2023-09-01T09%3A41%3A34.755Z"
                alt="Logo"
                className="mb-5"
              />
              <p className="text-green-400">Admin Panel Control</p>
            </div>

            <List component="nav" sx={ListSx}>
              <SidebarItems
                customerBooking={customerBooking}
                roomManage={roomManage}
                roomandProperty={roomandProperty}
                handleCustomerBooking={handleCustomerBooking}
                handleRoomManage={handleRoomManage}
                handleRoomandProperty={handleRoomandProperty}
              />
            </List>
          </Drawer>
        </div>
        <div className="w-[100vw-240px] ml-[240px] min-h-screen">
          {/* {customerBooking && <CustomerBooking />}
          {roomManage && <RoomManagement />}
          {roomandProperty && <RoomAndProperty />} */}
          <Routes>
            {onlyAdminRoutes.map(({ path, main }) => (
              <Route key={path} path={path} element={main()} />
            ))}
          </Routes>
        </div>
      </div>
    </PageProvider>
  );
}

export default Admin;
