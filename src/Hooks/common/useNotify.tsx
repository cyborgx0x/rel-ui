import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Typography, IconButton } from '@mui/material';
import { useSnackbar, VariantType } from 'notistack';

const useNotify = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onNotify = (status: VariantType, title: string | undefined, body?: string) => {
    enqueueSnackbar(
      <div>
        <Typography variant="subtitle2">{title}</Typography>
        {body && (
          <Typography variant="body2" sx={{ color: '#cccccc' }}>
            {body}
          </Typography>
        )}
      </div>,
      {
        variant: status,
        action: (key) => (
          <IconButton size="small" color="inherit" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} width={24} height={24} />
          </IconButton>
        ),
      },
    );
  };
  return { onNotify };
};

export default useNotify;
