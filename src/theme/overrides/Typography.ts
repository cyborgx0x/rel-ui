// ----------------------------------------------------------------------

export default function Typography(theme: any) {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000000',
          fontSize: 14,
        },
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
}
