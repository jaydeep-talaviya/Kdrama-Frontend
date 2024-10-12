import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Box, Typography } from '@mui/material';


const CheckboxGroup = ({ label, items, selectedItems, handleSelect }) => {
    return (
      <Box sx={{ marginBottom: 4,padding:2,height:label == "Select Job"?"400px":"200px",overflowY:'scroll',borderRadius:'5%',background: "#1427468f",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        textAlign:'left'
      }}>
        <FormGroup>
          {items.map((item) => (
            <FormControlLabel
              key={label == "Select Job"?item:item._id}
              control={
                <Checkbox
                  checked={selectedItems.includes(label == "Select Job"?item:item._id)}
                  onChange={() => handleSelect(label == "Select Job"?item:item._id)}
                />
              }
              label={item.genre_name || item.tv_channel ||item} // Use 'genre_name' or 'tv_channel' depending on the item type
            />
          ))}
        </FormGroup>
      </Box>
    );
  };
  
  export default CheckboxGroup