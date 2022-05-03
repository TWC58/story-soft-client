import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GlobalStoreContext } from '../store'
import { useContext } from 'react';
import { Redirect } from 'react-router';

export default function ModalDeleteSection() {
  const [open, setOpen] = React.useState(false);

  const { store } = useContext(GlobalStoreContext)

  const handleClose = () => {
    store.unmarkSectionForDeletion();
  };

  const handleDelete = async () => {
    await store.deleteMarkedSection();
    window.location.reload(true);
  }
  return (
    <div>
      <Dialog
        open={store.sectionMarkedForDeletion !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {(store.sectionMarkedForDeletion) ? "Delete Section" : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this section?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
        {store.sectionMarkedForDeletion ? null : store.currentPost ? null : <Redirect to='/' />}
      </Dialog>
    </div>
  );
}