import { useState } from 'react'
import './App.css'
import {
  Box, Button, CircularProgress, Container, FormControl,
  InputLabel, MenuItem, Select, TextField, Typography, Chip, Snackbar, Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: { main: '#6C63FF' },
    secondary: { main: '#FF6584' },
  },
  typography: {
    fontFamily: "'Segoe UI', sans-serif",
  },
});

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="app-background">
        <Container maxWidth="md" sx={{ py: 6 }}>

          {/* Header */}
          <Box className="header-box" sx={{ textAlign: 'center', mb: 5 }}>
            <Box className="icon-wrapper" sx={{ mb: 2 }}>
              <EmailIcon sx={{ fontSize: 52, color: '#fff' }} />
            </Box>
            <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
              AI Email Assistant
            </Typography>
            <Typography variant="subtitle1" color="rgba(255,255,255,0.75)">
              Generate smart, professional email replies in seconds using Gemini AI
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              <Chip
                icon={<AutoAwesomeIcon sx={{ color: '#FFD700 !important' }} />}
                label="Powered by Gemini 2.5 Flash"
                sx={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 500 }}
              />
            </Box>
          </Box>

          {/* Main Card */}
          <Box className="main-card">

            {/* Input Section */}
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5, color: '#333' }}>
              📩 Original Email
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              placeholder="Paste the email you received here..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': { borderColor: '#6C63FF' },
                  '&.Mui-focused fieldset': { borderColor: '#6C63FF' },
                },
              }}
            />

            {/* Tone Selector */}
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5, color: '#333' }}>
              🎨 Select Tone
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
                sx={{ borderRadius: '12px' }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">💼 Professional</MenuItem>
                <MenuItem value="casual">😊 Casual</MenuItem>
                <MenuItem value="friendly">🤝 Friendly</MenuItem>
              </Select>
            </FormControl>

            {/* Generate Button */}
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
              size="large"
              endIcon={loading ? null : <SendIcon />}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #6C63FF, #a78bfa)',
                boxShadow: '0 4px 20px rgba(108,99,255,0.4)',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a52e0, #9575f5)',
                  boxShadow: '0 6px 24px rgba(108,99,255,0.5)',
                },
                '&:disabled': { background: '#e0e0e0' }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Generate Reply'}
            </Button>

            {/* Error */}
            {error && (
              <Alert severity="error" sx={{ mt: 2, borderRadius: '12px' }}>
                {error}
              </Alert>
            )}

            {/* Generated Reply */}
            {generatedReply && (
              <Box className="reply-box" sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5, color: '#333' }}>
                  ✨ Generated Reply
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={7}
                  variant="outlined"
                  value={generatedReply}
                  inputProps={{ readOnly: true }}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#f9f7ff',
                      '& fieldset': { borderColor: '#6C63FF' },
                    },
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopy}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: '#6C63FF',
                    color: '#6C63FF',
                    '&:hover': { backgroundColor: '#f0eeff', borderColor: '#5a52e0' }
                  }}
                >
                  Copy to Clipboard
                </Button>
              </Box>
            )}
          </Box>

          {/* Footer */}
          <Typography variant="body2" textAlign="center" sx={{ mt: 4, color: 'rgba(255,255,255,0.6)' }}>
            Smart Email AI Assistant • Built with Spring Boot + React + Gemini AI
          </Typography>

        </Container>

        {/* Snackbar for copy confirmation */}
        <Snackbar open={copied} autoHideDuration={2500} onClose={() => setCopied(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setCopied(false)} severity="success" sx={{ borderRadius: '12px' }}>
            Copied to clipboard!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
