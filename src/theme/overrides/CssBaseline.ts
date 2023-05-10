export default function CssBaseline(theme: any) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          width: '14px',
          backgroundColor: theme.palette.background.scrollbar,
        },
        '*::-webkit-scrollbar-track': {
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          border: '4px solid',
          borderColor: theme.palette.background.scrollbar,
          backgroundColor: theme.palette.scrollbar,
          borderRadius: '8px',
        },
      },
    },
  };
}
