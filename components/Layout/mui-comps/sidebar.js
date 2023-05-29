import React from "react";
import { Box } from '@mui/system';
import { List, ListItem,ListItemButton, ListItemText } from '@mui/material';


export const AMSidebar = (props) => {

    let nav_data = nav_reference()[props.nav_index]

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {nav_data.map((nav_obj)=>{
                        console.log(nav_obj);
                        return (
                            <ListItemObj linkname={nav_obj.linkname}/>
                        );
                    })}                    
                
                
                </List>
            </nav>
        </Box>
    )
}

const ListItemObj = (props) => {
    return (
        <ListItem disablePadding>
            <ListItemButton>
            <ListItemText primary={props.linkname}></ListItemText>
            </ListItemButton>
        </ListItem>
    );
}


function nav_reference() {
    let nav_reference_ovj;
    nav_reference_ovj =  {
        0:[{'linkname':'Batches'},{'linkname':'Student'},{'linkname':'Teacher'},{'linkname':'Live Class'},{'linkname':'Assignment'}],
        1:[{'linkname':'Student Report'},{'linkname':'Batch report'},{'linkname':'Announcements'}],
        2:[{'linkname':'Join class'},{'linkname':'Assignments'},{'linkname':'Classes'}]
    }
    return nav_reference_ovj
}

