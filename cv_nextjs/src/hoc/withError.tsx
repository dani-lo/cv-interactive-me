import React from "react"
import { StyledInlineWarning } from "../../styles/main.styled";

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
    
    constructor (props: any) {
      super(props)

      this.state = {
        hasError: false
      }
    }
    displayName = 'ErrorBoundary'

    static getDerivedStateFromError(error: Error) {    // Update state so the next render will show the fallback UI.   
      
      return { hasError: error };  
    }

    componentDidCatch (err: Error) {
      this.setState({
        hasError: true
      })
    }

    render() {
      if (this.state && this.state.hasError) {
        return (
          <div className="page">
            <div className="jobs-container">
              <StyledInlineWarning>
                <p>There was an error</p>
                <p><a href="/">back to safety</a></p>
              </StyledInlineWarning>
            </div>
          </div>
        )
      }
    
      return this.props.children
    }
}

export { ErrorBoundary }