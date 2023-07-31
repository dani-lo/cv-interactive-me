import Box from '@mui/material/Box'

import * as ActionInputs from './actionInput'

import * as narrowers from '../../src/helpers/typeNarrowers'
import { Resource } from '../../src/types'

import { StyledModalWrap } from '../../styles/main.styled'

type Props = { 
  item: Resource | null,
  open: boolean,
  handleClose: () => void;
}

export const ActionsModal = (props: Props) => {

    const { item, open, handleClose } = props

    if (item === null) {
      return null
    }

    return <StyledModalWrap
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <span className="btn-close">
          <i 
            className="fa fa-times" 
            onClick={ handleClose }
          />
        </span>
        <h2>{ item?.toString() }</h2>
        <div>
          <ActionInputs.FilterActionInput 
            item={ item } 
            active={ narrowers.itemCanFilter(item) } 
            close={ handleClose }
          /> 
          <ActionInputs.BookmarkActionInput 
            item={ item } 
            active={ narrowers.itemCanBookmark(item) }
            close={ handleClose }
          /> 
          <ActionInputs.AnnotateActionInput 
            item={ item } 
            active={ narrowers.itemCanAnnotate(item) } 
            close={ handleClose }
          /> 
        </div>
      </Box>
    </StyledModalWrap>   
}