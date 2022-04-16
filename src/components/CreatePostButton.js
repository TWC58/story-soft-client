import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

export default function CreatePostButton() {
  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
      // Inject before JSS
      document.querySelector('#font-awesome-css') || document.head.firstChild,
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

    const handleCreatePost = () => {
        //TODO
        return
    }

  return (
    <IconButton
        size="large"
        edge="end"
        aria-label="create post"
    >
        <Icon
            baseClassName="fas"
            className="fa-plus-circle"
            sx={{ color: '#FF6D00', fontSize: 30, marginRight: '20%' }}
            onClick={handleCreatePost}
        />
    </IconButton>
  );
}