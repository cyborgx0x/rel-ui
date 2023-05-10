export default function Drawer(theme: any) {
  return {
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiDrawer-paper': {
            paddingTop: '48px',
          },
        },
      },
    },
  };
}
