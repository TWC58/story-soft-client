import { useTheme } from '@mui/material/styles';

export const PostOptions = ({ sections }) => {
    const theme = useTheme();

    return (
        <h1>{sections}</h1>
    )
}