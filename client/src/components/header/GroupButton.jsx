
import React, { useState } from "react";

import { ButtonGroup, Button,styled } from "@mui/material";

const StyledButton=styled(ButtonGroup)`
  box-shadow:none;
`



const GroupedButton = () => {
    const [ counter, setCounter ] = useState(1);

    const handleIncrement = () => {
        setCounter(counter => counter + 1 );
        
    };

    const handleDecrement = () => {
        setCounter(counter => counter - 1 );
        
    };

    return (
        <StyledButton variant='contained'>
            <Button onClick={() => handleDecrement()} disabled={counter === 1}>-</Button>
            <Button disabled>{counter}</Button>
            <Button onClick={() => handleIncrement()}>+</Button>
        </StyledButton>
    );
}

export default GroupedButton;
