import { useContext, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth'
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function ComicWorkspace() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const theme = useTheme();
    const pStore = createStore();

    return (
        <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
            <WorkspaceWrap>
                <SidePanelWrap>
                    <SidePanel store={pStore} />
                </SidePanelWrap>
                <Toolbar store={pStore} downloadButtonEnabled />
                <Workspace store={pStore} />
                <ZoomButtons store={pStore} />
            </WorkspaceWrap>
        </PolotnoContainer>
    )
}

export default ComicWorkspace;