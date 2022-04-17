import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GlobalStoreContext } from '../store'
import { useContext } from 'react';

export default function ModalDelete() {
  const [open, setOpen] = React.useState(false);

  const { store } = useContext(GlobalStoreContext)

  const handleClose = () => {
    store.unmarkListForDeletion();
  };

  const handleDelete = () => {
      store.deleteMarkedList();
  }
  return (
    <div>
      <Dialog
        open={store.postMarkedForDeletion !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {(store.listMarkedForDeletion) ? "Delete List: " + store.listMarkedForDeletion.name : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}