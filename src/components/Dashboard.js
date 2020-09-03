import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid } from "@material-ui/core";

const Landing = () => {
  return (
    <>
      <Box my="2em">
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" flexDirection="column">
                  <img
                    src="/images/doctor.svg"
                    style={{ height: "8em" }}
                    alt=""
                  />
                  <Box my="1em" textAlign="center">
                    <Button>See a Doctor</Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" flexDirection="column">
                  <img
                    src="/images/cough.svg"
                    style={{ height: "8em" }}
                    alt=""
                  />
                  <Box my="1em" textAlign="center">
                    <Button>Check my Symptoms</Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" flexDirection="column">
                  <img
                    src="/images/target.svg"
                    style={{ height: "8em" }}
                    alt=""
                  />
                  <Box my="1em" textAlign="center">
                    <Button>Set a Goal</Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Landing;
