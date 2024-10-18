import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Text,
  Stack,
  useMantineTheme,
  SimpleGrid,
  Modal,
  Group,
  Container,
  Title,
  Flex,
  TextInput,
  Tabs,
  Space,
  Divider,
  Checkbox,
  Center,
  MultiSelect,
} from "@mantine/core";
import { StatsGrid } from "../../components/StatsGrid/StatsGrid";
import { Icon3dCubeSphere } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { roles } from "../../data/roles";
import { users } from "../../data/users";
import axios from "axios";

const EditUserRolePage = () => {
  const [email, setEmail] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [roles, setRoles] = useState([]);
  const [currentRoles, setCurrentRoles] = useState([]);
  const [newRoles, setNewRoles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const stats = [
    {
      title: "Total Roles",
      icon: "speakerPhone",
      value: "5,173",
      diff: 34,
      time: "In last year",
    },
    {
      title: "Edit User Role",
      icon: "speakerPhone",
      value: "573",
      diff: -30,
      time: "In last year",
    },
    {
      title: "Total User",
      icon: "speakerPhone",
      value: "2,543",
      diff: 18,
      time: "In last year",
    },
  ];
  const [archiveAnnouncementStats, setArchiveAnnouncementStats] =
    useState(stats);

  const cancelRef = useRef();

  const fetchUserAndRoleDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get-user-roles-by-email?email=${email}`
      );
      setUserDetails(response.data.user);
      setCurrentRoles(response.data.roles);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Could not fetch user details. Please check the email.",
        color: "red",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedRoles = [...currentRoles, ...newRoles].filter((role, index, self) => self.indexOf(role) === index);
      console.log(updatedRoles);

    //   await axios.put(`http://127.0.0.1:8000/api/update-user-roles`, {
    //     email: email,
    //     roles: updatedRoles,
    //   });

      notifications.show({
        title: "Success",
        message: "User roles updated successfully.",
        color: "green",
      });
      setCurrentRoles(updatedRoles);
      setNewRoles([]);
      setIsOpen(false);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Could not update user roles.",
        color: "red",
      });
    }
  };

  const handleRemoveRole = (role) => {
    setCurrentRoles((prevRoles) => prevRoles.filter((r) => r !== role));
  };

  const fetchAvailableRoles = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/view-roles`);
      setRoles(response.data);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Could not fetch available roles.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchAvailableRoles();
  }, []);

  const getUserCountsByRole = () => {
    const counts = {};
    users.forEach((user) => {
      counts[user.role] = (counts[user.role] || 0) + 1;
    });

    return Object.entries(counts).map(([role, count]) => ({
      role,
      count,
    }));
  };

  const userRoleData = getUserCountsByRole();

  const colors = [
    "#4A90E2",
    "#005B96",
    "#0069B9",
    "#1E90FF",
    "#87CEFA",
    "#4682B4",
    "#4169E1",
  ];

  // const roleOptions = roles.map((role) => ({
  //     value: role.name,
  //     label: role.name,
  // }));

  return (
    <Box
      sx={{ backgroundColor: "#f0f0f0", minHeight: "100vh", padding: "1rem" }}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
      >
        <Button
          variant="gradient"
          size="xl"
          radius="xs"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          sx={{
            display: "block",
            width: { base: "100%", sm: "auto" },
            whiteSpace: "normal",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <Title
            order={1}
            sx={{
              fontSize: { base: "lg", sm: "xl" },
              lineHeight: 1.2,
              wordBreak: "break-word",
            }}
          >
            Edit User Role
          </Title>
        </Button>
      </Flex>

      <StatsGrid data={archiveAnnouncementStats} />

      <Divider
        my="xs"
        labelPosition="center"
        label={<Icon3dCubeSphere size={12} />}
      />

      <Flex direction={{ base: "column", lg: "row" }}>
        {/* Form Section */}
        <Box w="100%" md:w="50%" pl="lg">
          <Stack spacing="1rem">
            {/* User Name Input */}
            <TextInput
              label="User Email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button onClick={fetchUserAndRoleDetails}>
              Fetch User Details
            </Button>
          </Stack>

          {userDetails && (
            <Box mt="1rem">
              <Text fontSize="xl" fontWeight="bold">
                Current Roles:{" "}
              </Text>
              <Stack spacing="sm">
                {currentRoles.map((role) => (
                  <Flex key={role} justify={"space-between"} align={"center"}>
                    <Text>{role.name}</Text>
                    <Button
                      variant="outline"
                      color="red"
                      onClick={() => handleRemoveRole(role)}
                    >
                      Remove
                    </Button>
                  </Flex>
                ))}
              </Stack>

              <MultiSelect
                label="Add new role"
                placeholder="Select roles"
                data={roles.map((role) => ({
                  value: role.name,
                  label: role.name,
                }))}
                value={newRoles}
                onChange={setNewRoles}
                mt="1rem"
                searchable
                clearable
              />

              <Button color="blue" onClick={() => setIsOpen(true)} mt="1rem">
                Confirm Changes
              </Button>
            </Box>
          )}
        </Box>

        {/* Graphs Section */}
        <Box w="100%" md:w="50%">
          {/* Pie Chart Section */}
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb="1rem" align="center">
              Number of Users by Role
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userRoleData}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#1E90FF"
                  label
                >
                  {userRoleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Flex>

      {/* Confirmation Modal */}
      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Changes"
      >
        <Text>Are you sure you want to update the user roles?</Text>
        <Flex justify="flex-end" gap="1rem" mt="1rem">
          <Button variant="default" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button color="blue" onClick={handleSubmit}>
            Confirm
          </Button>
        </Flex>
      </Modal>
    </Box>
  );
};

export default EditUserRolePage;
