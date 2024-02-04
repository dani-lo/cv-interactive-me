import styled, { css }  from "styled-components"
import { Modal } from '@mui/material'

export const StyledJobContainer = styled.div`    

    margin-top: var(--gap-large);
    padding:  var(--gap-large);
    width: 380px;
    border-radius: 0.2rem;
    background: #f2f1f1;
    position: relative;
    transition: background 0.2s;

    &.selected {
        background: var(--active-action);
        cursor: default;
        pointer-events: none; 

        h2, h3, p, li, a, i {
            color: white;
            border-color: var(--white);
        }

        cursor: default;
        pointer-events: none;
    }

    h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    h2 i.bookmark {
        margin-right: var(--gap-medium);
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
        margin: var(--gap-large);
        position: static;
    }

    cursor: pointer;

    &:hover {
        background: var(--active-action);
        h2, h3, p, li, a, i {
            color: white;
            border-color: var(--white);
        }
    }

    ul {
        margin: 0;
        padding: 0;

        li {
            margin: 0;
            padding: var(--gap-micro) 0;
        }
    }
`

export const StyledJobDetail = styled.div`
    
    width: 380px;
    overflow-y: scroll;
    padding: 0 var(--gap-large) 0;
    height: calc(100% - 100px);
    top: 84px;
    margin-left: var(--gap-huge);
    margin-top: var(--gap-medium);
    
    h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--black);
    }

    h3 {
        color: var(--black);
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
    background: var(--black);
    border-right: 1px dotted var(--border-col);
    height: 100%;
    padding: var(--gap-large);
    z-index: var(--z-4);
    transition: left 0.25s;
    top: 0;

    > .html-icon {
        position: absolute;
        top: 0.5rem;
        right: 1rem;
    }

    > div {
        padding: var(--gap-large) 0 var(--gap-small);
    }

    ul li, h3, p, i.fa, span, a {
        color: white;
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
    padding: var(--gap-medium) var(--gap-large);
    border-radius: 0.2rem;
    background: var(--active-action);
    > h3 {
        padding: var(--gap-medium) 0 var(--gap-small);
        margin-top: 0;
    }

    h3, p, li {
        color: white;
    }

    i.bookmark {
        color: var(--white);
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

        &.action-filtered-out {
            opacity: 0.6;
            pointer-events: none;
            cursor: default;

            a, i {
                pointer-events: none;
                cursor: default;
            }
        }
    }
`

export const StyledPrompt = styled.div`
    width: 450px;
    z-index: var(--z-5);
    position: fixed;
    right: var(--gap-large);
    padding:  var(--gap-medium);
    background: var(--black);
    text-align: center;
    top: -500px;
    transition: top 0.5s;
    padding: var(--gap-large);
    border-radius: 0.25rem;
  
    &.active {
        top: var(--gap-large);
    }
    
    p {
        text-align: left;
        color: white;
    }

    i {
        color: white;
    }

    a {
        color: white;
        font-weight: bold;
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
        'left: -400px;' : 
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
    width: 400px;
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
        right: 16px;
        top: 10px;
    }
`

export const StyledInlineWarning = styled.div`

    border: 1px solid var(--warn);
    padding: var(--gap-large);
    background: white;
    width: 400px;
    margin: 2rem 0;

    p {
        font-weight: bold;
        color: var(--warn);
    }

    @media only screen and (max-width: 768px) {
        width: auto;
        margin: 3rem 1rem;
    }
   
`

export const StyledModalWrap = styled(Modal)`
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: var(--z-5);
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

    margin-top: var(--gap-medium);
    margin-bottom: var(--gap-large);

    p {
        font-style: italic;
        font-weight: bold;
    }
`

export const StyledNotification = styled.div`
    position: fixed;
    width: ;
    right: var(--gap-large);
    top: var(--gap-large);
    z-index: var(--z-4);

    h3 {
        display: block;
        color: white;
        font-weight: bold;
        font-size: 0.8rem;
        padding: var(--gap-medium) var(--gap-large);
        text-align: center;
        margin: 0;
        border-radius: 0.25rem;
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
    padding:  var(--gap-medium);
    max-width: 700px;

    h3 {
        margin-top: var(--gap-small);
    }

    @media only screen and (max-width: 768px) {
        width: auto;
    }
`

export const StyledTechList = styled.ul`

    li {
        display: inline-block;
        margin-right: var(--gap-large);
    }
`

export const StyledTabber = styled.ul`
    margin-bottom: var(--gap-huge);
    margin-top: var(--gap-large);
    li {
        display: inline-block;
        margin: 0 var(--gap-medium) 0 0;
        button {
            background: #f2f1f1;
            color: var(--black);
            &:hover {
                background: var(--text-clear);
            color: var(--white);
            }
        }
        button.disabled {
            background: var(--text-clear);
            color: var(--white);
            opacity: 1;
        }
    }

    @media only screen and (max-width: 768px) {
        display: none;
    }
`

export const StyledAppPayoff = styled.div`
    position: absolute;
    bottom: 1rem;
    width: 100%;
    left: 0;
    opacity: 1;
    transition: opacity 100ms;

    &.disabled {
        opacity: 0;
        pointer-events: none;

        i {
            cursor: default;
            pointer-events: none;
        }
    }
  
    & > div {
        padding: var(--gap-large);
        background: black;
        margin: 0 auto;
        width:80%;
        border-radius: 0.25rem;
        background: var(--white);
        background:#c5dcdf;
        position: relative;
    }
    
    p {
        
        color: var(--black)!important;
        font-size: 0.8rem;
        font-weight: bold;

        a {
            color: var(--black);
            
        }
    }
  
    span.html-icon {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;

        i {
            color: black;
            cursor: pointer;
        
            &:hover {
                opacity: 0.5;
            }
        }
    }

`

export const StyleFilteredOutCardWarning = styled.div`
    position: absolute;
    z-index: var(--z-1);
    width: 100%;
    height: 100%;
    background: #ffffffd1;
    top: 0;
    left: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    h3 {
        text-align: center;
        width: 100%;
        display: block;
        color: var(--black);
    }

    i {
        font-size: 2rem;
        color: var(--warn);
    }
`