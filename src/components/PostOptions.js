import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

export const PostOptions = ({ sections, handleSetCurrentSection }) => {
    const theme = useTheme();

    console.log("CHILD SECTIONS: ", sections);

    return (
        <div id="post-options">
            <List sx={{ marginTop: 5, marginRight: 5, marginLeft: 5 }} style={{ flexDirection: 'column' }}>
                {sections.map((section, index) => (
                    <Button style={{ margin: 3, backgroundColor: theme.palette.secondary.main }} key={index} onClick={() => handleSetCurrentSection(section._id)}>{section.name}</Button>
                ))}
            </List>
        </div>
    )
}