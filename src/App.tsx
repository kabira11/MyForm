// src/App.tsx
import * as React from "react";
import {
  FluentProvider,
  webLightTheme,
  TabList,
  Tab,
  Button,
  Input,
  makeStyles
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    padding: "1rem",
    height: "100vh",

    "@media (max-width: 768px)": {
      flexDirection: "column", // stack for mobile
    },
  },
  left: {
    flex: "0 0 200px",
    borderRight: "1px solid #ddd",
    "@media (max-width: 768px)": {
      borderRight: "none",
      borderBottom: "1px solid #ddd",
    },
  },
  right: {
    flex: 1,
    padding: "1rem",
  },
});

function App() {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState("step1");

  // form states
  const [step1Data, setStep1Data] = React.useState({ name: "", email: "" });

  // validations
  const step1Valid = step1Data.name.trim() && step1Data.email.trim();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        {/* Left Tabs */}
        <div className={styles.left}>
          <TabList
            vertical
            selectedValue={selectedTab}
            onTabSelect={(_, d) => setSelectedTab(d.value as string)}
          >
            <Tab value="step1">Step 1</Tab>
            <Tab value="step2" disabled={!step1Valid}>
              Step 2
            </Tab>
            <Tab value="step3" disabled={!step1Valid}>
              Step 3
            </Tab>
          </TabList>
        </div>

        {/* Right Form */}
        <div className={styles.right}>
          {selectedTab === "step1" && (
            <div>
              <h3>Step 1: Enter Details</h3>
              <Input
                placeholder="Name"
                value={step1Data.name}
                onChange={(_, d) =>
                  setStep1Data((s) => ({ ...s, name: d.value }))
                }
              />
              <br />
              <br />
              <Input
                placeholder="Email"
                value={step1Data.email}
                onChange={(_, d) =>
                  setStep1Data((s) => ({ ...s, email: d.value }))
                }
              />
              <br />
              <br />
              {step1Valid && (
                <Button appearance="primary" onClick={() => setSelectedTab("step2")}>
                  Next →
                </Button>
              )}
            </div>
          )}

          {selectedTab === "step2" && (
            <div>
              <h3>Step 2: More Info</h3>
              <p>Put another form section here.</p>
              <Button onClick={() => setSelectedTab("step3")}>Next →</Button>
            </div>
          )}

          {selectedTab === "step3" && (
            <div>
              <h3>Step 3: Review & Submit</h3>
              <p>Name: {step1Data.name}</p>
              <p>Email: {step1Data.email}</p>
              <Button appearance="primary">Submit</Button>
            </div>
          )}
        </div>
      </div>
    </FluentProvider>
  );
}

export default App;
