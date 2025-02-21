import { useState, useEffect } from "react";
import { Menu, ActionIcon, Tooltip, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import {
  FaUser,
  FaExchangeAlt,
  FaCube,
  FaArchive,
  FaUserAlt,
  FaClone as FaCloneFilled,
  FaArchive as FaArchiveFilled,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const [menuOpened, setMenuOpened] = useState({ user: false, role: false, archive: false });

  const toggleMenu = (menuKey) => {
    setMenuOpened((prev) => ({
      user: false,
      role: false,
      archive: false,
      [menuKey]: !prev[menuKey],
    }));
  };

  const handleNavigate = (redirect) => {
    navigate(redirect);
    setMenuOpened({ user: false, role: false, archive: false });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        if (event.key.toLowerCase() === "u") {
          toggleMenu("user");
        } else if (event.key.toLowerCase() === "r") {
          toggleMenu("role");
        } else if (event.key.toLowerCase() === "a") {
          toggleMenu("archive");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
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
        zIndex: 10,
        boxShadow: "-3px 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {[
        { label: "Dashboard", icon: <FaCube size={24} />, onClick: () => handleNavigate("/") },
        {
          label: "User Management",
          icon: <FaUserAlt size={24} />,
          menuKey: "user",
          items: [
            { label: "Add Student", path: "/UserManagement/CreateStudent", icon: <FaUser size={14} />, color: "blue" },
            { label: "Add Faculty", path: "/UserManagement/CreateFaculty", icon: <FaUser size={14} />, color: "green" },
            { label: "Add Staff", path: "/UserManagement/CreateStaff", icon: <FaUser size={14} />, color: "red" },
            { label: "Reset Password", path: "/UserManagement/ResetUserPassword", icon: <FaExchangeAlt size={14} />, color: "teal" },
          ],
        },
        {
          label: "Role Management",
          icon: <FaCloneFilled size={24} />,
          menuKey: "role",
          items: [
            { label: "Create Custom Role", path: "/RoleManagement/CreateCustomRole", icon: <FaCog size={14} />, color: "blue" },
            { label: "Manage Role Access", path: "/RoleManagement/ManageRoleAccess", icon: <FaCog size={14} />, color: "red" },
            { label: "Edit Role Access", path: "/RoleManagement/EditUserRole", icon: <FaCog size={14} />, color: "teal" },
          ],
        },
        {
          label: "Archive Management",
          icon: <FaArchiveFilled size={24} />,
          menuKey: "archive",
          items: [
            { label: "Archive User", path: "/archive/users", icon: <FaArchive size={14} />, color: "blue" },
            { label: "Archive Announcements", path: "/archive/announcements", icon: <FaArchive size={14} />, color: "red" },
          ],
        },
      ].map(({ label, icon, onClick, menuKey, items }) => (
        <Tooltip key={label} label={label} position="left" withArrow>
          <div
            style={{
              height: "25%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={(e) => {
              e.stopPropagation();
              if (menuKey) {
                toggleMenu(menuKey);
              } else if (onClick) {
                onClick();
              }
            }}
          >
            {items ? (
              <Menu
                opened={menuOpened[menuKey]}
                onClose={() => setMenuOpened((prev) => ({ ...prev, [menuKey]: false }))}
                withinPortal
              >
                <Menu.Target>
                  <ActionIcon
                    variant="subtle"
                    size="xl"
                    style={{ borderRadius: "50%" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(menuKey);
                    }}
                  >
                    {icon}
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  {items.map(({ label, path, icon, color }) => (
                    <Menu.Item
                      key={label}
                      onClick={() => handleNavigate(path)}
                      leftSection={icon}
                      style={{ color }}
                    >
                      {label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            ) : (
              <ActionIcon variant="subtle" size="xl" style={{ borderRadius: "50%" }}>
                {icon}
              </ActionIcon>
            )}
          </div>
        </Tooltip>
      ))}
    </Flex>
  );
}
