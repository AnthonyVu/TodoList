import Typography from "@mui/material/Typography";

const Logo = ({variant}) => {
    return (
        <Typography variant={variant} sx={{ fontWeight: 'bold' }}>TodoList</Typography>
    );
}

export default Logo;