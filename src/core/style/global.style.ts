import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  :root{
    --black: #000;
    --white: #fff;

	--c-bg: #e5e5e5;
	--c-red: #F12B2C;
	--c-green: #29CC97;
	--c-blue: #3751FF;
	--c-yellow: #FEC400;
	--c-grey: #9FA2B4;

    --f-xxs: 10px;
    --f-xs: 12px;
    --f-sm: 14px;
    --f-base: 16px;
    --f-md: 18px;
    --f-lg: 20px;
    --f-xl: 24px;
    --f-2xl: 30px;
    --f-3xl: 36px;
    --f-4xl: 42px;
    --f-5xl: 48px;
	
    --ff: 'Mulish', sans-serif;;

    --tsn: 0.2s ease-in-out;
	--br: 4px;
  }
  body{
    margin: 0;
    font-family: var(--ff);
    font-weight: 400;
    background: var(--c-bg);
    overflow-x: hidden;
  }
  
  a{
    text-decoration: none;
  }

  p,h1,h2,h3,h4,h5,h6{
	  margin: 0;
  }

  .wrap{
    max-width: 95%;
    margin: auto;
  }

  .text{
    &.center{
      text-align: center;
    }
    &.right{
      text-align: right;
    }
    &.red{
      color: var(--c-red);
    }
	&.yellow{
      color: var(--c-yellow);
    }
	&.blue{
      color: var(--c-blue);
	}
    &.green{
      color: var(---c-green);
    }
  }

  .flex{
	  display: flex;
	  &.jcsb{
		  justify-content: space-between;
	  }
	  &.jcc{
		  justify-content: center;
	  }
	  &.jcr{
		  justify-content: flex-end;
	  }
	  &.ci{
		  align-items: center;
	  }
  }



  .h-mob{
    @media(max-width: 767px){
      display: none !important;
    }
  }

  .s-mob{
    @media(min-width: 768px){
      display: none !important;
    }
  }

  @keyframes fadeIn{
    0%{
      opacity: 0;
      transform: translate(0, -10px);
    }
    100%{
      opacity: 100;
      transform: translate(0, 0);
    }
  }
`;

export default GlobalStyle;
