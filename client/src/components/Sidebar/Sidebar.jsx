import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { FaUserAlt, FaClone, FaSignOutAlt, FaUserGraduate, FaChalkboardTeacher, FaUsersCog, FaKey, FaUserShield, FaTasks, FaEdit, FaArchive as FaArchiveIcon } from "react-icons/fa";
import { Tooltip, Flex, Modal, Button } from "@mantine/core";
import { useAuth } from '../../context/AuthContext';

const MANTINE_BLUE = "#228be6";
const MANTINE_DARK_BLUE = "#1c7ed6";
const LOGOUT_RED = "#d63031";
const LOGOUT_DARK_RED = "#b71c1c";

const Sidebar = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [hovered, setHovered] = useState(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      label: "Logout",
      icon: <FaSignOutAlt size={24} />,
      height: "10%",
      isLogout: true,
      action: () => setLogoutConfirm(true),
    },
    {
      label: "User Management",
      icon: <FaUserAlt size={24} />,
      menuKey: "user",
      subItems: [
        { label: "Add Student", path: "/UserManagement/CreateStudent", icon: <FaUserGraduate size={18} /> },
        { label: "Add Faculty", path: "/UserManagement/CreateFaculty", icon: <FaChalkboardTeacher size={18} /> },
        { label: "Add Staff", path: "/UserManagement/CreateStaff", icon: <FaUsersCog size={18} /> },
        { label: "Reset Password", path: "/UserManagement/ResetUserPassword", icon: <FaKey size={18} /> },
      ],
    },
    {
      label: "Role Management",
      icon: <FaClone size={24} />,
      menuKey: "role",
      subItems: [
        { label: "Create Role", path: "/RoleManagement/CreateCustomRole", icon: <FaUserShield size={18} /> },
        { label: "Manage Role Access", path: "/RoleManagement/ManageRoleAccess", icon: <FaTasks size={18} /> },
        { label: "Edit Role", path: "/RoleManagement/EditUserRole", icon: <FaEdit size={18} /> },
      ],
    },
    {
      label: "Archive Management",
      icon: <FaArchiveIcon size={24} />,
      menuKey: "archive",
      subItems: [
        { label: "Archive User", path: "/archive/users", icon: <FaArchiveIcon size={18} /> },
        { label: "Archive Announcements", path: "/archive/announcements", icon: <FaArchiveIcon size={18} /> },
      ],
    },
  ];

  return (
    <>
      <Flex
        direction="column"
        align="center"
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          width: isSmallScreen ? "60px" : "80px",
          backgroundColor: "#ffffff",
          boxShadow: "-3px 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {menuItems.map(({ label, icon, path, menuKey, subItems, height, isDashboard, isLogout, action }) => (
          <div
            key={label}
            style={{
              width: "100%",
              height: height || "30%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              backgroundColor: isDashboard
                ? hovered === label
                  ? MANTINE_DARK_BLUE
                  : MANTINE_BLUE
                : isLogout
                  ? hovered === label
                    ? LOGOUT_DARK_RED
                    : LOGOUT_RED
                  : hovered === menuKey || hovered === label
                    ? MANTINE_BLUE
                    : "transparent",
              transition: "background 0.3s ease-in-out",
              cursor: "pointer",
              color: isDashboard || hovered === menuKey || hovered === label || isLogout ? "white" : MANTINE_BLUE,
            }}
            onMouseEnter={() => setHovered(menuKey || label)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => (action ? action() : path && navigate(path))}
          >
            {hovered === menuKey && subItems ? (
              <Flex direction="column" align="center" style={{ width: "100%", height: "100%" }}>
                {subItems.map(({ label, path, icon }) => (
                  <Tooltip key={label} label={label} position="left" withArrow>
                    <div
                      style={{
                        flex: 1,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: MANTINE_DARK_BLUE,
                        transition: "background 0.3s ease-in-out",
                        color: "white",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = MANTINE_BLUE)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = MANTINE_DARK_BLUE)}
                      onClick={() => navigate(path)}
                    >
                      {icon}
                    </div>
                  </Tooltip>
                ))}
              </Flex>
            ) : (
              <div style={{ color: "inherit" }}>{icon}</div>
            )}
          </div>
        ))}
      </Flex>

      <Modal opened={logoutConfirm} onClose={() => setLogoutConfirm(false)} title="Confirm Logout" centered>
        <p>Are you sure you want to logout?</p>
        <Flex justify="space-between" mt="md">
          <Button color="gray" onClick={() => setLogoutConfirm(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default Sidebar;
