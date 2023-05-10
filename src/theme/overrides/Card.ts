// ----------------------------------------------------------------------

export default function Card(theme: any) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow: theme.customShadows.z10,
          // border: '1px solid #F7F8FA',
          boxShadow: '0px 4px 20px rgba(22, 20, 95, 0.15)',
          borderRadius: 10,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: {
          variant: 'body2',
          marginTop: theme.spacing(0.5),
        },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
