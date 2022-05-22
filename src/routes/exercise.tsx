import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthAxios from "../hooks/authAxios-hook";
import AceEditor from "react-ace";
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import ReactMarkdown from "react-markdown";
import { Alert, Backdrop, Box, Button, Card, Fade, Grid, Modal, Typography } from "@mui/material";
import config from "../config";

export function Exercise() {
  const params = useParams();
  const [{ data: dataExercise }, getExercice] = useAuthAxios(`/exercises/${params.id}`, 'get');
  const [{ data: dataTests }, getTests] = useAuthAxios(`/tests/exercise/${params.id}`, 'get');
  const [{ data: dataRunnedTests, loading }, executeTests] = useAuthAxios(`/tests/exercise/${params.id}/run`, 'post');
  const [{ data: dataRunnedTest }, executeTest] = useAuthAxios('', 'post');
  const [exercise, setExercise] = useState<any>(null);
  const [tests, setTests] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let [code, setCode] = useState("");

  useEffect(() => {
    getExercice();
    getTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataExercise) {
      setExercise(dataExercise);

      setCode(dataExercise.progress ? dataExercise.progress.code : dataExercise.baseCode);
    }
  }, [dataExercise]);

  useEffect(() => {
    if (dataTests) {
      setTests(dataTests);
    }
  }, [dataTests]);

  useEffect(() => {
    if (dataRunnedTests) {
      setOpen(true);
    }
  }, [dataRunnedTests]);

  const onChange = (code: string) => {
    setCode(code);
  }

  const handleClose = () => {
    setOpen(false);
    navigate('/exercises');
  }

  return (
    <div>
      <Box sx={{ m: 3 }}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #888',
              boxShadow: 24,
              p: 4,
            }}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                {dataRunnedTests?.success ? 'Congratulations !' : 'Oops !'}
              </Typography>
              <Alert severity={dataRunnedTests?.success ? 'success' : 'error'} sx={{ mt: 2 }}>
                {dataRunnedTests?.success ? 'You passed all tests !' : 'You pass only ' + dataRunnedTests?.score + '% of tests.'}
              </Alert>
            </Box>
          </Fade>
        </Modal>

        <Grid container columnSpacing={3}>
          <Grid item xs={12} sm={6}>
            <h1>{exercise?.title}</h1>

            <ReactMarkdown>
              {exercise?.instructions}
            </ReactMarkdown>

            {dataRunnedTest &&
              <Box
                component="span"
                sx={{
                  display: 'block',
                  p: 1,
                  m: 1,
                  bgcolor: '#fff',
                  color: 'grey.800',
                  border: '2px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  fontWeight: '700',
                }}
              >
                <Box>
                  <Typography variant="h4" align="center">
                    {dataRunnedTest.success ? 'Success' : 'Fail'}
                  </Typography>
                </Box>

                <Box component="div" sx={{ overflow: 'auto' }}>
                  <pre>
                    <code>
                      <Typography variant="h6" color="text.secondary">Result :</Typography>
                      <Typography variant="body1" color="success.main">
                        {dataRunnedTest?.stdout || 'No output'}
                      </Typography>
                    </code>
                  </pre>

                  {!dataRunnedTest?.success &&
                    <pre>
                      <code>
                        <Typography variant="h6" color="text.secondary">Expected :</Typography>
                        <Typography variant="body1" color="info.main">{dataRunnedTest?.expected}</Typography>
                      </code>
                    </pre>
                  }

                  {dataRunnedTest?.stderr &&
                    <pre>
                      <code>
                        <Typography variant="h6" color="text.secondary">Error output :</Typography>
                        <Typography variant="body1" color="error.main">{dataRunnedTest?.stderr}</Typography>
                      </code>
                    </pre>}
                </Box>
              </Box>
            }
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Card sx={{ mt: 2, border: 1, borderColor: 'lightgray' }}>
                <Typography variant="h6" align="center">
                  Code
                </Typography>

                <AceEditor
                  mode={exercise?.codeLanguage?.toLowerCase() || 'javascript'}
                  theme="github"
                  onChange={onChange}
                  name="UNIQUE_ID_OF_DIV"
                  editorProps={{ $blockScrolling: true }}
                  value={code}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true
                  }}
                />
              </Card>
              <Card sx={{ mt: 2, border: 1, borderColor: 'lightgray' }}>
                <Box sx={{ p: 1 }}>
                  <Typography variant="h6" align="center">
                    Tests
                  </Typography>
                </Box>

                <Box sx={{ p: 1 }}>
                  <Stack spacing={1}>
                    {tests.map((test: any) => (
                      <Box key={test.id}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => executeTest({
                            data: { code },
                            url: `${config.API_URL}/tests/${test.id}/run`,
                          })}>
                          {test.name}
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Card>

              <Box sx={{
                display: 'flex',
                columnGap: 2,
              }}>
                <LoadingButton
                  fullWidth
                  loading={loading}
                  variant="contained"
                  onClick={() => executeTests({ data: { code } })}>
                  Submit all tests
                </LoadingButton>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => setCode(exercise?.baseCode)}>
                  Reset code
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
};