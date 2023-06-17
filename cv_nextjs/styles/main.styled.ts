import styled, { css }  from "styled-components"
import { Modal } from '@mui/material'

export const StyledJobDetail = styled.div`

    position: fixed;
    top: 0;
    left: 770px;
    width: 450px;
    height: 100%;
    padding: var(--gap-large)  var(--gap-large)  var(--gap-large) 0;
    overflow-y: scroll;

    h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

export const StyledJobContainer = styled.div<{ selected: boolean }>`    

    margin-top: var(--gap-large);
    border: 1px dotted var(--border-col);
    padding:  var(--gap-medium);
    background: var(--white);
    
    ${ props => props.selected ? 'background: var(--active-action);border: 1px solid var(--bg-grey);' : ''}
    
    .job-list-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px dotted var(--border-col);
        padding: var(--gap-medium) 0;
    }

    i.job-selector {
        font-size: 2rem;

        ${ props => props.selected ?
             'color: var(--text-dark);cursor: default;pointer-events: none' : 
             'color: var(--text-inactive);cursor: pointer;'
        }
        

        &:hover{
            opacity: 0.7;
        }
        
    }
    
    p {
        span {
            padding-right:  var(--gap-medium);
        }
    }
    
    span.job-period {
        font-weight: normal;
        font-family: 'Manrope', sans-serif;
    }
`
export const StyledSidebarAction = styled.div``

export const StyledSidebar = styled.div`

    width: 320px;
    position: fixed;
    left: 0;
    top: 0;
    background: var(--white);
    border-right: 1px dotted var(--border-col);
    height: 100%;
    padding: var(--gap-large);
    z-index: var(--z-2);
`

export const StyledActionInput = styled.div<{ active: boolean}>`

    button {
        cursor:  ${props => props.active ? 'pointer' : 'default'};
        pointer-events: ${props => props.active ? 'auto' : 'none'};
    }
    opacity: ${props => props.active ? 1 : 0.4};

    textarea {
        padding:  var(--gap-large);;
        display: block;
        width: 100%;
        height: 5rem;
    }
`

export const StyledJobAnnotations = styled.ul`

    padding: var(--gap-large);
    margin: var(--gap-large) var(--gap-medium) var(--gap-medium)auto;

`

export const StyledCompanyContainer = styled.div`

    padding: var(--gap-medium) var(--gap-large);
    border: 1px dotted var(--border-col);
    background: var(--white);
`

export const StyledActionsList = styled.ul`

    li {
        list-style: none;
        list-position: inside;
        padding: var(--gap-micro) 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px dotted var(--border-col);

        &.list-footer-meta-action {
            text-decoration: underline;
            cursor: pointer;

            &:hover {
                opacity: 0.7;
            }
        }
    }
`

export const StyledProjectStatusList = styled.ul`

    margin: var(--gap-large) var(--gap-large) var(--gap-large) 0;
}
`

export const StyledLoaderRipple = styled.div`

    display: inline-block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--z-4);
    width: 100%;
    top: 0;
    height: 100%;

    >div.bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--bg-dark);
        opacity: 0.4;
    }

    > div {
        width: 80px;
        margin: auto;
        position: relative;

        div {
            position: absolute;
            border: 4px solid #fff;
            opacity: 1;
            border-radius: 50%;
            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

        }
      
        div:nth-child(2) {
            animation-delay: -0.5s;
        }
      
        @keyframes lds-ripple {
            0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 0;
            margin-top:100px
            }
            4.9% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 0;
            margin-top:100px
            }
            5% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
            margin-top:100px
            }
            100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
            margin-top:100px
            }
        }
    }
    
    p{
        position: absolute;
        top: 200px;
        z-index: var(--z-4);
        text-align: center;
        width: 100%;

        span {
            display: inline-block;
            margin: auto;
            background: var(--active-pink);
            padding: 1rem;
            font-weight: bold;
            color: white;
        }
    }
  
`

export const StyledPrompt = styled.div`

    width: 450px;
    z-index: var(--z-4);
    position: fixed;
    right: var(--gap-large);
    padding:  var(--gap-medium);
    background: var(--active-action);
    background: var(--white);
    border: 2px solid var(--border-col);
    text-align: center;
    top: -320px;
    transition: top 0.5s;
    padding: var(--gap-large);
  
  &.active {
    top: var(--gap-large);
  }
  
  p {
    text-align: left;
  }

  .prompt {
    display: flex;
    align-items: center;
    
  }

  .prompt button {
    margin: 0  var(--gap-small);
  }
  
  .prompt p {
    display: inline-block;
    margin: 0 var(--gap-large) 0 0;;
  }
`

export const StyledInputContainer = styled.div<{ disabled ?: boolean }>`
    
    ${ props => props.disabled ? 'opacity: 0.7;pointer-events: none;' : ''}
`

export const StyledSettingsListContainer = styled.div<{ disabled : boolean }>`
    
    ${ props => props.disabled ? 'left: -320px;' : 'left: 320px;'}

    position: fixed;
    top: 0;
    width: 290px;
    height: 100%;

    z-index: var(--z-2);

    transition: left 0.25s;
    padding: var(--gap-large);
    background: var(--white);
    border-right: 1px dotted var(--border-col);

    > div {
        padding: var(--gap-medium) var(--gap-medium) var(--gap-large);
        border-bottom: 1px dotted var(--border-col);
        margin-top: var(--gap-large);
    }
`

export const StyledModalWrap = styled(Modal)`
    border:none;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: var(--z-3)!important;

    > div.MuiBox-root {
        background: var(--white);
        width: 500px;
        margin: 5em auto;
        height: fit-content;
        border-radius: 5px;
        padding: 2em;

        &:focus-visible {
            border: none;
        }
    }
`