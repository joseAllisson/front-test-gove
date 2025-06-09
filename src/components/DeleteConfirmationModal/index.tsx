import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  loading: boolean;
}

export function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  userName,
  loading
}: DeleteConfirmationModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          className: "rounded-lg max-w-md w-full"
        }
      }}
    >
      <Box className="">
        <DialogTitle className="text-2xl font-bold text-gray-900 p-0 mb-4">
          <WarningAmberIcon className="mr-2 inline" />  Atenção
        </DialogTitle>

        <DialogContent>
          <Typography className="text-gray-700 text-base">
            Você deseja excluir o usuário <span className="font-semibold">{userName}</span>?
          </Typography>
        </DialogContent>
        
        <DialogActions>
          <Button
            onClick={onClose}
            variant="outlined"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-base font-medium !capitalize"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-base font-medium !capitalize shadow-none"
            autoFocus
            disabled={loading}
          >
            Excluir
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}