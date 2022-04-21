import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function SectionTree(props) {
  const renderTree = (nodes) => {
    if (!nodes)
      return;

    console.log("renderTree on nodes: " + JSON.stringify(nodes));
    
    return <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name}>
      {Array.isArray(nodes.loadedChildren)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  };

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {renderTree(props.rootSection)}
    </TreeView>
  );
}