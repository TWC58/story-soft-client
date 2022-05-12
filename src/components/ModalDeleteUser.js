import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AuthContext from '../auth'
import { useContext } from 'react';
import { Redirect } from 'react-router';

export default function ModalDeleteUser() {

  const { auth } = useContext(AuthContext)

  const handleClose = () => {
    auth.unmarkUserForDeletion();
  };

  const handleDelete = async () => {
    await auth.deleteMarkedUser();
    window.location.reload(true);
  }
  return (
    <div>
      <Dialog
        open={auth.userMarkedForDeletion}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {(auth.userMarkedForDeletion) ? "Delete Account" : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This will delete your profile, stories, comics, likes, and dislikes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
        {auth.userMarkedForDeletion ? null : auth.user ? null : <Redirect to='/' />}
      </Dialog>
    </div>
  );
}