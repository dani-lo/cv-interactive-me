import React from "react"

class ErrorBoundary extends React.Component<any, { hasError: Error | null }> {
    
    constructor (props: any) {
      super(props)

      this.state = {
        hasError: null
      }
    }
    displayName = 'ErrorBoundary'

    static getDerivedStateFromError(error: Error) {    // Update state so the next render will show the fallback UI.   
      
      return { hasError: error };  
    }

    componentDidCatch () {
      console.log('I CAUGHT!!!')
    }

    render() {

      if (this.state && this.state.hasError) {
        return (
          <div>
            <h3>There was an error</h3>
            {/* <p>{ this.state.errorMessage || 'No error info available' }</p> */}
            {/* <button
              type="button"
              onClick={() => this.setState({ hasError: null })}
            >
              Try again?
            </button> */}
          </div>
        )
      }
    
      return this.props.children
    }
}

export { ErrorBoundary }