import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Grow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthAxios from "../hooks/authAxios-hook";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Exercises() {
  const [{ data }, execute] = useAuthAxios('/exercises', 'get');
  const [exercises, setExercises] = useState<any>();
  const [exercisesViewed, setExercisesViewed] = useState<any>();
  const navigate = useNavigate();

  const fetchExercices = () => {
    execute();
  }

  useEffect(() => {
    fetchExercices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      // set data who dont have progress and cast exercise to any type
      setExercises(data.filter((exercise: any) => !exercise.progress));
      setExercisesViewed(data.filter((exercise: any) => exercise.progress));
    }
  }, [data])

  const onClick = (id: number) => {
    navigate(`/exercises/${id}`);
  }

  return (
    <main>
      <Box
        component="img"
        sx={{
          width: '100%',
          height: '50%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        
        src="https://www.wppourlesnuls.com/wp-content/uploads/2019/07/code-javascript-e1563276216875.jpg" alt="code"
      />

      <Box sx={{ m: 3, marginTop: '25vh' }}>
        <Grid container rowSpacing={3}>
          {exercisesViewed?.length > 0 &&
            <Grid item xs={12}>
              <Typography variant="h4" component="h2" color={"white"}>
                Last viewed
              </Typography>

              <Grid container spacing={3} sx={{ marginTop: 1 }}>
                {exercisesViewed.map((exercise: any, index: number) => {
                  return (
                    <Grow
                      in={true}
                      style={{ transformOrigin: '0 0 0' }}
                      {...{ timeout: 150 * index }}
                      key={exercise.id}
                    >
                      <Grid item xs={12} sm={6} md={4}>
                        <Card>
                          <CardHeader title={exercise.title} />

                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              {exercise.description}
                            </Typography>

                            <LinearProgressWithLabel value={exercise?.progress?.score} />
                          </CardContent>

                          <CardActions>
                            <Button size="small" onClick={() => onClick(exercise.id)}>
                              View
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    </Grow>
                  );
                })}
              </Grid>
            </Grid>
          }

          {exercises?.length > 0 &&
            <Grid item xs={12}>
              <Typography variant="h4" component="h2" color={exercisesViewed?.length > 0 ? "black" : "white"}>
                Exercises
              </Typography>

              <Grid item container spacing={3} sx={{ marginTop: 1 }}>
                {exercises.map((exercise: any, index: number) => {
                  return (
                    <Grow
                      in={true}
                      style={{ transformOrigin: '0 0 0' }}
                      {...{ timeout: 150 * index }}
                      key={exercise.id}
                    >
                      <Grid item xs={12} sm={6} md={4}>
                        <Card>
                          <CardHeader title={exercise.title} />

                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              {exercise.description}
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <Button size="small" onClick={() => onClick(exercise.id)}>
                              Start
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    </Grow>
                  );
                })}
              </Grid>
            </Grid>
          }
        </Grid>
      </Box>
    </main>
  );
}