import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextInput,
  Text,
  Stack,
  Flex,
  Grid,
  MultiSelect,
  Modal,
  Input,
  Select,
  useMantineTheme,
  SimpleGrid,
  Group,
  Container,
  Title,
  Tabs,
  Space,
  Divider,
  Checkbox,
  Center,
  Loader,
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
import { privileges } from "../../data/privileges"; // Assuming you have a privileges data file
import axios from "axios";

const ManageRoleAccessPage = () => {

    const [roleName, setRoleName] = useState("");
    const [roles, setRoles] = useState([]);
    const [moduleAccess, setModuleAccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/view-roles`);
                setRoles(response.data.map((role) => ({
                    label: role.name,
                    value: role.name,
                })));
            } catch (error) {
                console.log("Error fetching roles: ", error);
            }
        }
        fetchRoles();
    }, []);

    const fetchModuleAccess = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get-module-access/`, {
                params: {designation: roleName},
            });
            setModuleAccess(response.data);
        } catch (error) {
            notifications.show({
                title: "Error",
                message: `Failed to fetch module access for ${roleName}`,
                color: "red",
            });
            console.error("Error fetching module access: ", error);
        } finally {
            setLoading(false);
        };
    };

    const handleModuleChange = (moduleName) => {
        setModuleAccess((prevState) => ({
            ...prevState,
            [moduleName]: !prevState[moduleName],
        }));
    };

    useEffect(() => {
        console.log(moduleAccess);
    }, [moduleAccess]);

    const handleSubmit = async () => {
        setIsOpen(false);
        try {
            await axios.put(`http://127.0.0.1:8000/api/modify-roleaccess/`, {
                designation: roleName,
                ...moduleAccess,
            });

            notifications.show({
                title: "Success",
                message: "Role access updated successfully.",
                color: "green",
            });
        } catch (error) {
            notifications.show({
                title: "Error",
                message: `Failed to update role access for ${roleName}`,
                color: "red",
            });
            console.error("Error updating role access: ", error);
        };
    };

  const stats = [
    {
      title: "Total users",
      icon: "speakerPhone",
      value: "5,173",
      diff: 34,
      time: "In last year",
    },
    {
      title: "Total Roles",
      icon: "speakerPhone",
      value: "573",
      diff: -30,
      time: "In last year",
    },
    {
      title: "Created Roles",
      icon: "speakerPhone",
      value: "2,543",
      diff: 18,
      time: "In last year",
    },
  ];

  const [archiveAnnouncementStats, setArchiveAnnouncementStats] = useState(stats);

  const cancelRef = useRef();

  const getPrivilegesCount = () => {
    return roles.map((role) => ({
      name: role.name,
      privilegeCount: role.length,
    }));
  };

  const getUserCountsByRole = () => {
    const counts = {};
    roles.forEach((role) => {
      counts[role.name] = (counts[role.name] || 0) + 1;
    });

    return Object.entries(counts).map(([role, count]) => ({
      role,
      count,
    }));
  };

  const privilegeData = getPrivilegesCount();
  const userRoleData = getUserCountsByRole();
  const totalRoles = roles.length;
  const currentYear = new Date().getFullYear();
  const rolesCreatedThisYear = roles.filter(
    (role) => new Date(role.createdAt).getFullYear() === currentYear
  ).length;

  const colors = [
    "#4A90E2",
    "#005B96",
    "#0069B9",
    "#1E90FF",
    "#87CEFA",
    "#4682B4",
    "#4169E1",
  ];

  const privilegeOptions = privileges.map((privilege) => ({
    value: privilege.name,
    label: privilege.name,
  }));

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
            Manage Role Access
          </Title>
        </Button>
      </Flex>

      {/* <StatsGrid data={archiveAnnouncementStats} /> */}

      <Divider
        my="xs"
        labelPosition="center"
        label={<Icon3dCubeSphere size={12} />}
      />

      <Flex direction={{ base: "column", lg: "row" }} >
        {/* Form Section */}
        <Box w="100%" md:w="50%" pl="lg">
          <Stack spacing="1rem">
            <Select
                label="Select Role"
                placeholder="Choose a role"
                searchable
                data={roles}
                value={roleName}
                onChange={setRoleName}
                required
            />

            <Button mt="md" onClick={fetchModuleAccess}>
                Fetch module access information
            </Button>

            <Divider my="md"/>

            {loading && (
                <Flex justify="center" mt="md">
                    <Loader size="lg"/>
                </Flex>
            )}
          </Stack>
          {moduleAccess && (
            <>
              <Text 
                fontSize="xl" 
                fontWeight="bold" 
                align="center" 
                color="blue" // You can choose any color value
                mb="md" // Adds space to the bottom (margin-bottom)
              >
                Manage module access for {roleName}
              </Text>

              <Grid>
                {Object.keys(moduleAccess).map((module) => (
                  <Grid.Col
                    key={module}
                    span={{base:12,sm:6,md:4}}
                  >
                    <Checkbox
                      label={module.replace(/_/g, " ")}
                      checked={moduleAccess[module]}
                      onChange={() => handleModuleChange(module)}
                    />
                  </Grid.Col>
                ))}
              </Grid>

              <Flex align="center" justify="center" mt="md">
                <Button color="blue" onClick={() => setIsOpen(true)}>
                  Confirm changes
                </Button>
              </Flex>

            </>
          )}

        </Box>
      </Flex>

      {/* Confirmation Modal */}
      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm changes"
      >
        <Text>Are you sure you want to update the role access for {roleName} ?</Text>
        <Group position="right" mt="md">
            <Button variant="default" onClick={() => setIsOpen(false)}>
                Cancel
            </Button>
            <Button color="blue" onClick={handleSubmit}>
                Confirm
            </Button>
        </Group>
      </Modal>
    </Box>
  );
};

export default ManageRoleAccessPage;
