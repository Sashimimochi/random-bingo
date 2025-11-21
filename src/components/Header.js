import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { ConfigButton, GitHubButton } from './Buttons';

const HeaderItems = (props) => {
    const openMenu = props.openMenu;
    const open = props.open;
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography type="title">
                    ランダム封印縛りビンゴ
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <ConfigButton openMenu={openMenu} open={open} />
                <GitHubButton />
            </Toolbar>
        </AppBar>
    );
}

export default HeaderItems;
