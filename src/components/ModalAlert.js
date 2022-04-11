import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import AuthContext from '../auth'
import { useContext } from 'react';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalAlert() {
    const { auth } = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);

    // if (auth.error)
    //     setOpen(true);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      auth.clearError();
    };
  
    return (
        <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={auth.error ? true : false}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">{auth.error}</h2>
          {/* <p id="unstyled-modal-description">Username or password was incorrect.</p> */}
          <button type="button" onClick={handleClose}>CLOSE</button>
        </Box>
      </StyledModal>
    );
}