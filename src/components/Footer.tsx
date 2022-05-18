import { Box, Container } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Footer(props: any) {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'grey.200',
      }}
    >

      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://ascoz.tk/">
            PolyCode
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}