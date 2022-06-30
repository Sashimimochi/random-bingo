import { AppBar, Toolbar, Typography } from '@mui/material';
import { ConfigButton } from './Buttons';

const HeaderItems = (props) => {
    const openMenu = props.openMenu;
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography type="title">
                    ランダム封印縛りビンゴ
                </Typography>
                <ConfigButton openMenu={openMenu} />
            </Toolbar>
        </AppBar>
    );
}

export default HeaderItems;
