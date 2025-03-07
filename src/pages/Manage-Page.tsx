import React, { useState } from "react";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const ManagePage: React.FC = () => {

    return (
        <Box display="flex" flexDirection="column" gap={2} maxWidth={400} margin="auto" mt={3}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Martin Garrix - Animals" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="David Guetta - Titanium" secondary="Jan 7, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="LMFAO - Party Rock" secondary="July 20, 2014" />
                </ListItem>
            </List>
        </Box>
    );
};

export default ManagePage;
