import styled, { css }  from "styled-components"
import { Modal } from '@mui/material'

export const StyledJobContainer = styled.div`    

    margin-top: var(--gap-medium);
    padding:  var(--gap-medium);
    width: 380px;
    border: 1px solid var(--white);

    &.selected {
        background: var(--active-action);
        padding:  var(--gap-medium);
        cursor: default;
        pointer-events: none; 

        h2, h3, p, li, a, i {
            color: white;
            border-color: var(--white);
        }

        i.job-selector {
            color: var(--text-inactive);
            cursor: default;
            pointer-events: none;
        }
    }
    
    &:first-child {   
        margin-top: 0;
    }

    h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    h2 i.bookmark {
        margin-right: var(--gap-medium);
    }

    i.job-selector {
        font-size: 1rem;
        color: var(--active-action);
        cursor: pointer;    

        &:hover {
            color: var(--active-pink);
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

    @media only screen and (max-width: 768px) {
        width: auto;
    }
`

export const StyledJobDetail = styled.div`
    
    position: fixed;
    width: 420px;
    overflow-y: scroll;
    height: 100%;
    top: 12px;
    padding: var(--gap-large);
    left: 740px;
    background: var(--white);
    
    h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
        left: 0;
        position: relative;
        height: 100%;
        width: auto;
        top: 35px;
    }
`

export const StyledSidebar = styled.div`

    @media only screen and (max-width: 768px) {
        
        width: 100%;
        top: 35px;
        left: -768px;

        i.fa-cog {
            display: none;
        }

        &.active {
            left: 0;
        }
    }

    

    width: 320px;
    position: fixed;
    left: 0;
    top: 0;
    background: var(--black);
    border-right: 1px dotted var(--border-col);
    height: 100%;
    padding: var(--gap-large);
    z-index: var(--z-4);
    transition: left 0.25s;

    > .html-icon {
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
    }

    > div {
        padding: var(--gap-large) 0 var(--gap-small);
    }

    ul li, h3, p, i.fa, span, a {
        color: white;
    }

    i:hover, 
    a:hover {
        opacity: 0.7;
    }

    h3 {
        padding-bottom: var(--gap-small);
        margin: var(--gap-large) 0 var(--gap-medium);
    }

    @media only screen and (max-width: 768px) {
        i.fa-cog {
            display: none;
        }

        i.fa-times {
            display: inline-block;
        }
    }
`

export const StyledCompanyContainer = styled.div`

    margin: var(--gap-huge) 0 var(--gap-large) 0;
    border: 1px solid var(--active-action);
    padding: 0 var(--gap-medium) var(--gap-medium);

    > h3 {
        padding: var(--gap-medium) 0 var(--gap-small);
        margin-top: 0;
    }
`

export const StyledActionsList = styled.ul`

    li {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;

        > span:first-child span, a {
            padding-left: var(--gap-small);
        }
    }
`

export const StyledPrompt = styled.div`
    width: 450px;
    z-index: var(--z-5);
    position: fixed;
    right: var(--gap-large);
    padding:  var(--gap-medium);
    background: var(--active-action);
    background: var(--bg-white);
    border: 2px solid var(--border-col);
    text-align: center;
    top: -390px;
    transition: top 0.5s;
    padding: var(--gap-large);
  
    &.active {
        top: var(--gap-large);
    }
    
    p {
        text-align: left;
    }

    > p {
        margin: var(--gap-large) 0;
    }

    .prompt {
        display: flex;
        align-items: center;
        padding-top: var(--gap-large);
        
        button {
            margin: 0  var(--gap-small) 0 0;
        }

        p {
            display: inline-block;
            margin: 0 var(--gap-large) 0 0;;
        }
    }

    @media only screen and (max-width: 768px) {
        width: 100%;
        left: 0;
        top: -500px;
        
        &.active {
            top: 0;
        }

        span.html-icon i {
            font-size: 1rem;
        }
    }

    span.html-icon {
        display: inline-block;
        position: absolute;
        right: var(--gap-medium);
        top: var(--gap-small);
    }
`

export const StyledSettingsListContainer = styled.div<{ disabled : boolean }>`
    
    ${ props => props.disabled ? 
        'left: -320px;' : 
        'left: 320px;'
    }

    @media only screen and (max-width: 768px) {
        width: 100%;
        padding-top: 2rem;
        left: 0;

        ${ props => props.disabled ? 
            'left: -768px;' : 
            'left: 0;'
        }

        span.html-icon {
            right: var(--gap-large);
        }

        span.html-icon i.fa-times {
            font-size:1.25rem;
        }
    
    }

    position: fixed;
    top: 0;
    width: 290px;
    height: 100%;
    z-index: var(--z-4);
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
        display: inline-block;
        position: absolute;
        right: 5px;
        top: 11px;
    }
`

export const StyledInlineWarning = styled.div`

    border: 1px solid var(--warn);
    padding: var(--gap-large);
    background: white;
    width: 300px;

    p {
        font-weight: bold;
        color: var(--warn);
    }

    @media only screen and (max-width: 768px) {
        margin: var(--gap-large);  
        width: auto;
    }
   
`

export const StyledModalWrap = styled(Modal)`
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: var(--z-3);
    background: transparent;
    top: 0;
    left: 0;

    .btn-close {
        position: absolute;
        right: 1em;
        top: 0.5em;
        cursor: pointer;

        i {
            font-size: 1em;
        }

        &:hover i {
            color: var(--active-action);
        }
    }
    
    .h2 {
        text-transform: capitalize;
    }
    
    .action {
        padding: var(--gap-medium) 0;
        border-bottom: 1px dotted var(--border-col);
    }
    
    .action-unactive {
        opacity: 0.5;
        pointer-events: none;
    }

    > div.MuiBox-root {
        background: var(--white);
        width: 500px;
        margin: 5em auto;
        height: fit-content;
        border-radius: 5px;
        padding: 1.5rem 2rem var(--gap-medium);
        border: none;
        position: relative;
        
        &:focus-visible {
            border: none;
            outline: none;
        }

        @media only screen and (max-width: 768px) {
            width: 100%;
            height: 100%;
            top: 0;
            margin: 0;  
        }
    }


`

export const StyledAnnotation = styled.div`

    margin-top: var(--gap-large);

    p {
        font-style: italic;
        font-weight: bold;
    }
`

export const StyledNotification = styled.div`
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: var(--z-4);

    p {
        display: block;
        color: white;
        font-weight: bold;
        padding: var(--gap-medium) var(--gap-large);
        text-align: center;
        margin: 0;
    }
`

export const StyledMobileBar = styled.div`
    background: var(--black);
    padding: var(--gap-medium);
    z-index: var(--z-3);
    justify-content: space-between;
    align-items: center;
    display: none;
    position: fixed;
    top: 0;
    width: 100%;

    i {
        color: white;
        font-size: 1.25rem;
        transition: padding, font-size 0.2s;
    }

    &.expanded {
        padding: var(--gap-medium)!important;
    }
    
    &.expanded i {
        font-size: 1.25rem!important;
    }

    > div > span:first-child {
        margin-right: var(--gap-large);
    }

    @media only screen and (max-width: 768px) {
        display: flex;
    }
`

export const StyledAboutContainer = styled.div`
    margin-top: var(--gap-large);
    padding:  var(--gap-medium);
    width: 500px;
    border: 1px solid var(--white);

    @media only screen and (max-width: 768px) {
        width: auto;
    }
`