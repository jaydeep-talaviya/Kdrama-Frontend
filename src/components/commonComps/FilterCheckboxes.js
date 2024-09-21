import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Box, Typography } from '@mui/material';


const CheckboxGroup = ({ label, items, selectedItems, handleSelect }) => {
    // console.log(">>>>>>",items,label)
    return (
      <Box sx={{ marginBottom: 4,padding:2,height:"200px",overflowY:'scroll',borderRadius:'5%',background: "#1427468f",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
      }}>
        <FormGroup>
          {items.map((item) => (
            <FormControlLabel
              key={item._id}
              control={
                <Checkbox
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleSelect(item._id)}
                />
              }
              label={item.genre_name || item.tv_channel} // Use 'genre_name' or 'tv_channel' depending on the item type
            />
          ))}
        </FormGroup>
      </Box>
    );
  };
  
  export default CheckboxGroup