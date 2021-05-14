import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
    box-sizing: border-box;
    line-height: 1.5;
    font-family: verdana;
}

body {
    background: linear-gradient(135deg, #9cf39b55 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, #9cf39b 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, #9cf39b55 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, #9cf39b 25%, #f6ffb5 25%) 0px 0/ 20px 20px;
}
`;
