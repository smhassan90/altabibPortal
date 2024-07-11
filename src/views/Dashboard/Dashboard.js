// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Progress,
  Select,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useEffect, useState } from "react";
// Variables
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { localUrl } from "env";
import { lineChartOptions } from "variables/charts";
import { homeUrl } from "env";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "OPDs by Month",
    },
  },
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [totalApps, setTotalApps] = useState(0);
  const [successfullOPDs, setSuccessfullOPDs] = useState(0);
  const [newPatients, setNewPatients] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [lineChartData, setLineChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });
  const [loadBarChart, setLoadBarChart] = useState(true);

  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const { colorMode } = useColorMode();

  const getBarChartData = () => {
    axios
      .get(`${homeUrl}getBarChartOfClinic?token=123456789&numberOfMonths=3`)
      .then((response) => {
        const apiData = response.data.data.barCharts;
        const uniqueMonths = [
          ...new Set(apiData.map((item) => item.monthYear)),
        ];
        const uniqueDoctors = [
          ...new Set(apiData.map((item) => item.doctorName)),
        ];
        const colorPalette = [
          "#2E93fA",
          "#66DA26",
          "#FFA500",
          "#FF4500",
          "#9400D3",
          "#FF69B4",
          "#00CED1",
          "#FFD700",
          "#32CD32",
          "#8A2BE2",
        ];

        const datasets = uniqueDoctors.map((doctor, index) => {
          return {
            label: doctor,
            data: uniqueMonths.map(() => 0),
            backgroundColor: colorPalette[index % colorPalette.length], // Set color based on doctor
          };
        });

        apiData.forEach((item) => {
          const doctorIndex = datasets.findIndex(
            (dataset) => dataset.label === item.doctorName
          );
          if (doctorIndex !== -1) {
            const monthIndex = uniqueMonths.indexOf(item.monthYear);
            if (monthIndex !== -1) {
              datasets[doctorIndex].data[monthIndex] = item.count;
            }
          }
        });

        // Update state with actual data
        setData({
          labels: uniqueMonths,
          datasets: datasets,
        });
        console.log("DATA FOR CHART:", data);
        setLoadBarChart(false);
      })
      .catch((error) => {
        console.error("Error fetching bar chart data:", error);
      });
  };

  useEffect(() => {
    const date = new Date().toString;
    console.log("Date:", date.toString);
    axios
      .get(
        "http://192.168.100.10:8083/altabibconnect/viewAppointments?token=1715246872549AIIFWNIONIO1344112&visitDate=2024-06-01&clinicId=0&patientId=0&doctorId=0&appointmentId=0&followupDate"
      )
      .then((response) => {
        console.log(
          "Response Data of API",
          JSON.stringify(response.data.data.appointments, null, 2)
        );
        var OPDs = 0;
        var earnings = 0;
        response.data.data.appointments.forEach((element) => {
          if (element.status === 1) {
            OPDs++;
            earnings += element.charges;
          }
        });
        //console.log("Successfull OPDs", successfullOPDs);
        setTotalApps(response.data.data.appointments.length);
        setTotalEarnings(earnings);
        setSuccessfullOPDs(OPDs);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `${homeUrl}getLineGraphOfClinic?token=1715246872549AIIFWNIONIO1344112&startDate=2024-06-01&endDate=2024-06-30`
      )
      .then((response) => {
        // console.log(
        //   "Chart Data of API",
        //   JSON.stringify(response.data.data, null, 2)
        // );
        const apiData = response.data.data.lineGraphs;
        const uniqueDoctorNames = [
          ...new Set(apiData.map((item) => item.doctorName)),
        ];
        const startDate = new Date("2024-06-01"); // Start date from the API
        const endDate = new Date("2024-06-30"); // End date from the API
        const dateRange = [];
        for (
          let date = new Date(startDate);
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          dateRange.push(new Date(date));
        }

        const newLineChartData = uniqueDoctorNames.map((doctorName) => {
          const data = dateRange.map((date) => {
            const dateString = date.toISOString().slice(0, 10);
            const entry = apiData.find(
              (item) =>
                item.visitDate === dateString && item.doctorName === doctorName
            );
            return entry ? entry.count : 0;
          });
          return { name: doctorName, data };
        });

        //console.log("Updated lineChartData:", newLineChartData);
        setLineChartData(newLineChartData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    getBarChartData();
  }, []);

  return (
    <Flex gap={5} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Flex flexDirection={"row"} w={"15%"}>
        <Select
          fontWeight="normal"
          bg={"white"}
          color={"black"}
          borderColor={"white"}
          placeholder="Select option"
        >
          <option value="option1">Last 30 days</option>
          <option value="option2">Daily</option>
        </Select>
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="20px">
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Total Appointments
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    {totalApps}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius="50%"
                as="box"
                h={"45px"}
                w={"45px"}
                bg={iconBlue}
              >
                <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +3.48%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Successfull OPDs
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    {successfullOPDs}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius="50%"
                as="box"
                h={"45px"}
                w={"45px"}
                bg={iconBlue}
              >
                <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +5.2%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  New Patients
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    +22
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius="50%"
                as="box"
                h={"45px"}
                w={"45px"}
                bg={iconBlue}
              >
                <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="red.500" fontWeight="bold">
                -2.82%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Total Earnings
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    Rs. {totalEarnings}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius="50%"
                as="box"
                h={"45px"}
                w={"45px"}
                bg={iconBlue}
              >
                <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +8.12%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "2fr 2fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
      >
        <Card
          bg={
            colorMode === "dark"
              ? "navy.800"
              : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          }
          p="0px"
          maxW={{ sm: "100%", md: "100%", lg: "100%" }}
        >
          <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
            <Text color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
              Appointments Overview
            </Text>
          </Flex>
          <Box minH="300px">
            {loading ? null : (
              <LineChart
                chartData={lineChartData}
                chartOptions={lineChartOptions}
              />
            )}
          </Box>
        </Card>
        <Card p="0px" maxW={{ sm: "100%", md: "100%", lg: "100%" }}>
          <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb="6px">
              Yearly
            </Text>
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              Total OPDs
            </Text>
          </Flex>
          <Box minH="300px">
            {loadBarChart ? null : <Bar options={options} data={data} />}
          </Box>
        </Card>
      </Grid>
    </Flex>
  );
}
