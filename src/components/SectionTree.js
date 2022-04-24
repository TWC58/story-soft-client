import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import PropTypes from 'prop-types';
import { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store/index.js';

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});

CustomContent.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label.
   */
  icon: PropTypes.node,
  /**
   * The tree node label.
   */
  label: PropTypes.node,
  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,
};

const CustomTreeItem = (props) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);

export default function SectionTree(props) {

  const { store } = useContext(GlobalStoreContext);

  const handleNodeSelect = (e, nodeId) => {
    console.log("NODE: ", nodeId, " selected");
    props.handleSetCurrentSection(nodeId);
  }

  const renderTree = (nodes) => {
    if (!nodes)
      return;

    console.log("renderTree on nodes: " + JSON.stringify(nodes));
    
    return <CustomTreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name}>
      {Array.isArray(nodes.loadedChildren)
        ? nodes.loadedChildren.map((node) => renderTree(node))
        : null}
    </CustomTreeItem>
  };

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      onNodeSelect={handleNodeSelect}
      selected={props.setCurrentSection}
    >
      {renderTree(props.rootSection)}
    </TreeView>
  );
}