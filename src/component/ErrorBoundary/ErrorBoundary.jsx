import React, { Component } from 'react'

export class ErrorBoundary extends Component {
     
     constructor(props) {
          super(props);
          this.state = {hasError: false, error: null};
     }

     static getDerivedFromError(error){
          return {hasError: true, error: error};
     }
     componentDidCatch(error, info){
          console.error('Error caught by ErrorBoundary:', error, info);
     }
render() {
     if (this.state.hasError) {
          return (
               <div className="p-4 text-red-600">
                    {this.props.fallback}
                    <p>{this.state.error?.message}</p>
               </div>
          )
     }

     return this.props.children;
}
}

export default ErrorBoundary
