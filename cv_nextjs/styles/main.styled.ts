import styled, { css }  from "styled-components"
import { Modal } from '@mui/material'

export const StyledJobContainer = styled.div<{ selected: boolean }>`    

    margin-top: var(--gap-large);
    padding:  var(--gap-medium);
    width: 380px;
    border: 1px solid var(--white);

    ${ props => props.selected ? 
        `
        background: var(--bg-white);
        padding:  var(--gap-medium);
        border: 1px solid var(--border-col);
        cursor: default;
        pointer-events: none; 
        `
        : ''
    }
    
    &:first-child {   
        margin-top: 0;
    }

    .job-list-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-col);
    }

    i.job-selector {
        font-size: 2rem;
        color: var(--text-inactive);
        cursor: pointer;  

        &:hover {
            color: var(--active-pink);
        }

        ${ props => props.selected ?
            `
            color: var(--text-clear);
            cursor: default;
            pointer-events: none;
             ` : 
            `
            color: var(--text-inactive);
            cursor: pointer;
            `
        }
    }
    
    p {
        span {
            padding-right:  var(--gap-medium);
        }
    }
    
    span.job-period {
        font-size: 0.8rem;
        font-weight: normal;
        font-family: 'Manrope', sans-serif;
    }
`

export const StyledJobDetail = styled.div`
    
    position: fixed;
    width: 420px;
    overflow-y: scroll;
    height: 100%;
    top: 0;
    padding: var(--gap-large);

    h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

export const StyledSidebar = styled.div`

    width: 320px;
    position: fixed;
    left: 0;
    top: 0;
    background: var(--black);
    border-right: 1px dotted var(--border-col);
    height: 100%;
    padding: var(--gap-large);
    z-index: var(--z-2);

    > .html-icon {
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
    }

    li, h3, p, i, span {
        color: var(--white);
    }

    h3 {
        border-bottom: 1px dotted var(--border-c--ol);
        padding-bottom: var(--gap-small);
    }
`

export const StyledAnnotation = styled.p`

    padding: var(--gap-large);
    margin: var(--gap-large) var(--gap-medium) var(--gap-medium)auto;

`

export const StyledCompanyContainer = styled.div`

    border: 1px solid var(--border-col);
    margin: var(--gap-large) 0;
    padding: 0 var(--gap-large) var(--gap-medium) var(--gap-large);
    background: var(--bg-white);

    > h3 {
        padding: var(--gap-medium) 0 var(--gap-small);
        margin: var(--gap-large) 0 var(--gap-medium);
    }
`

export const StyledActionsList = styled.ul`

    margin: var(--gap-large) 0;

    li {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;

        &.list-footer-meta-action {

            text-decoration: underline;
            cursor: pointer;

            &:hover {
                color: var(--active-pink);
            }
        }
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
    background: var(--bg-white);
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
    margin: 0  var(--gap-small) 0 0;
  }
  
  .prompt p {
    display: inline-block;
    margin: 0 var(--gap-large) 0 0;;
  }
`

export const StyledSettingsListContainer = styled.div<{ disabled : boolean }>`
    
    ${ props => props.disabled ? 
        'left: -320px;background:red;' : 
        'left: 320px;background:black;'
    }

    position: fixed;
    top: 0;
    width: 290px;
    height: 100%;
    z-index: var(--z-2);
    left: -320px;
    transition: left 0.25s;
    padding: var(--gap-large);
    padding-top: 2rem;
    background: var(--white);
    border-right: 1px dotted var(--border-col);

    > div {
        padding: var(--gap-medium) var(--gap-medium) var(--gap-large);
        border-bottom: 1px dotted var(--border-col);
        margin-bottom: var(--gap-medium);
    }

    > .html-icon {
        transform: rotate(180deg);
        display: inline-block;
        position: absolute;
        right: 5px;
        top: 11px;
    }
`

export const StyledModalWrap = styled(Modal)`
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: var(--z-4);
    background: transparent;
    top: 0;
    left: 0;

    > div {
        border:1px dotted var(--border-col);
        background: var(--white);
        width: 500px;
        margin: 5em auto;
        height: fit-content;
        border-radius: 5px;
        padding: var(--gap-large) 2em 2em;
        position: relative;
    } 

    .span.btn-close {
        position: absolute;
        right: 1em;
        top: 0.5em;
        cursor: pointer;
    }
    
    .span.btn-close:hover i {
        color: var(--active-action);
    }
    
    .span.btn-close i {
        font-size: 1em;
    }
    
    .h2 {
        text-transform: capitalize;
    }
    
    ..action {
        padding: var(--gap-medium) 0;
        border-bottom: 1px dotted var(--border-col);
    }
    
    ..action-unactive {
        opacity: 0.5;
        pointer-events: none;
    }

    > div.MuiBox-root {
        background: var(--white);
        width: 500px;
        margin: 5em auto;
        height: fit-content;
        border-radius: 5px;
        padding: 2em;

        border: none!important;
        
        &:focus-visible {
            border: none;
        }
    }
`